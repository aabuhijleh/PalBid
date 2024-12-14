import { hc } from "hono/client";
import type { AppType } from "api/src";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);

export const getUsers = async () => {
  try {
    const res = await client.users.$get();
    return res.json();
  } catch (error) {
    console.error("Could not fetch users", error);
    return [];
  }
};
