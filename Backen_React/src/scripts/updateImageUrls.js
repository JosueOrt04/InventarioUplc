// scripts/updateImageUrls.js

import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Modelos
import Herramienta from "../models/Herramienta.model.js";
import Reactivos from "../models/registro.model.js";
import Prestamo from "../models/Prestamo.model.js";
import ReservaLaboratorio from "../models/reservaLaboratorio.model.js";
import User from "../models/user.model.js";

dotenv.config();

const PREVIOUS_ENV_PATH = "./.env.previous";

// Crear archivo si no existe
if (!fs.existsSync(PREVIOUS_ENV_PATH)) {
  fs.writeFileSync(PREVIOUS_ENV_PATH, `BASE_URL=${process.env.BASE_URL}`);
}

// 🧠 Función MEJORADA para corregir URLs anidadas y problemas múltiples
function fixUrl(value, newBaseUrl, previousBaseUrl) {
  if (!value || typeof value !== "string") return value;

  let url = value.trim();

  // 1️⃣ Reemplazar BASE_URL anterior por la nueva
  if (previousBaseUrl && url.includes(previousBaseUrl)) {
    url = url.replace(previousBaseUrl, newBaseUrl);
    return url; // si ya tiene dominio y se reemplazó, no tocar más
  }

  // 2️⃣ Si el campo tiene "undefined" → limpiarlo
  if (url.startsWith("undefined")) {
    url = url.replace("undefined", "");
  }

  // 3️⃣ Si ya es URL completa con http/https → no tocarla
  if (/^https?:\/\/[^ ]+$/i.test(url)) {
    return url;
  }

  // 4️⃣ Casos de rutas locales
  //    "/uploads/..."  → agregar dominio
  //    "uploads/..."   → agregar dominio
  //    "/RH_RH_uploads/..."
  //    "/Imagen_Reservas/..."
  const folders = ["uploads", "RH_RH_uploads", "Imagen_Reservas"];

  for (const folder of folders) {
    if (url.startsWith(`/${folder}/`)) {
      return `${newBaseUrl}${url}`;
    }
    if (url.startsWith(`${folder}/`)) {
      return `${newBaseUrl}/${url}`;
    }
  }

  // 5️⃣ Si contiene un slash pero no tiene dominio → considerar ruta local
  if (url.includes("/")) {
    if (!url.startsWith("/")) url = "/" + url;
    return `${newBaseUrl}${url}`;
  }

  // 6️⃣ Si no coincide con nada → devolver sin cambios
  return url;
}


