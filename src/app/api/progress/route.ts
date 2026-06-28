import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const progress = await prisma.moduleProgress.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(progress);
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  await prisma.moduleProgress.deleteMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ success: true });
}
