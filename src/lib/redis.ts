import Redis from "ioredis";
import logger from "../utils/logger";
import dotenv from "dotenv";

dotenv.config();
const redis = new Redis(process.env.REDIS_URL!);

redis.on("connecting", () => {
  logger.info("Connecting to Redis cloud...");
});
redis.on("ready", () => {
  logger.info("Connected to Redis Cloud...");
});
redis.on("error", (err) => {
  logger.error("Redis error: " + err);
});

export { redis };
