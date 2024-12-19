import { hc } from "hono/client";
import type { AppType } from "api/src";
import { env } from "#/config/env";
import { commonOptions } from "#/config/fetch";

export const client = hc<AppType>(env.NEXT_PUBLIC_API_URL, commonOptions);

export const authClient = hc<AppType>(env.NEXT_PUBLIC_API_URL, {
  ...commonOptions,
  init: {
    credentials: "include",
  },
});
