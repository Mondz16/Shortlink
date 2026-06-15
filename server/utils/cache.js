import Redis from "ioredis";

const cache = new Redis({
    url: process.env.REDIS_URL
})

export default cache;