"use client";

import { useEffect, useState } from "react";
import { getMe } from "#/lib/client";

export default function AboutPage() {
  const [user, setUser] = useState<Awaited<ReturnType<typeof getMe>> | null>(
    null,
  );

  useEffect(() => {
    getMe()
      .then((res) => {
        console.log("res !!!", res);
        setUser(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>About</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
