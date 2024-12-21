import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { UserSchema } from "../../database/prisma/generated/zod";
import { unauthorizedErrorResponse, notFoundSchema } from "../../lib/constants";
import { authMiddleware } from "../../middleware/auth.middleware";

const tags = ["Users"];

export const me = createRoute({
  path: "/users/me",
  method: "get",
  middleware: [authMiddleware] as const,
  security: [{ Cookie: [] }],
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(UserSchema, "Get current user"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    ...unauthorizedErrorResponse,
  },
});

export type MeRoute = typeof me;
