import type { Store, SessionData } from "hono-sessions";
import type { Redis } from "ioredis";
import { cookieMaxAge } from "../config/cookie";
import { redis } from "./redis";

interface RedisStoreOptions {
  client: Redis;
  prefix: string;
  ttl: number;
}

export class RedisStore implements Store {
  redisClient: Redis;
  prefix: string;
  ttl: number;

  constructor(
    options: RedisStoreOptions = {
      client: redis,
      prefix: "session:",
      ttl: cookieMaxAge,
    },
  ) {
    this.redisClient = options.client;
    this.prefix = options.prefix;
    this.ttl = options.ttl;
  }

  async getSessionById(
    sessionId: string,
  ): Promise<SessionData | null | undefined> {
    if (!sessionId) {
      return null;
    }
    const key = (this.prefix + sessionId).toString();
    const result = await this.redisClient.get(key);
    if (result) {
      return JSON.parse(result) as SessionData;
    }
    return null;
  }

  async createSession(
    sessionId: string,
    initialData: SessionData,
  ): Promise<void> {
    if (!sessionId) {
      return;
    }
    const key = (this.prefix + sessionId).toString();
    const ttl = this.ttl;
    await this.redisClient.setex(key, ttl, JSON.stringify(initialData));
  }

  async deleteSession(sessionId: string): Promise<void> {
    const key = (this.prefix + sessionId).toString();
    await this.redisClient.del(key);
  }

  async persistSessionData(
    sessionId: string,
    sessionData: SessionData,
  ): Promise<void> {
    if (!sessionId) {
      return;
    }
    const key = (this.prefix + sessionId).toString();
    const ttl = this.ttl;
    await this.redisClient.setex(key, ttl, JSON.stringify(sessionData));
  }
}
