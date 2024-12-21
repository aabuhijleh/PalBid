import * as HttpStatusCodes from "stoker/http-status-codes";
import { prisma } from "../../database/client";
import type { AppRouteHandler } from "../../lib/types";
import type { ListRoute, CreateRoute } from "./listings.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
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
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
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
