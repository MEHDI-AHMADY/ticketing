import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { userSchema } from "@/validationSchema/user";
import { getServerSession } from "next-auth";
import options from "../../auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Only Admins are allowed to create new Users." },
      { status: 401 }
    );
  }

  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const mainUser = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!mainUser) {
    return NextResponse.json(
      { error: "User does not exist!" },
      { status: 404 }
    );
  }

  if (body?.password && body.password !== "") {
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
  } else {
    delete body.password;
  }

  if (mainUser.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (duplicateUsername) {
      return NextResponse.json(
        { message: "Duplicate Username!" },
        { status: 409 }
      );
    }
  }

  const updateUser = await prisma.user.update({
    where: { id: mainUser.id },
    data: { ...body },
  });

  return NextResponse.json(updateUser);
}
