import { Server as SocketIO } from "socket.io";
import { Server } from "http";

let io: SocketIO;

export const initIO = (httpServer: Server): SocketIO => {
  io = new SocketIO(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client Connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  });
  return io;
};

export const getIO = (): SocketIO => {
  if (!io) {
    console.error("Socket IO not initialized");
  }
  return io;
};
