import type { CookieOptions } from "hono/utils/cookie";
import { env } from "./env";

export const cookieMaxAge = 60 * 60 * 24 * 7; // 7 days in seconds

export const cookieOptions = {
  path: "/",
  httpOnly: true,
  sameSite: "None",
  secure: true,
  maxAge: cookieMaxAge,
  domain: env.COOKIE_DOMAIN,
} satisfies CookieOptions;
