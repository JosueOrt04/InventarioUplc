// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "laboratorio-backend", // 👈 Nombre de tu app en PM2
      script: "./src/Server.js",
      instances: "max", // 👉 Usa todos los cores disponibles
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5001,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      node_args: "--max-old-space-size=4096", // 👉 Opcional: más memoria
    },
  ],
};