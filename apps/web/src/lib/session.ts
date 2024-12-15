import type { User } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export const getUserSession = async (): Promise<User | undefined> => {
  const authUserSession = await getServerSession(authOptions);
  return authUserSession?.user;
};
