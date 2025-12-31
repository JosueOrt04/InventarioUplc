import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const allowedOrigins = ["https://weighted-gaps-sip-adams.trycloudflare.com", 
  "http://localhost:5173",
];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware de autenticación para Socket.IO
io.use((socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.cookie;
  // Aquí puedes agregar lógica de autenticación para sockets si es necesario
  next();
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  socket.on("disconnect", () => {});
});

export { app, server };
