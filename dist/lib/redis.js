"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default({
    port: 19699, // Redis port
    host: "redis-19699.c301.ap-south-1-1.ec2.redns.redis-cloud.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "CU0spzXnkQPncsOoyeQciZn5sfME2Zuy",
    db: 0, // Defaults to 0
});
exports.redis = redis;
redis.on("connect", () => {
    console.log("Connected to Redis Cloud");
});
redis.on("error", (err) => {
    console.log("Redis error: " + err);
});
