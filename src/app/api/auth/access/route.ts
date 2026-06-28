import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ hasAccess: false, reason: "unauthenticated" });
  }

  const order = await prisma.order.findFirst({
    where: { userId: session.user.id, status: "paid" },
  });

  return NextResponse.json({ hasAccess: !!order });
}