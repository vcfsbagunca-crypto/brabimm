import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateCsrf } from "@/lib/csrf";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!validateCsrf(req)) {
    return NextResponse.json({ message: "Requisição inválida" }, { status: 403 });
  }

  const { id: moduleId } = await context.params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { completed } = await req.json();

  await prisma.moduleProgress.upsert({
    where: {
      userId_moduleId: {
        userId: session.user.id,
        moduleId,
      },
    },
    update: { completed },
    create: {
      userId: session.user.id,
      moduleId,
      completed,
    },
  });

  return NextResponse.json({ success: true });
}
