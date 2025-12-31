const axios = require("axios");
const qs = require("qs");

// =======================
// CONFIGURACIÓN
// =======================
const INSTANCE_ID = "instance153270";
const TOKEN = "3bk5nztzzkb8hxu9";
const NUMERO_DESTINO = "+527532560453";

const nuevaURL = process.argv[2];

if (!nuevaURL) {
  console.error("❌ No se recibió la URL");
  process.exit(1);
}

const mensaje = `🔔 *ACTUALIZACIÓN DEL SERVIDOR*

🌐 *Nueva URL Para usuarios :* ${nuevaURL}
⏰ *Fecha:* ${new Date().toLocaleString("es-MX", {
  timeZone: "America/Mexico_City",
})}
📌 *Estado:* Servidor listo y funcionando
`;

async function enviarConUltraMsg() {
  try {
    const data = qs.stringify({
      token: TOKEN,
      to: NUMERO_DESTINO,
      body: mensaje,
    });

    const config = {
      method: "post",
      url: `https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    };

    console.log("📤 Enviando mensaje con UltraMsg...");
    const response = await axios(config);
    console.log("✅ RESPUESTA:", response.data);
    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR:", error.response?.data || error);
    process.exit(1);
  }
}

enviarConUltraMsg();