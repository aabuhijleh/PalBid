import Link from "next/link";
import Image from "next/image";
import { env } from "#/config/env";
import { getMe } from "#/server/queries";

export async function Navbar() {
  const currentUser = await getMe();

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link className="flex items-center font-bold" href="/">
              PalBid
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <UserAvatar user={currentUser} />
                  <span className="text-sm font-medium">
                    {currentUser.name}
                  </span>
                </div>
                <SignOutButton />
              </div>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function UserAvatar({
  user,
}: {
  user: { avatar: string | null; name: string | null };
}) {
  return (
    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-100">
      {user.avatar ? (
        <Image
          alt={user.name || "User avatar"}
          className="object-cover"
          fill
          src={user.avatar}
        />
      ) : null}
    </div>
  );
}

function SignInButton() {
  return (
    <form
      action={new URL("/users/sign-in", env.NEXT_PUBLIC_API_URL).href}
      method="get"
    >
      <button
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}

function SignOutButton() {
  return (
    <form
      action={new URL("/users/sign-out", env.NEXT_PUBLIC_API_URL).href}
      method="post"
    >
      <button
        className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
        type="submit"
      >
        Sign out
      </button>
    </form>
  );
}
