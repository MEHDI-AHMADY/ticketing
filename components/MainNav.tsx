import Link from "next/link";
import MainNavLinks from "./MainNavLinks";
import ToggleMode from "./ToggleMode";

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <MainNavLinks />

      <div className="flex items-center gap-2">
        <Link href="/">Logout</Link>
        <ToggleMode />
      </div>
    </div>
  );
};

export default MainNav;
