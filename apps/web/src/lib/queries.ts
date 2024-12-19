import type { InferRequestType } from "hono/client";
import { client, authClient } from "#/lib/client-api-utils";

export const getMe =
  (arg?: InferRequestType<typeof authClient.users.me.$get>) => async () => {
    const res = await authClient.users.me.$get(arg);
    if (!res.ok) {
      return null;
    }
    return res.json();
  };

export const getListings =
  (arg?: InferRequestType<typeof client.listings.$get>) => async () => {
    const res = await client.listings.$get(arg);
    return res.json();
  };
