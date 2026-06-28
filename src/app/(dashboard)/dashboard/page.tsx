"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { modulesData } from "@/lib/modules-data";
import toast from "react-hot-toast";

interface Progress {
  moduleId: string;
  completed: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 12 },
  },
};

function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#e4e4e7"
          strokeWidth="6"
          className="opacity-30"
        />
        <motion.circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="drop-shadow-sm"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          {percentage}%
        </motion.span>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">completo</span>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse mb-2" />
      <div className="h-5 w-48 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse mb-10" />
      <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 mb-10 bg-white dark:bg-zinc-900 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
          </div>
          <div className="h-32 w-32 rounded-full bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 bg-zinc-100 dark:bg-zinc-800 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/auth/access").then(async (res) => {
        const data = await res.json();
        setHasAccess(data.hasAccess);
      });
    }
  }, [status]);

  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;
        const sessionData = await res.json();
        if (!sessionData?.user?.id) return;

        const progressRes = await fetch(`/api/progress?userId=${sessionData.user.id}`);
        if (progressRes.ok) {
          const data = await progressRes.json();
          setProgress(data);
          const completedCount = data.filter((p: Progress) => p.completed).length;
          if (completedCount === modulesData.length && completedCount > 0) {
            setShowConfetti(true);
          }
        }
      } catch {
        // Fallback: try reading from the modules API
      } finally {
        setLoadingProgress(false);
      }
    }
    if (status === "authenticated") {
      loadProgress();
    }
  }, [status]);

  // Since we can't easily query progress per user from the client without a proper API,
  // let's read from the server-rendered props. But this is a client component...
  // We'll use a simpler approach: fetch progress from a dedicated endpoint.

  const completedIds = new Set(progress.filter((p) => p.completed).map((p) => p.moduleId));
  const totalModules = modulesData.length;
  const completedCount = completedIds.size;
  const percentage = Math.round((completedCount / totalModules) * 100);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  })();

  if (status === "loading" || loadingProgress) {
    return (
      <>
        <Header />
        <DashboardSkeleton />
      </>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <>
      <Header />
      <div className="relative">
        <main
          className={`mx-auto max-w-4xl px-4 py-10 transition-all duration-700 ${
            hasAccess === false ? "blur-sm pointer-events-none select-none" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {greeting}, {session?.user?.name || "bem-vindo"}!
            </h1>
            <p className="mt-1.5 text-zinc-500 dark:text-zinc-400">
              Continue sua jornada de cura emocional
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-10 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm shadow-zinc-200/50 dark:shadow-zinc-900/50"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-0 sm:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Progresso geral</p>
                <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                  {completedCount}
                  <span className="text-lg font-normal text-zinc-400">/{totalModules} módulos</span>
                </p>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  {completedCount === 0
                    ? "Nenhum módulo concluído ainda. Vamos começar!"
                    : completedCount === totalModules
                    ? "Parabéns! Você concluiu todos os módulos! 🎉"
                    : `${totalModules - completedCount} módulos restantes`}
                </p>
              </div>
              <ProgressRing percentage={percentage} />
            </div>
            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {modulesData.map((mod, index) => {
              const isCompleted = completedIds.has(mod.id);
              const colors = [
                "from-emerald-100 to-teal-100",
                "from-teal-100 to-cyan-100",
                "from-purple-100 to-pink-100",
                "from-amber-100 to-orange-100",
                "from-rose-100 to-pink-100",
                "from-sky-100 to-indigo-100",
                "from-emerald-100 to-green-100",
                "from-violet-100 to-purple-100",
                "from-teal-100 to-emerald-100",
                "from-pink-100 to-rose-100",
              ];
              const grad = colors[index % colors.length];

              return (
                <motion.div key={mod.id} variants={itemVariants}>
                  <Link
                    href={`/dashboard/modules/${mod.slug}`}
                    className={`group relative flex items-center gap-4 rounded-2xl border p-5 transition-all duration-300 ${
                      isCompleted
                        ? "border-emerald-200 dark:border-emerald-900 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30"
                        : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md hover:shadow-emerald-100/30 dark:hover:shadow-emerald-900/30"
                    }`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${grad}`}>
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      ) : (
                        <span className="text-xl">{mod.icon}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 transition-colors">
                          {mod.order}. {mod.title}
                        </h3>
                        {isCompleted && (
                          <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider border border-emerald-200 dark:border-emerald-900">
                            Concluído
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400 truncate">{mod.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!isCompleted && (
                        <span className="hidden sm:inline text-xs font-medium text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 transition-colors">
                          Iniciar
                        </span>
                      )}
                      <svg
                        className={`h-5 w-5 transition-all duration-300 ${
                          isCompleted ? "text-emerald-400" : "text-zinc-300 dark:text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {completedCount === totalModules && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <button
                onClick={() => setShowResetConfirm(true)}
                className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-300"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>
                Quero Recomeçar
              </button>
              <p className="mt-2 text-[10px] text-zinc-300 dark:text-zinc-600">
                Reinicia todo o seu progresso nos módulos
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 text-center"
          >
            <p className="text-xs text-zinc-300 dark:text-zinc-600">
              Lembre-se: este guia é uma ferramenta de apoio. Se precisar, procure ajuda profissional.
            </p>
          </motion.div>
        </main>

        {hasAccess === false && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-2xl p-8 max-w-sm w-full text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Acesso Exclusivo</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                Desbloqueie todos os 10 módulos da Jornada de Cura Emocional com acesso vitalício.
              </p>
              <p className="text-2xl font-bold text-emerald-600 mb-6">
                R$ 29,99
                <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500"> única</span>
              </p>
              <button
                onClick={() => router.push("/pricing")}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
              >
                Quero Desbloquear Agora
              </button>
              <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">Pagamento 100% seguro • Garantia de 7 dias</p>
            </div>
          </motion.div>
        )}

        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-2xl p-8 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/50">
                <svg className="h-7 w-7 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Recomeçar Jornada?</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                Todo o seu progresso nos 10 módulos será reiniciado.
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Suas entradas no diário continuarão salvas.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={async () => {
                    setResetting(true);
                    try {
                      const res = await fetch("/api/progress", { method: "DELETE" });
                      if (res.ok) {
                        setProgress([]);
                        setShowResetConfirm(false);
                        toast.success("Progresso reiniciado! 🎯");
                        router.refresh();
                      } else {
                        toast.error("Erro ao reiniciar");
                      }
                    } catch {
                      toast.error("Erro ao reiniciar");
                    }
                    setResetting(false);
                  }}
                  disabled={resetting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 disabled:opacity-50"
                >
                  {resetting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Reiniciando...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                      </svg>
                      Sim, quero recomeçar
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="rounded-xl px-6 py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
}
