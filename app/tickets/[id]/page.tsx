import prisma from "@/prisma/db";
import TicketDetail from "./TicketDetail";

interface ViewTicketProps {
  params: { id: string };
}

const ViewTicket = async ({ params }: ViewTicketProps) => {
  const mainTicket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  const users = await prisma.user.findMany();

  if (!mainTicket) {
    return <p className="text-destructive">Ticket not found!</p>;
  }

  return <TicketDetail ticket={mainTicket} users={users} />;
};

export default ViewTicket;
