"use server";

import { cookies } from "next/headers";
import { hc } from "hono/client";
import type { AppType } from "api/src/app";
import { env } from "#/config/env";
import { commonOptions } from "#/config/fetch";

export const getCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const client = hc<AppType>(env.NEXT_PUBLIC_API_URL, commonOptions);

export const authClient = hc<AppType>(env.NEXT_PUBLIC_API_URL, {
  ...commonOptions,
  headers: async () => {
    const cookie = await getCookie();
    return {
      Cookie: cookie,
    };
  },
});
