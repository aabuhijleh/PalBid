import { googleAuth } from "@hono/oauth-providers/google";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { env } from "../../config/env";

const tags = ["Auth"];

export const signInWithGoogle = createRoute({
  path: "/auth/sign-in/google",
  method: "get",
  middleware: [
    googleAuth({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      scope: ["email", "profile", "openid"],
      redirect_uri: new URL("/auth/sign-in/google", env.API_URL).href,
    }),
  ] as const,
  tags,
  responses: {
    [HttpStatusCodes.MOVED_TEMPORARILY]: {
      description:
        "Initiates Google OAuth2 authentication flow. Uses Google middleware to authenticate user, creates/updates user in database with Google profile data (email, name, avatar), sets session cookie, and redirects to web application",
    },
  },
});

export const signOut = createRoute({
  path: "/auth/sign-out",
  method: "post",
  tags,
  responses: {
    [HttpStatusCodes.MOVED_TEMPORARILY]: {
      description: "Unsets session cookie and redirects to web application",
    },
  },
});

export type SignInWithGoogleRoute = typeof signInWithGoogle;
export type SignOutRoute = typeof signOut;
