import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import JournalForm from "@/components/JournalForm";

export default async function JournalPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Diário Emocional</h1>
          <p className="mt-1.5 text-zinc-500 dark:text-zinc-400">
            Escreva livremente sobre seus pensamentos, sentimentos e descobertas
          </p>
        </div>

        <JournalForm />

        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
              <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Histórico</h2>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">({entries.length} entradas)</span>
          </div>

          {entries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 p-12 text-center">
              <span className="text-4xl">📝</span>
              <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-medium">Nenhuma entrada ainda</p>
              <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
                Comece a escrever acima e registre sua jornada emocional
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, idx) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm hover:shadow-md transition-shadow"
                  style={{
                    animation: `fade-in-up 0.5s ease-out ${idx * 0.05}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                      {new Date(entry.createdAt).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {entry.mood && entry.mood !== "exercise" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-zinc-100 to-gray-100 dark:from-zinc-800 dark:to-zinc-800 px-2.5 py-1 text-[10px] font-medium text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700">
                        {entry.mood === "feliz" && "😊"}
                        {entry.mood === "calmo" && "😌"}
                        {entry.mood === "neutro" && "😐"}
                        {entry.mood === "triste" && "😢"}
                        {entry.mood === "ansioso" && "😰"}
                        {entry.mood === "irritado" && "😤"}
                        {" "}{entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                      </span>
                    )}
                  </div>
                  {entry.content.startsWith("## Exercício:") ? (
                    <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-3 border border-emerald-100 dark:border-emerald-900">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                        Exercício do diário
                      </p>
                      <div className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {entry.content.replace(/^## Exercício:.*\n\n/, "")}
                      </div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {entry.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
