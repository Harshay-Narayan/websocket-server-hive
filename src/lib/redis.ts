import Redis from "ioredis";

const redis = new Redis({
  port: 19699, // Redis port
  host: "redis-19699.c301.ap-south-1-1.ec2.redns.redis-cloud.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "CU0spzXnkQPncsOoyeQciZn5sfME2Zuy",
  db: 0, // Defaults to 0
});

redis.on("connect", () => {
  console.log("Connected to Redis Cloud");
});
redis.on("error", (err) => {
  console.log("Redis error: " + err);
});

export { redis };
