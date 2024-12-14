import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../database/client";

const app = new Hono();

export const userRoute = app
  .get("/", async (c) => {
    const users = await prisma.user.findMany();
    return c.json(users, 200);
  })
  .post("/create", zValidator("json", z.object({ name: z.string() })), (c) => {
    const { name } = c.req.valid("json");
    return c.json(
      {
        id: 3,
        name,
      },
      201,
    );
  });
