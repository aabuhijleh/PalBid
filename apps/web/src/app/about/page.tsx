import { getUsers } from "../../lib/client";

export default async function AboutPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>About</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
