import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { modulesData } from "@/lib/modules-data";

export async function GET() {
  try {
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
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro ao popular dados";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
