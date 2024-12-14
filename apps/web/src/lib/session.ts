import type { User } from "next-auth";
import { getServerSession } from "next-auth";

export const sessionCallback = ({ session, token }: any) => {
  console.log("sessionCallback !!!", session, token);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- session is untyped
  session.user.id = token.id;
  return session as { user: User };
};

export const getUserSession = async (): Promise<User | undefined> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session: sessionCallback,
    },
  });
  console.log("authUserSession !!!!!", authUserSession);
  return authUserSession?.user;
};
