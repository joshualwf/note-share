import Redis from "ioredis";

const redisUrl = process.env.UPSTASH_REDIS_URL;
if (!redisUrl) {
  throw new Error("Redis URL not found in environment variables.");
}

const redis = new Redis(redisUrl);

redis.on("error", (error) => {
  console.error("Redis error:", error);
});

export default redis;
