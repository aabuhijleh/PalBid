import { env } from "#/config/env";
import { getMe } from "#/lib/client";
import { joinUrl } from "#/lib/url-utils";

export default async function IndexPage() {
  const currentUser = await getMe();

  return (
    <div>
      <h1>Current user</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>

      {currentUser ? (
        <form
          action={joinUrl(env.NEXT_PUBLIC_API_URL, "/users/sign-out")}
          method="POST"
        >
          <input type="submit" value="Sign out" />
        </form>
      ) : (
        <form
          action={joinUrl(env.NEXT_PUBLIC_API_URL, "/users/sign-in")}
          method="GET"
        >
          <input type="submit" value="Sign in" />
        </form>
      )}
    </div>
  );
}
