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
const processMessages_1 = require("./worker/processMessages");
const logger_1 = __importDefault(require("./utils/logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN,
    },
});
exports.io = io;
io.on("connection", (socket) => {
    socket.on("authenticate", ({ userId }) => {
        logger_1.default.info("Authenticated " + userId);
        socket.join(userId);
    });
    socket.on("private_chat", ({ senderId, receiverId, message }) => {
        logger_1.default.info(`private chat sent: ${senderId} to ${receiverId}`);
        io.to(receiverId).emit("private_chat", { senderId, message });
    });
    socket.on("typing", ({ senderId, receiverId }) => {
        console.log("Typing");
        io.to(receiverId).emit("typing", { senderId, receiverId });
    });
    socket.on("notification", ({ type, firstName, lastName, imageUrl, username, userId, actorId }) => {
        logger_1.default.info(type, firstName, lastName, imageUrl, userId, username, actorId);
        socket.to(userId).emit("notification", {
            type,
            firstName,
            lastName,
            imageUrl,
            userId,
            username,
            actorId,
        });
    });
});
app.get("/", (req, res) => {
    res.send("✅ WebSocket Server is Running!");
});
setInterval(processMessages_1.processMessages, 10000);
server.listen(port, () => logger_1.default.info(`websocket server listening on port ${port}`));
