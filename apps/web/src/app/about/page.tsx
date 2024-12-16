"use client";

import { useEffect, useState } from "react";
import { env } from "#/config/env";
import { getMe } from "#/lib/client";

export default function IndexPage() {
  const [user, setUser] = useState<Awaited<ReturnType<typeof getMe>> | null>(
    null,
  );

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch((err) => {
        console.error("failed to fetch user", err);
      });
  }, []);

  return (
    <div>
      <h1>Current user</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <form
        action={new URL("/users/sign-in", env.NEXT_PUBLIC_API_URL).href}
        method="GET"
      >
        <input type="submit" value="Sign in" />
      </form>

      <form
        action={new URL("/users/sign-out", env.NEXT_PUBLIC_API_URL).href}
        method="POST"
      >
        <input type="submit" value="Sign out" />
      </form>
    </div>
  );
}
