import { createMiddleware } from "hono/factory";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { AppBindings } from "../lib/types";

export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  const session = c.get("session");
  const userId = session.get("userId");
  const isAuthenticated = Boolean(userId);

  if (!isAuthenticated) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  await next();
});
