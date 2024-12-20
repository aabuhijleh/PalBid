import { Hono } from "hono";
import * as HttpStatusCodes from "stoker/http-status-codes";

const app = new Hono();

export const indexRoute = app.get("/", (c) => {
  return c.json(
    { message: "Hello from PalBid API service 👋" },
    HttpStatusCodes.OK,
  );
});
