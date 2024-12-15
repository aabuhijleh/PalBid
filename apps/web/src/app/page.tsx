import { getMe } from "#/lib/client";

export default async function IndexPage() {
  const currentUser = await getMe();

  return (
    <div>
      <h1>Current user</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>

      {currentUser ? (
        <form action="http://localhost:4000/users/sign-out" method="POST">
          <input type="submit" value="Sign out" />
        </form>
      ) : (
        <form action="http://localhost:4000/users/sign-in" method="GET">
          <input type="submit" value="Sign in" />
        </form>
      )}
    </div>
  );
}
