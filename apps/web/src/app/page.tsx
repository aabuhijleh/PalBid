import { getUsers } from "../lib/client";
import { getUserSession } from "../lib/session";

export default async function IndexPage() {
  const users = await getUsers();
  const session = await getUserSession();

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
