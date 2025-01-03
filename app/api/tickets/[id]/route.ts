import prisma from "@/prisma/db";
import { ticketPatchSchema } from "@/validationSchema/ticket";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import options from "../../auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 });
  }

  const body = await request.json();
  const validation = ticketPatchSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const mainTicket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!mainTicket) {
    return NextResponse.json({ error: "Ticket Not Found!" }, { status: 404 });
  }

  if (body?.assignedToUserId) {
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }

  const updateTicket = await prisma.ticket.update({
    where: { id: mainTicket.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updateTicket);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const mainTicket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!mainTicket) {
    return NextResponse.json({ error: "Ticket Not Found!" }, { status: 404 });
  }

  await prisma.ticket.delete({
    where: { id: mainTicket.id },
  });

  return NextResponse.json({ message: "Ticket deleted." });
}
