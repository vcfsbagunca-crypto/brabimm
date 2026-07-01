import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import JournalDayView from "@/components/JournalDayView";
import Link from "next/link";

export default async function JournalPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const hasAccess = await prisma.order.findFirst({
    where: { userId, status: "paid" },
  });

  if (!hasAccess) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-10 text-center">
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 shadow-sm max-w-sm mx-auto">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Acesso Exclusivo</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              O diário emocional está disponível apenas para quem desbloqueou a Jornada de Cura Emocional.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-emerald-400 hover:to-teal-400 transition-all"
            >
              Desbloquear Agora
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Diário Emocional</h1>
          <p className="mt-1.5 text-zinc-500 dark:text-zinc-400">
            Registre seus pensamentos e sentimentos dia a dia
          </p>
        </div>

        <JournalDayView />
      </main>
    </>
  );
}
