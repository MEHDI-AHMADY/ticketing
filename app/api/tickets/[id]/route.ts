import prisma from "@/prisma/db";
import { ticketSchema } from "@/validationSchema/ticket";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const mainTicket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!mainTicket) {
    return NextResponse.json({ error: "Ticket Not Found!" }, { status: 404 });
  }

  const updateTicket = await prisma.ticket.update({
    where: { id: mainTicket.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updateTicket);
}
