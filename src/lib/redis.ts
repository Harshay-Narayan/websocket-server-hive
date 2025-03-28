import Redis from "ioredis";

const redis = new Redis(
  "rediss://default:AYqrAAIjcDFkYzZmOWMzMTUzZGY0ZGVlYmM1MzJlYTk4OTljMjA2MnAxMA@usable-condor-35499.upstash.io:6379"
);

redis.on("connect", () => {
  console.log("Connected to Redis Cloud");
});
redis.on("error", (err) => {
  console.log("Redis error: " + err);
});

export { redis };
