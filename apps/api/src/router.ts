import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { userRoute } from "./routes/user-route";

export const createRouter = () => {
  const app = new Hono();

  app.use(logger());
  app.use(
    "*",
    cors({
      origin: [process.env.WEB_URL!],
      credentials: true,
    }),
  );

  const router = app
    .get("/", (c) => {
      return c.text("Hello from PalBid API service 👋");
    })
    .get("/health", (c) => {
      return c.json({ status: "ok" }, 200);
    })
    .route("/users", userRoute);

  return router;
};
