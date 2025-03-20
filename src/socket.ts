import { io } from "./server";

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});
