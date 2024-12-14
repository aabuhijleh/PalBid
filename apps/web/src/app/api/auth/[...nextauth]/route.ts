import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { client } from "../../../../lib/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("Failed to get Google email");
      }

      if (!account?.id_token) {
        throw new Error("Failed to get Google ID token");
      }

      const response = await client.users["sign-in"].$post({
        json: {
          token: account.id_token,
          email: profile.email,
          name: profile.name,
          avatar: profile.image,
        },
      });

      return response.ok;
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- NextAuth has type any
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
