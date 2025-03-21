"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const port = process.env.PORT || 3001;
console.log(__dirname, port);
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("✅ WebSocket Server is Running!");
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
exports.io = io;
const users = {};
io.on("connection", (socket) => {
    socket.on("authenticate", ({ userId }) => {
        console.log("Authenticated " + userId);
        socket.join(userId);
    });
    socket.on("private_chat", ({ senderId, receiverId, message }) => {
        console.log(senderId, receiverId, message);
        io.to(receiverId).emit("private_chat", { senderId, message });
    });
});
console.log(users);
server.listen(port, () => console.log(`Example app listening on port ${port}`));
