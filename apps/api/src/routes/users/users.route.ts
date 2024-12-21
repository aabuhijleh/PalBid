import * as HttpStatusCodes from "stoker/http-status-codes";
import { prisma } from "../../database/client";
import { authMiddleware } from "../../middleware/auth";
import { createRouter } from "../../lib/create-app";

const router = createRouter().get("/users/me", authMiddleware, async (c) => {
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
});

export default router;
