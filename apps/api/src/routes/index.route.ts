import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { createRouter } from "../lib/create-app";

const router = createRouter().openapi(
  createRoute({
    path: "/",
    tags: ["Index"],
    method: "get",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Hello from PalBid API service 👋"),
        "PalBid API Index route",
      ),
    },
  }),
  (c) => {
    return c.json(
      { message: "Hello from PalBid API service 👋" },
      HttpStatusCodes.OK,
    );
  },
);

export default router;
