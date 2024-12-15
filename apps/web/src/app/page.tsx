"use client";

import { useEffect, useState } from "react";
// import { useSession, signIn } from "next-auth/react";
import { client, getUsers } from "../lib/client";

// import { getUsers } from "../lib/client";
// import { getUserSession } from "../lib/session";

export default function IndexPage() {
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // const session = await getUserSession();

  // const session = useSession();

  // console.log("session !!!", session);

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}

      {/* <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- as
        onClick={async () => {
          void signIn("credentials", {
            test: "asdasd",
          });
        }}
        type="button"
      >
        Sign In
      </button> */}

      <form action="http://localhost:4000/users/sign-in" method="get">
        <input type="submit" value="Press to log in" />
      </form>

      <form action="http://localhost:4000/users/sign-out" method="get">
        <input type="submit" value="Press to log out" />
      </form>
    </div>
  );
}
