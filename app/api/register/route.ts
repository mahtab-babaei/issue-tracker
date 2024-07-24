import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerUserSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = await registerUserSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {status: 400});

  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })

  if (user)
    return NextResponse.json({error: 'User already exists.'}, {status: 400})

  const hashedPassword = await bcrypt.hash(body.password, 10)
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword
    }
  })

  return NextResponse.json(newUser.email);
}