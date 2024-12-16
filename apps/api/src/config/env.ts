import { config } from "dotenv-safe";
import { get } from "env-var";

config();

export const env = {
  DEVELOPMENT: get("DEVELOPMENT").default("false").asBool(),
  PORT: get("PORT").default("4000").asPortNumber(),
  API_URL: get("API_URL").required().asString(),
  WEB_URL: get("WEB_URL").required().asString(),
  DATABASE_URL: get("DATABASE_URL").required().asString(),
  REDIS_URL: get("REDIS_URL").required().asString(),
  GOOGLE_CLIENT_ID: get("GOOGLE_CLIENT_ID").required().asString(),
  GOOGLE_CLIENT_SECRET: get("GOOGLE_CLIENT_SECRET").required().asString(),
  SESSION_ENCRYPTION_KEY: get("SESSION_ENCRYPTION_KEY").required().asString(),
  COOKIE_DOMAIN: get("COOKIE_DOMAIN").required().asString(),
};
