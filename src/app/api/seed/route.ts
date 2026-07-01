import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Não permitido" }, { status: 403 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { modulesData } = await import("@/lib/modules-data");

    for (const mod of modulesData) {
      await prisma.module.upsert({
        where: { slug: mod.slug },
        update: {
          title: mod.title,
          description: mod.description,
          icon: mod.icon,
          order: mod.order,
          content: mod.sections.map((s) => `## ${s.heading}\n\n${s.text}`).join("\n\n"),
        },
        create: {
          id: mod.id,
          order: mod.order,
          title: mod.title,
          slug: mod.slug,
          description: mod.description,
          icon: mod.icon,
          content: mod.sections.map((s) => `## ${s.heading}\n\n${s.text}`).join("\n\n"),
        },
      });
    }

    return NextResponse.json({ success: true, count: modulesData.length });
  } catch {
    return NextResponse.json({ message: "Erro ao popular dados" }, { status: 500 });
  }
}
