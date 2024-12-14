import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../database/client";

const app = new Hono();

const googleAuthClient = new OAuth2Client();

export const userRoute = app
  .get("/", async (c) => {
    const users = await prisma.user.findMany();
    return c.json(users, 200);
  })
  .post(
    "/sign-in",
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
  );
