import { buttonVariants } from "@/components/ui/button";
import prisma from "@/prisma/db";
import Link from "next/link";
import DataTable from "./DataTable";

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <Link
        href={"/tickets/new"}
        className={buttonVariants({ variant: "default" })}
      >New Ticket</Link>
      <DataTable tickets={tickets} />
    </div>
  );
};

export default Tickets;
