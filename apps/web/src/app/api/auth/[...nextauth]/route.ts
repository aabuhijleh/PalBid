import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "../../../../lib/client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(ss, qq) {
        console.log("authorize !!!!", ss);
        // const res = await client.google.$get();
        // console.log("res !!!", res);

        throw new Error("Not implemented");
      },
    }),
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- NextAuth has type any
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