// 🔍 Función para SOLO DETECTAR problemas (sin corregir)
function detectProblems() {
  const problems = [];
  
  return {
    checkUrl: function(url, field, collection, docId) {
      if (!url || typeof url !== "string") return;
      
      const issues = [];
      
      // Detectar problemas comunes
      if (url.includes("localhos:")) {
        issues.push("ERROR_ORTOGRAFICO: 'localhos' en lugar de 'localhost'");
      }
      
      if (url.includes("http:/") && !url.includes("http://")) {
        issues.push("ERROR_SINTAXIS: 'http:/' en lugar de 'http://'");
      }
      
      // Detectar URLs anidadas complejas
      const nestedPattern = /https?:\/\/[^/]+\/(https?:\/\/[^/]+\/)(https?:\/\/[^/]+\/)?/;
      if (nestedPattern.test(url)) {
        issues.push("URL_ANIDADA_COMPLEJA: Múltiples URLs encadenadas (3+ niveles)");
      }
      
      // Detectar patrón específico de localhost múltiple
      if (url.match(/http:\/\/localhost:\d+\/http:\/\/localhost:\d+\/http:\/\/localhost:\d+\//)) {
        issues.push("PATRON_MULTIPLE_LOCALHOST: Múltiples localhost anidados");
      }
      
      // Detectar undefined
      if (url.includes("undefined")) {
        issues.push("UNDEFINED_IN_URL: Cadena 'undefined' presente");
      }
      
      if (issues.length > 0) {
        problems.push({
          collection,
          documentId: docId,
          field,
          url,
          issues
        });
      }
    },
    
    getProblems: function() {
      return problems;
    },
    
    generateReport: function() {
      if (problems.length === 0) {
        return "✅ No se detectaron problemas en las URLs.";
      }
      
      let report = `📊 REPORTE DE PROBLEMAS DETECTADOS - Total: ${problems.length}\n\n`;
      
      const issuesCount = {
        ERROR_ORTOGRAFICO: 0,
        ERROR_SINTAXIS: 0,
        URL_ANIDADA_COMPLEJA: 0,
        PATRON_MULTIPLE_LOCALHOST: 0,
        UNDEFINED_IN_URL: 0
      };
      
      problems.forEach((problem, index) => {
        report += `🔴 PROBLEMA ${index + 1}:\n`;
        report += `   Colección: ${problem.collection}\n`;
        report += `   Documento: ${problem.documentId}\n`;
        report += `   Campo: ${problem.field}\n`;
        report += `   URL: ${problem.url}\n`;
        report += `   Issues:\n`;
        problem.issues.forEach(issue => {
          const issueType = issue.split(':')[0];
          issuesCount[issueType] = (issuesCount[issueType] || 0) + 1;
          report += `     - ${issue}\n`;
        });
        report += `\n`;
      });
      
      // Resumen estadístico
      report += `📈 RESUMEN ESTADÍSTICO:\n`;
      Object.entries(issuesCount).forEach(([issue, count]) => {
        if (count > 0) {
          report += `   ${issue}: ${count} ocurrencias\n`;
        }
      });
      
      return report;
    }
  };
}

async function updateUrls() {
  const newBaseUrl = process.env.BASE_URL.trim();

  const previousBaseUrl = fs
    .readFileSync(PREVIOUS_ENV_PATH, "utf8")
    .trim()
    .split("=")[1];

  if (newBaseUrl === previousBaseUrl) {
  
    
    // Preguntar si se desea corregir los problemas detectados
    
    const detector = await detectAndReportProblems();
    const problems = detector.getProblems();
    
    if (problems.length > 0) {
  
    }
    return;
  }



  await mongoose.connect(process.env.MONGO_URL);

  const detector = detectProblems();

  const updateField = async (doc, field, collectionName) => {
    if (!doc[field]) return;

    // Detectar problemas antes de corregir
    if (Array.isArray(doc[field])) {
      doc[field].forEach(url => 
        detector.checkUrl(url, field, collectionName, doc._id)
      );
      doc[field] = doc[field].map((v) =>
        fixUrl(v, newBaseUrl, previousBaseUrl)
      );
    } else {
      detector.checkUrl(doc[field], field, collectionName, doc._id);
      doc[field] = fixUrl(doc[field], newBaseUrl, previousBaseUrl);
    }

    await doc.save();
  };

  

  // HERRAMIENTA
  const herramientas = await Herramienta.find();
 
  for (const h of herramientas) {
    await updateField(h, "imagenHerramienta", "Herramienta");
    await updateField(h, "imagenAdicional", "Herramienta");
  }

  // REACTIVOS
  const reactivos = await Reactivos.find();
 
  for (const r of reactivos) {
    await updateField(r, "imagenReactivo", "Reactivos");
    await updateField(r, "imagenSimbolo", "Reactivos");
  }

  // PRESTAMOS
  const prestamos = await Prestamo.find();
 
  for (const p of prestamos) {
    await updateField(p, "imagenesPrestamo", "Prestamo");
    await updateField(p, "imagenesDevolucion", "Prestamo");
  }

  // RESERVAS
  const reservas = await ReservaLaboratorio.find();
 
  for (const r of reservas) {
    await updateField(r, "imagenAsesor", "ReservaLaboratorio");
    await updateField(r, "imagenRecepcion", "ReservaLaboratorio");
    await updateField(r, "imagenDevolucion", "ReservaLaboratorio");
  }

  // USERS
  const users = await User.find();
 
  for (const u of users) {
    await updateField(u, "profilePic", "User");
  }

  // Actualizar .env.previous
  fs.writeFileSync(PREVIOUS_ENV_PATH, `BASE_URL=${newBaseUrl}`);

  // Generar reporte final
  const report = detector.generateReport();
  
  // Guardar reporte en archivo
  fs.writeFileSync("./url_problems_report.txt", report);

  process.exit(0);
}

// Función solo para detectar problemas sin corregir
async function detectAndReportProblems() {
  await mongoose.connect(process.env.MONGO_URL);
  
  const detector = detectProblems();
  
  const checkField = async (doc, field, collectionName) => {
    if (!doc[field]) return;

    if (Array.isArray(doc[field])) {
      doc[field].forEach(url => 
        detector.checkUrl(url, field, collectionName, doc._id)
      );
    } else {
      detector.checkUrl(doc[field], field, collectionName, doc._id);
    }
  };

 

  // Revisar todas las colecciones
  const herramientas = await Herramienta.find();
  for (const h of herramientas) {
    await checkField(h, "imagenHerramienta", "Herramienta");
    await checkField(h, "imagenAdicional", "Herramienta");
  }

  const reactivos = await Reactivos.find();
  for (const r of reactivos) {
    await checkField(r, "imagenReactivo", "Reactivos");
    await checkField(r, "imagenSimbolo", "Reactivos");
  }

  const prestamos = await Prestamo.find();
  for (const p of prestamos) {
    await checkField(p, "imagenesPrestamo", "Prestamo");
    await checkField(p, "imagenesDevolucion", "Prestamo");
  }

  const reservas = await ReservaLaboratorio.find();
  for (const r of reservas) {
    await checkField(r, "imagenAsesor", "ReservaLaboratorio");
    await checkField(r, "imagenRecepcion", "ReservaLaboratorio");
    await checkField(r, "imagenDevolucion", "ReservaLaboratorio");
  }

  const users = await User.find();
  for (const u of users) {
    await checkField(u, "profilePic", "User");
  }

  return detector;
}

// Ejecutar
updateUrls();

// 🆕 FUNCIÓN PARA CORRECCIÓN AUTOMÁTICA (no bloqueante)
async function autoFixUrls() {
  const newBaseUrl = process.env.BASE_URL?.trim();
  
  if (!newBaseUrl) {
 
    return;
  }

  // Verificar si BASE_URL cambió
  let previousBaseUrl = newBaseUrl;
  if (fs.existsSync(PREVIOUS_ENV_PATH)) {
    previousBaseUrl = fs
      .readFileSync(PREVIOUS_ENV_PATH, "utf8")
      .trim()
      .split("=")[1] || newBaseUrl;
  } else {
    fs.writeFileSync(PREVIOUS_ENV_PATH, `BASE_URL=${newBaseUrl}`);
  }

  if (newBaseUrl === previousBaseUrl) {
  
    
    // Solo detectar problemas pero no corregir automáticamente
    const detector = await detectAndReportProblems();
    const problems = detector.getProblems();
    
    if (problems.length > 0) {
      // Guardar reporte
      const report = detector.generateReport();
      fs.writeFileSync("./url_problems_report.txt", report);
    } else {
   
    }
    return;
  }



  try {
    await mongoose.connect(process.env.MONGO_URL);
  

    const detector = detectProblems();

    const updateField = async (doc, field, collectionName) => {
      if (!doc[field]) return;

      if (Array.isArray(doc[field])) {
        doc[field].forEach(url => 
          detector.checkUrl(url, field, collectionName, doc._id)
        );
        doc[field] = doc[field].map((v) =>
          fixUrl(v, newBaseUrl, previousBaseUrl)
        );
      } else {
        detector.checkUrl(doc[field], field, collectionName, doc._id);
        doc[field] = fixUrl(doc[field], newBaseUrl, previousBaseUrl);
      }

      await doc.save();
    };

   

    // HERRAMIENTA
    const herramientas = await Herramienta.find();
   
    for (const h of herramientas) {
      await updateField(h, "imagenHerramienta", "Herramienta");
      await updateField(h, "imagenAdicional", "Herramienta");
    }

    // REACTIVOS
    const reactivos = await Reactivos.find();
  
    for (const r of reactivos) {
      await updateField(r, "imagenReactivo", "Reactivos");
      await updateField(r, "imagenSimbolo", "Reactivos");
    }

    // PRESTAMOS
    const prestamos = await Prestamo.find();
  
    for (const p of prestamos) {
      await updateField(p, "imagenesPrestamo", "Prestamo");
      await updateField(p, "imagenesDevolucion", "Prestamo");
    }

    // RESERVAS
    const reservas = await ReservaLaboratorio.find();
    for (const r of reservas) {
      await updateField(r, "imagenAsesor", "ReservaLaboratorio");
      await updateField(r, "imagenRecepcion", "ReservaLaboratorio");
      await updateField(r, "imagenDevolucion", "ReservaLaboratorio");
    }

    // USERS
    const users = await User.find();
    for (const u of users) {
      await updateField(u, "profilePic", "User");
    }

    // Actualizar .env.previous
    fs.writeFileSync(PREVIOUS_ENV_PATH, `BASE_URL=${newBaseUrl}`);

    // Generar reporte final
    const report = detector.generateReport();

    
    // Guardar reporte en archivo
    fs.writeFileSync("./url_auto_fix_report.txt", report);
  } catch (error) {
    console.error("❌ Error en corrección automática:", error.message);
    // No lanzar el error para no detener el servidor
  } finally {
    // No desconectar MongoDB para no afectar el servidor principal
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  autoFixUrls().then(() => {
    mongoose.connection.close();
    process.exit(0);
  });
}

// Exportar todas las funciones
export { updateUrls, detectAndReportProblems, fixUrl, autoFixUrls };
