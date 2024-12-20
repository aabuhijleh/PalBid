import { createMiddleware } from "hono/factory";
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppBindings } from "../types/server";

export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  const session = c.get("session");
  const userId = session.get("userId");
  const isAuthenticated = Boolean(userId);

  if (!isAuthenticated) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  await next();
});
