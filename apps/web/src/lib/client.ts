"use server";

import { hc } from "hono/client";
import { cookies } from "next/headers";
import type { AppType } from "api/src";
import { env } from "#/config/env";

export const client = hc<AppType>(env.NEXT_PUBLIC_API_URL);

export async function getMe() {
  const cookieStore = await cookies();
  const cookiesString = cookieStore.toString();

  try {
    const res = await client.users.me.$get(undefined, {
      headers: {
        ...(cookiesString ? { Cookie: cookiesString } : {}),
      },
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Could not fetch current user", error);
    return null;
  }
}
