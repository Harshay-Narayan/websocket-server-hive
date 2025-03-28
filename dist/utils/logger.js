"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const logPath = path_1.default.join(__dirname, "../../logs/app.log");
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.printf(({ level, message }) => {
        return `[${console_1.timeStamp}] ${level.toLocaleUpperCase()}:${message}`;
    })),
    defaultMeta: { service: "user-service" },
    transports: [new winston_1.default.transports.Console()],
});
exports.default = logger;
