import * as HttpStatusPhrases from "stoker/http-status-phrases";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { jsonContent } from "stoker/openapi/helpers";

export const unauthorizedSchema = createMessageObjectSchema(
  HttpStatusPhrases.UNAUTHORIZED,
);

export const notFoundSchema = createMessageObjectSchema(
  HttpStatusPhrases.NOT_FOUND,
);

export const unauthorizedErrorResponse = {
  [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    unauthorizedSchema,
    "User is not authenticated",
  ),
} as const;
