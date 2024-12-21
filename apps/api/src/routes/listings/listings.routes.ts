import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";
import { authMiddleware } from "../../middleware/auth.middleware";
import { unauthorizedErrorResponse } from "../../lib/constants";
import { createListingSchema, ListingWithUserSchema } from "./listings.schema";

const tags = ["Listings"];

export const list = createRoute({
  path: "/listings",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      ListingWithUserSchema.array(),
      "list of listings",
    ),
  },
});

export const create = createRoute({
  path: "/listings",
  method: "post",
  middleware: [authMiddleware] as const,
  tags,
  security: [{ Cookie: [] }],
  request: {
    body: jsonContentRequired(createListingSchema, "The listing to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      ListingWithUserSchema,
      "The created listing",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createListingSchema),
      "The validation error(s)",
    ),
    ...unauthorizedErrorResponse,
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
