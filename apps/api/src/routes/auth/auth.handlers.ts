import { deleteCookie, setCookie } from "hono/cookie";
import { cookieOptions } from "../../config/cookie";
import { prisma } from "../../database/client";
import { env } from "../../config/env";
import type { AppRouteHandler } from "../../lib/types";
import type { SignInWithGoogleRoute, SignOutRoute } from "./auth.routes";

export const signInWithGoogle: AppRouteHandler<SignInWithGoogleRoute> = async (
  c,
) => {
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
};

export const signOut: AppRouteHandler<SignOutRoute> = (c) => {
  c.get("session").deleteSession();
  deleteCookie(c, "currentUserId", cookieOptions);
  return c.redirect(env.WEB_URL);
};
