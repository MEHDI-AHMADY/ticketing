import { buttonVariants } from "@/components/ui/button";
import UserForm from "@/components/UserForm"
import prisma from "@/prisma/db"
import Link from "next/link";
import DataTableSimple from "./DataTableSimple"

const Users = async () => {

  const users = await prisma?.user.findMany();
  return (
    <div>
      <Link href={`/users/new`} className={`${buttonVariants({variant : "default"})}`}>
        Create User
      </Link>
      <DataTableSimple users={users}/>
    </div>
  )
}

export default Users