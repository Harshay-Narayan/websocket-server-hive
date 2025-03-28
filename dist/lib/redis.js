"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = __importDefault(require("../utils/logger"));
const redis = new ioredis_1.default(process.env.REDIS_URL);
exports.redis = redis;
redis.on("connecting", () => {
    logger_1.default.info("Connecting to Redis cloud...");
});
redis.on("ready", () => {
    logger_1.default.info("Connected to Redis Cloud...");
});
redis.on("error", (err) => {
    logger_1.default.error("Redis error: " + err);
});
