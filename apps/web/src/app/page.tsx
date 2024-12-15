"use client";

import { useEffect } from "react";
import { env } from "#/config/env";
// import { getMe } from "#/lib/client";

export default function IndexPage() {
  // const currentUser = await getMe();

  useEffect(() => {
    void fetch(new URL("/users/test", env.NEXT_PUBLIC_API_URL).href).catch(
      (err) => {
        console.error("failed", err);
      },
    );
  }, []);

  return (
    <div>
      <h1>Current user</h1>

      <form
        action={new URL("/users/sign-in", env.NEXT_PUBLIC_API_URL).href}
        method="GET"
      >
        <input type="submit" value="Sign in" />
      </form>

      <form
        action={new URL("/users/sign-out", env.NEXT_PUBLIC_API_URL).href}
        method="GET"
      >
        <input type="submit" value="Sign out" />
      </form>

      {/* <form
        action={new URL("/users/sign-out", env.NEXT_PUBLIC_API_URL).href}
        method="POST"
      >
        <input type="submit" value="Sign out" />
      </form>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>

      {currentUser ? (
        <form
          action={new URL("/users/sign-out", env.NEXT_PUBLIC_API_URL).href}
          method="POST"
        >
          <input type="submit" value="Sign out" />
        </form>
      ) : (
        <form
          action={new URL("/users/sign-in", env.NEXT_PUBLIC_API_URL).href}
          method="GET"
        >
          <input type="submit" value="Sign in" />
        </form>
      )} */}
    </div>
  );
}
