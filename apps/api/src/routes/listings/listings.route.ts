import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { prisma } from "../../database/client";
import { authMiddleware } from "../../middleware/auth";
import { createRouter } from "../../lib/create-app";
import { ListingSchema, UserSchema } from "../../database/prisma/generated/zod";
import type { AppRouteHandler } from "../../lib/types";

const CreateListingSchema = z.object({
  image: z.string().url("Invalid image URL"),
});

const createListingRoute = createRoute({
  middleware: [authMiddleware] as const,
  path: "/listings",
  method: "post",
  tags: ["Listings"],
  description: "Create a new listing",
  security: [{ Cookie: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateListingSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    [HttpStatusCodes.CREATED]: {
      content: {
        "application/json": {
          schema: ListingSchema,
        },
      },
      description: "Successfully created a new listing",
    },
  },
});

const createListing: AppRouteHandler<typeof createListingRoute> = async (c) => {
  const session = c.get("session");
  const userId = session.get("userId");
  const data = c.req.valid("json");

  const listing = await prisma.listing.create({
    data: {
      image: data.image,
      userId: userId!,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  return c.json(listing, HttpStatusCodes.CREATED);
};

const ListingWithUserSchema = ListingSchema.extend({
  user: UserSchema.pick({
    id: true,
    name: true,
    avatar: true,
  }),
});

const router = createRouter()
  .openapi(
    createRoute({
      path: "/listings",
      method: "get",
      tags: ["Listings"],
      description: "Get all listings",
      responses: {
        [HttpStatusCodes.OK]: {
          content: {
            "application/json": {
              schema: ListingWithUserSchema.array(),
            },
          },
          description: "Successfully retrieved all listings",
        },
      },
    }),
    async (c) => {
      const listings = await prisma.listing.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });
      return c.json(listings, HttpStatusCodes.OK);
    },
  )
  .openapi(createListingRoute, createListing);

export default router;
