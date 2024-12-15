"use server";

import { hc } from "hono/client";
import { cookies } from "next/headers";
import type { AppType } from "api/src";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);

export async function getUsers() {
  const cookieStore = await cookies();
  const cookiesString = cookieStore.toString();
  console.log("cookies !!!", cookiesString);

  try {
    const res = await client.users.$get(undefined, {
      headers: {
        ...(cookiesString ? { Cookie: cookiesString } : {}),
      },
    });
    return res.json();
  } catch (error) {
    console.error("Could not fetch users", error);
    return [];
  }
}
