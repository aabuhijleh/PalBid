import { getUsers } from "../lib/client";

export default async function IndexPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
