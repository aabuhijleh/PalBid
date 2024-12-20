import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { sessionMiddleware as session } from "hono-sessions";
import { corsOptions } from "./config/cors";
import { sessionOptions } from "./config/session";
import type { AppBindings } from "./types/server";
import { indexRoute } from "./routes/index.route";
import { userRoute } from "./routes/user.route";
import { listingRoute } from "./routes/listing.route";
import { emojiFavicon } from "./middleware/emoji-favicon";

export const createRouter = () => {
  const app = new Hono<AppBindings>();

  app.use(logger());
  app.use("*", cors(corsOptions));
  app.use("*", session(sessionOptions));
  app.use(emojiFavicon("🔥"));

  const router = app
    .route("/", indexRoute)
    .route("/users", userRoute)
    .route("/listings", listingRoute);

  return router;
};
