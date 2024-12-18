import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { ServerContext } from "../types/server";
import { prisma } from "../database/client";
import { authMiddleware } from "../middleware/auth";

const app = new Hono<ServerContext>();

export const listingRoute = app
  .get("/", async (c) => {
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
    return c.json(listings, 200);
  })
  .post(
    "/",
    authMiddleware,
    zValidator(
      "json",
      z.object({
        image: z.string().url("Invalid image URL"),
      }),
    ),
    async (c) => {
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

      return c.json(listing, 201);
    },
  );
