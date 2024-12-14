import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRoute } from "./routes/user-route";

export const createRouter = () => {
  const app = new Hono();

  app.use("*", cors());

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
