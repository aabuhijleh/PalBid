import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { sessionMiddleware } from "hono-sessions";
import { corsOptions } from "./config/cors";
import { sessionOptions } from "./config/session";
import type { ServerContext } from "./types/server";
import { userRoute } from "./routes/user-route";
import { listingRoute } from "./routes/listing-route";

export const createRouter = () => {
  const app = new Hono<ServerContext>();

  app.use(logger());
  app.use("*", cors(corsOptions));
  app.use("*", sessionMiddleware(sessionOptions));

  const router = app
    .get("/", (c) => {
      return c.text("Hello from PalBid API service 👋", 200);
    })
    .route("/users", userRoute)
    .route("/listings", listingRoute);

  return router;
};
