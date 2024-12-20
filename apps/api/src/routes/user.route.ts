import { Hono } from "hono";
import { googleAuth } from "@hono/oauth-providers/google";
import { setCookie, deleteCookie } from "hono/cookie";
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppBindings } from "../types/server";
import { env } from "../config/env";
import { prisma } from "../database/client";
import { authMiddleware } from "../middleware/auth";
import { cookieOptions } from "../config/cookie";

const app = new Hono<AppBindings>();

export const userRoute = app
  .get("/me", authMiddleware, async (c) => {
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
  })
  .get(
    "/sign-in",
    googleAuth({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      scope: ["email", "profile", "openid"],
      redirect_uri: new URL("/users/sign-in", env.API_URL).href,
    }),
    async (c) => {
      const googleUser = c.get("user-google");

      if (!googleUser?.email) {
        throw new Error("Google user not found");
      }

      const { email, name, picture: avatar } = googleUser;

      const user = await prisma.user.upsert({
        where: {
          email,
        },
        create: {
          email,
          name,
          avatar,
        },
        update: {
          name,
          avatar,
        },
      });
      const session = c.get("session");
      session.set("userId", user.id);
      setCookie(c, "currentUserId", user.id, cookieOptions);
      return c.redirect(env.WEB_URL);
    },
  )
  .post("/sign-out", (c) => {
    c.get("session").deleteSession();
    deleteCookie(c, "currentUserId", cookieOptions);
    return c.redirect(env.WEB_URL);
  });
