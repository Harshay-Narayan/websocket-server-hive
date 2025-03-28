"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default("rediss://default:AYqrAAIjcDFkYzZmOWMzMTUzZGY0ZGVlYmM1MzJlYTk4OTljMjA2MnAxMA@usable-condor-35499.upstash.io:6379");
exports.redis = redis;
redis.on("connect", () => {
    console.log("Connected to Redis Cloud");
});
redis.on("error", (err) => {
    console.log("Redis error: " + err);
});
