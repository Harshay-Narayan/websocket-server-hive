"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const logPath = path_1.default.join(__dirname, "../../logs/app.log");
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), winston_1.default.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level.toLocaleUpperCase()}:${message}`;
    })),
    defaultMeta: { service: "message-worker" },
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.colorize({ all: true }),
        }),
    ],
});
exports.default = logger;
