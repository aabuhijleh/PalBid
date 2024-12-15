import { createMiddleware } from "hono/factory";
import type { ServerContext } from "../types/server";

export const authMiddleware = createMiddleware<ServerContext>(
  async (c, next) => {
    const session = c.get("session");
    const userId = session.get("userId");
    const isAuthenticated = Boolean(userId);

    if (!isAuthenticated) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    await next();
  },
);
