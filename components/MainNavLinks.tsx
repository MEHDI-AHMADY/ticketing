"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavLinks = ({ role }: { role?: string }) => {
  const links = [
    { label: "Dashboard", href: "/", onlyAdmin: false },
    { label: "Tickets", href: "/tickets", onlyAdmin: false },
    { label: "Users", href: "/users", onlyAdmin: true },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links
        .filter((link) => !link.onlyAdmin || role === "ADMIN")
        .map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className={`navbar-link ${
              currentPath === link.href &&
              "cursor-default text-primary/70 hover:text-primary/60"
            }`}
          >
            {link.label}
          </Link>
        ))}
    </div>
  );
};

export default MainNavLinks;
