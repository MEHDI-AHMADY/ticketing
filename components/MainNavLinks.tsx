"use client";

import { Role } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const isPrime = (num : number) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const getPrimeNumbers = (arr : number[]) => {
  return arr.filter(isPrime);
};

console.log(getPrimeNumbers([2, 3, 4, 5, 7, 9, 11, 13, 17, 19, 21 , 113]));

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
