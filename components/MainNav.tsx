import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import MainNavLinks from "./MainNavLinks";
import ToggleMode from "./ToggleMode";

const MainNav = async () => {
  const session = await getServerSession(options);

  return (
    <div className="flex justify-between">
      <MainNavLinks role={session?.user.role}/>

      <div className="flex items-center gap-2">
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
        <ToggleMode />
      </div>
    </div>
  );
};

export default MainNav;
