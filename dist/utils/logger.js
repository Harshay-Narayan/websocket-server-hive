"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("@logtail/node");
const winston_1 = require("@logtail/winston");
const console_1 = require("console");
const path_1 = __importDefault(require("path"));
const winston_2 = __importDefault(require("winston"));
const logPath = path_1.default.join(__dirname, "../../logs/app.log");
const logtail = new node_1.Logtail(process.env.LOGTAIL_SOURCE_TOKEN);
const logger = winston_2.default.createLogger({
    level: "info",
    format: winston_2.default.format.combine(winston_2.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_2.default.format.printf(({ level, message }) => {
        return `[${console_1.timeStamp}] ${level.toLocaleUpperCase()}:${message}`;
    })),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston_2.default.transports.File({ filename: logPath }),
        new winston_1.LogtailTransport(logtail),
    ],
});
exports.default = logger;
