import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { content, mood } = await req.json();

  const entry = await prisma.journalEntry.create({
    data: {
      userId: session.user.id,
      content,
      mood: mood || null,
    },
  });

  return NextResponse.json(entry, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const entries = await prisma.journalEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(entries);
}
