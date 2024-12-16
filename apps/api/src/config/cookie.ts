import type { CookieOptions } from "hono/utils/cookie";
import { env } from "./env";

export const cookieOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  sameSite: "None",
  secure: true,
  maxAge: 86400, // 1 day in seconds
  domain: env.COOKIE_DOMAIN,
};
