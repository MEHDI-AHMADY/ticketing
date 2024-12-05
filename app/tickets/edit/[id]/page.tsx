import prisma from "@/prisma/db";
import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

interface EditPageProps {
  params: { id: string };
}

const EditPage = async ({ params }: EditPageProps) => {

    const mainTicket = await prisma?.ticket.findUnique({
        where : {id : parseInt(params.id)}
    })

    if(!mainTicket) {
        return <p className="text-destructive">Ticket not found!</p>
    }

  return <TicketForm ticket={mainTicket}/>;
};

export default EditPage;
