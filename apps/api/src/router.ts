import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { sessionMiddleware } from "hono-sessions";
import { env } from "./config/env";
import { userRoute } from "./routes/user-route";
import { RedisStore } from "./lib/session-store";
import type { ServerContext } from "./types/server";

export const createRouter = () => {
  const app = new Hono<ServerContext>();
  const store = new RedisStore();

  app.use(logger());
  app.use(
    "*",
    cors({
      origin: [env.WEB_URL],
      credentials: true,
    }),
  );
  app.use(
    "*",
    sessionMiddleware({
      store,
      encryptionKey: env.SESSION_ENCRYPTION_KEY,
      expireAfterSeconds: 900,
      cookieOptions: {
        path: "/",
        httpOnly: true,
      },
    }),
  );

  const router = app
    .get("/", (c) => {
      return c.text("Hello from PalBid API service 👋");
    })
    .route("/users", userRoute);

  return router;
};
