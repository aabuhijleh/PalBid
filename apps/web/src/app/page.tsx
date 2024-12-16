import { env } from "#/config/env";
import { getMe } from "#/lib/client";
import { Submit } from "#/components/submit";

export default async function IndexPage() {
  const currentUser = await getMe();

  return (
    <div>
      <h1>Current user</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>

      {currentUser ? (
        <form
          action={new URL("/users/sign-out", env.NEXT_PUBLIC_API_URL).href}
          method="POST"
        >
          <Submit>Sign out</Submit>
        </form>
      ) : (
        <form
          action={new URL("/users/sign-in", env.NEXT_PUBLIC_API_URL).href}
          method="GET"
        >
          <Submit>Sign in</Submit>
        </form>
      )}
    </div>
  );
}
