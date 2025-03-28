import Redis from "ioredis";

const redis = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

redis.on("connect", () => {
  console.log("Connected to Redis Cloud");
});
redis.on("error", (err) => {
  console.log("Redis error: " + err);
});

export { redis };
