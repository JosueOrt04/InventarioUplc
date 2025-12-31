// scripts/fixUrls.js

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

// 🧠 Función MEJORADA para corregir URLs anidadas
function fixUrl(value) {
  if (!value || typeof value !== "string") return value;

  let url = value.trim();
  const newBaseUrl = process.env.BASE_URL.trim();
  
  console.log(`🔍 Procesando URL: ${url}`);

  // 1️⃣ CORREGIR ERROR ORTOGRÁFICO: "localhos" → "localhost"
  if (url.includes("localhos:")) {
    url = url.replace(/localhos:/g, "localhost:");
    console.log(`✅ Corregido 'localhos' a 'localhost'`);
  }

  // 2️⃣ CORREGIR ERROR DE SINTAXIS: "http:/" → "http://"
  if (url.includes("http:/") && !url.includes("http://")) {
    url = url.replace(/http:\//g, "http://");
    console.log(`✅ Corregido 'http:/' a 'http://'`);
  }

  // 3️⃣ DETECTAR Y CORREGIR URLs ANIDADAS/MÚLTIPLES
  // Patrón específico: https://polar-saint-gratis-string.trycloudflare.com/http:/localhost:5001/http:/localhost:5001/uploads/...
  if (url.includes('https://polar-saint-gratis-string.trycloudflare.com/https://polar-saint-gratis-string.trycloudflare.com/')) {
    console.log(`🔄 Detectado patrón de URLs anidadas múltiples`);
    
    // Extraer la ruta final después del último "uploads/"
    const uploadsIndex = url.lastIndexOf('uploads/');
    if (uploadsIndex !== -1) {
      const finalPath = url.substring(uploadsIndex);
      url = `${newBaseUrl}/${finalPath}`;
      console.log(`✅ URL anidada corregida: ${url}`);
      return url;
    }
  }

  // 4️⃣ Si la URL contiene múltiples instancias del dominio
  const domainCount = (url.match(/http:\/\/localhost:5001/g) || []).length;
  if (domainCount > 1) {
    console.log(`🔄 Detectadas ${domainCount} instancias del dominio`);
    
    // Buscar el último segmento que contenga "uploads/"
    const segments = url.split('https://polar-saint-gratis-string.trycloudflare.com/');
    for (let i = segments.length - 1; i >= 0; i--) {
      if (segments[i].includes('uploads/')) {
        url = `${newBaseUrl}/${segments[i]}`;
        console.log(`✅ Múltiples dominios corregidos: ${url}`);
        break;
      }
    }
  }

  // 5️⃣ Si después de las correcciones la URL todavía es muy larga y repetitiva
  if (url.length > 150 && url.includes('https://polar-saint-gratis-string.trycloudflare.com/https://polar-saint-gratis-string.trycloudflare.com/')) {
    console.log(`🔄 URL muy larga detectada, aplicando limpieza agresiva`);
    // Tomar solo la parte después del último localhost:5001/
    const parts = url.split('https://polar-saint-gratis-string.trycloudflare.com/');
    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1];
      // Encontrar la ruta de uploads en la última parte
      const uploadsMatch = lastPart.match(/(uploads\/.*)/);
      if (uploadsMatch) {
        url = `${newBaseUrl}/${uploadsMatch[1]}`;
        console.log(`✅ Limpieza agresiva aplicada: ${url}`);
      }
    }
  }

  // 6️⃣ Eliminar "undefined" si existe
  if (url.includes("undefined")) {
    url = url.replace(/undefined/g, "");
    console.log(`✅ Eliminado 'undefined'`);
  }

  // 7️⃣ Verificar si es una URL válida
  if (/^https?:\/\/[a-zA-Z0-9.-]+(?::\d+)?\/[^ ]+$/.test(url)) {
    console.log(`✅ URL final válida: ${url}`);
    return url;
  }

  console.log(`🎯 URL final: ${url}`);
  return url;
}

async function fixAllUrls() {
  console.log("🚀 INICIANDO CORRECCIÓN DE URLs PROBLEMÁTICAS...");
  console.log("BASE_URL:", process.env.BASE_URL);

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Conectado a MongoDB");

    let totalFixed = 0;

    const updateField = async (doc, field, collectionName) => {
      if (!doc[field]) return false;

      let changed = false;

      if (Array.isArray(doc[field])) {
        const newArray = doc[field].map((v) => {
          const original = v;
          const fixed = fixUrl(v);
          if (original !== fixed) {
            changed = true;
            totalFixed++;
          }
          return fixed;
        });
        if (changed) {
          doc[field] = newArray;
          await doc.save();
          console.log(`✅ Corregido ${collectionName}.${field} en documento ${doc._id}`);
        }
      } else {
        const original = doc[field];
        const fixed = fixUrl(original);
        if (original !== fixed) {
          doc[field] = fixed;
          await doc.save();
          totalFixed++;
          changed = true;
          console.log(`✅ Corregido ${collectionName}.${field} en documento ${doc._id}`);
        }
      }

      return changed;
    };

    console.log("🔄 Corrigiendo HERRAMIENTAS...");
    const herramientas = await Herramienta.find();
    for (const h of herramientas) {
      await updateField(h, "imagenHerramienta", "Herramienta");
      await updateField(h, "imagenAdicional", "Herramienta");
    }

    console.log("🔄 Corrigiendo REACTIVOS...");
    const reactivos = await Reactivos.find();
    for (const r of reactivos) {
      await updateField(r, "imagenReactivo", "Reactivos");
      await updateField(r, "imagenSimbolo", "Reactivos");
    }

    console.log("🔄 Corrigiendo PRÉSTAMOS...");
    const prestamos = await Prestamo.find();
    for (const p of prestamos) {
      await updateField(p, "imagenesPrestamo", "Prestamo");
      await updateField(p, "imagenesDevolucion", "Prestamo");
    }

    console.log("🔄 Corrigiendo RESERVAS...");
    const reservas = await ReservaLaboratorio.find();
    for (const r of reservas) {
      await updateField(r, "imagenAsesor", "ReservaLaboratorio");
      await updateField(r, "imagenRecepcion", "ReservaLaboratorio");
      await updateField(r, "imagenDevolucion", "ReservaLaboratorio");
    }

    console.log("🔄 Corrigiendo USUARIOS...");
    const users = await User.find();
    for (const u of users) {
      await updateField(u, "profilePic", "User");
    }

    console.log(`\n🎉 CORRECCIÓN COMPLETADA!`);
    console.log(`📊 Total de campos corregidos: ${totalFixed}`);

  } catch (error) {
    console.error('❌ Error durante la corrección:', error);
  } finally {
    await mongoose.disconnect();
    console.log("✅ Desconectado de MongoDB");
    process.exit(0);
  }
}

// Ejecutar corrección
fixAllUrls();