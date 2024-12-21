import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createRouter } from "../lib/create-app";

const router = createRouter();

export const indexRoute = router.openapi(
  createRoute({
    path: "/",
    tags: ["Index"],
    description: "Index route",
    method: "get",
    responses: {
      [HttpStatusCodes.OK]: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Index route",
      },
    },
  }),
  (c) => {
    return c.json(
      { message: "Hello from PalBid API service 👋" },
      HttpStatusCodes.OK,
    );
  },
);
