import type { Context } from "hono";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { OAuth2Client } from "google-auth-library";
import { googleAuth } from "@hono/oauth-providers/google";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie";
import type { Session } from "hono-sessions";
import { CookieStore, sessionMiddleware } from "hono-sessions";
import { createMiddleware } from "hono/factory";
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

const googleAuthClient = new OAuth2Client();

const store = new CookieStore();

app.use(
  "*",
  sessionMiddleware({
    store,
    encryptionKey: process.env.SESSION_ENCRYPTION_KEY,
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
  .get("/", authMiddleware, async (c) => {
    // const users = await prisma.user.findMany();
    const session = c.get("session");

    const userId = session.get("userId");

    const userIdFromCookie = getCookie(c, "test") || null;

    // return c.json(users, 200);

    return c.json(
      {
        session,
        userId,
        userIdFromCookie,
      },
      200,
    );
  })
  .post(
    "/sign-in-deprecated",
    zValidator(
      "json",
      z.object({
        token: z.string(),
        email: z.string(),
        name: z.string().optional(),
        avatar: z.string().optional(),
      }),
    ),
    async (c) => {
      const { token, email, name, avatar } = c.req.valid("json");
      try {
        await googleAuthClient.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID!,
        });
      } catch (error) {
        console.error("Failed to verify Google ID token", error);
        return c.json({ message: "Invalid Google ID token" }, 401);
      }
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

      return c.json(user, 201);
    },
  )
  .get(
    "/sign-in",
    googleAuth({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
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

      console.log("user !!!", user);

      const session = c.get("session");

      session.set("userId", user.id);

      setCookie(c, "test", user.id);

      return c.redirect("http://localhost:3000");
    },
  )
  .get("/sign-out", (c) => {
    c.get("session").deleteSession();
    return c.redirect("http://localhost:3000");
  });
