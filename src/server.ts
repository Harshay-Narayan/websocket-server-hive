import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { processMessages } from "./worker/processMessages";
import logger from "./utils/logger";

dotenv.config();
const app = express();
const server = createServer(app);
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
  },
});

io.on("connection", (socket) => {
  socket.on("authenticate", ({ userId }) => {
    logger.info("Authenticated " + userId);
    socket.join(userId);
  });
  socket.on("private_chat", ({ senderId, receiverId, message }) => {
    logger.info(`private chat sent: ${senderId} to ${receiverId}`);
    io.to(receiverId).emit("private_chat", { senderId, message });
  });
  socket.on("typing", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("typing", { senderId, receiverId });
  });
});

app.get("/", (req, res) => {
  res.send("✅ WebSocket Server is Running!");
});
setInterval(processMessages, 10000);
server.listen(port, () =>
  logger.info(`websocket server listening on port ${port}`)
);

export { io };
