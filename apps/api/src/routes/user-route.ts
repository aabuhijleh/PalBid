import { Hono } from "hono";
import { googleAuth } from "@hono/oauth-providers/google";
import { setCookie, deleteCookie } from "hono/cookie";
import type { Session } from "hono-sessions";
import { CookieStore, sessionMiddleware } from "hono-sessions";
import { createMiddleware } from "hono/factory";
import { env } from "../config/env";
import { prisma } from "../database/client";

interface SessionDataTypes {
  userId: string;
}

const app = new Hono<{
  Variables: {
    session: Session<SessionDataTypes>;
    session_key_rotation: boolean;
  };
}>();

const store = new CookieStore();

app.use(
  "*",
  sessionMiddleware({
    store,
    encryptionKey: env.SESSION_ENCRYPTION_KEY,
    expireAfterSeconds: 900,
    cookieOptions: {
      path: "/",
      httpOnly: true,
    },
  }),
);

const authMiddleware = createMiddleware<{
  Variables: {
    session: Session<SessionDataTypes>;
    session_key_rotation: boolean;
  };
}>(async (c, next) => {
  const session = c.get("session");
  const userId = session.get("userId");
  const isAuthenticated = Boolean(userId);

  if (!isAuthenticated) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  await next();
});

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
        404,
      );
    }
    return c.json(
      {
        user,
      },
      200,
    );
  })
  .get(
    "/sign-in",
    googleAuth({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      scope: ["openid", "email", "profile"],
    }),
    async (c) => {
      const token = c.get("token");
      const googleUser = c.get("user-google");

      console.log("token !!!", token);
      console.log("googleUser !!!", googleUser);

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
      setCookie(c, "currentUserId", user.id);
      return c.redirect(env.WEB_URL);
    },
  )
  .post("/sign-out", (c) => {
    c.get("session").deleteSession();
    deleteCookie(c, "currentUserId");
    return c.redirect(env.WEB_URL);
  });
