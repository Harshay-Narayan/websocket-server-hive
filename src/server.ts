import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { processMessages } from "./worker/processMessages";

dotenv.config();
const app = express();
const server = createServer(app);
const port = process.env.PORT || 3001;

console.log(__dirname, port);
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
    console.log("Authenticated " + userId);
    socket.join(userId);
  });
  socket.on("private_chat", ({ senderId, receiverId, message }) => {
    console.log(senderId, receiverId, message);
    io.to(receiverId).emit("private_chat", { senderId, message });
  });
  socket.on("typing", ({ senderId, receiverId }) => {
    console.log(`${senderId} ${receiverId}`);
    io.to(receiverId).emit("typing", { senderId, receiverId });
  });
});

app.get("/", (req, res) => {
  res.send("✅ WebSocket Server is Running!");
});
setInterval(processMessages, 10000);
server.listen(port, () =>
  console.log(`websocket server listening on port ${port}`)
);

export { io };
