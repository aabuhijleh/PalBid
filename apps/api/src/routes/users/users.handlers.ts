import * as HttpStatusCodes from "stoker/http-status-codes";
import { prisma } from "../../database/client";
import type { AppRouteHandler } from "../../lib/types";
import type { MeRoute } from "./users.routes";

export const me: AppRouteHandler<MeRoute> = async (c) => {
  const session = c.get("session");
  const userId = session.get("userId");
  const user = await prisma.user.findUnique({
    where: {
      id: userId!,
    },
  });
  if (!user) {
    return c.json(
      {
        message: "User not found",
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }
  return c.json(user, HttpStatusCodes.OK);
};
