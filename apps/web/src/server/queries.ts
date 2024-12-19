"use server";

import { authClient, client } from "./server-api-utils";

export async function getMe() {
  const res = await authClient.users.me.$get();
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function getListings() {
  const res = await client.listings.$get();
  return res.json();
}
