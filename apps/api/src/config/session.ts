import { RedisStore } from "../lib/session-store";
import { env } from "./env";
import { cookieMaxAge, cookieOptions } from "./cookie";

const store = new RedisStore();

export const sessionOptions = {
  store,
  encryptionKey: env.SESSION_ENCRYPTION_KEY,
  expireAfterSeconds: cookieMaxAge,
  cookieOptions,
};
