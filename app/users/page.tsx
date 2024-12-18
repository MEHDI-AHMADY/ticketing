import { buttonVariants } from "@/components/ui/button";
import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import options from "../api/auth/[...nextauth]/options";
import DataTableSimple from "./DataTableSimple";

const Users = async () => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive p-2">Admin Access required</p>;
  }

  const users = await prisma?.user.findMany();

  return (
    <div>
      <Link
        href={`/users/new`}
        className={`${buttonVariants({ variant: "default" })}`}
      >
        Create User
      </Link>
      <DataTableSimple users={users} />
    </div>
  );
};

export default Users;
