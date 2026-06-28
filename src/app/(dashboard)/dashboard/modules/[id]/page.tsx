import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { modulesData } from "@/lib/modules-data";
import Header from "@/components/Header";
import ModuleContent from "@/components/ModuleContent";

export default async function ModulePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const mod = modulesData.find((m) => m.slug === id);
  if (!mod) notFound();

  const progress = await prisma.moduleProgress.findUnique({
    where: {
      userId_moduleId: {
        userId: session.user.id,
        moduleId: mod.id,
      },
    },
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <ModuleContent
          mod={mod}
          userId={session.user.id}
          isCompleted={progress?.completed ?? false}
        />
      </main>
    </>
  );
}
