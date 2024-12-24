import { Prisma } from "@prisma/client";
import Link from "next/link";
import TicketPriority from "./TicketPriority";
import TicketStatusBadge from "./TicketStatusBadge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { assignedToUser: true };
}>;

interface DashRecentTicketsProps {
  tickets: TicketWithUser[];
}

const DashRecentTickets = ({ tickets }: DashRecentTicketsProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {tickets
          ? tickets.map((ticket) => (
              <div className="flex items-center" key={ticket.id}>
                <TicketStatusBadge status={ticket.status} />
                <div className="ml-4 space-y-1">
                  <Link href={`/tickets/${ticket.id}`}>
                    <p>{ticket.title}</p>
                    <p>{ticket.assignedToUser?.name || "unassigned"}</p>
                  </Link>
                </div>
                <div className="ml-auto font-medium">
                    <TicketPriority priority={ticket.priority}/>
                </div>
              </div>
            ))
          : null}
      </CardContent>
    </Card>
  );
};

export default DashRecentTickets;
