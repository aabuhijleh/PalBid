import { Hono } from "hono";
import { cors } from "hono/cors";
import { notFound, onError } from "stoker/middlewares";
import { logger } from "hono/logger";
import { sessionMiddleware as session } from "hono-sessions";
import { corsOptions } from "../config/cors";
import { sessionOptions } from "../config/session";
import { emojiFavicon } from "../middleware/emoji-favicon";
import { indexRoute } from "../routes/index.route";
import { listingRoute } from "../routes/listing.route";
import { userRoute } from "../routes/user.route";
import type { AppBindings } from "../types/server";

export const createRouter = () => {
  return new Hono<AppBindings>();
};

export const createApp = () => {
  const app = createRouter();

  app.use(logger());
  app.use(cors(corsOptions));
  app.use(session(sessionOptions));
  app.use(emojiFavicon("🔥"));
  app.notFound(notFound);
  app.onError(onError);

  const router = app
    .route("/", indexRoute)
    .route("/users", userRoute)
    .route("/listings", listingRoute);

  return router;
};
