"use server";

import { authClient } from "./client";

export async function getMe() {
  const res = await authClient.users.me.$get();
  if (!res.ok) {
    return null;
  }
  return res.json();
}
