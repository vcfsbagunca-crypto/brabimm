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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
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
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#e4e4e7" strokeWidth="6" className="opacity-30" />
        <motion.circle
          cx="64" cy="64" r={radius} fill="none" stroke="url(#progressGrad)" strokeWidth="6" strokeLinecap="round"
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
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

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
          if (completedCount === modulesData.length && completedCount > 0) setShowConfetti(true);
        }
      } catch {} finally {
        setLoadingProgress(false);
      }
    }
    if (status === "authenticated") loadProgress();
  }, [status]);

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
          {/* Saudação */}
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

          {/* Cards de ação rápida */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            <Link
              href="/dashboard/journal"
              className="group flex items-center gap-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-5 hover:shadow-lg hover:shadow-emerald-100/50 dark:hover:shadow-emerald-900/30 transition-all duration-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-emerald-800 dark:text-emerald-200 group-hover:text-emerald-900 dark:group-hover:text-emerald-100 transition-colors">Diário Emocional</p>
                <p className="text-xs text-emerald-600/70 dark:text-emerald-400/60">Registre seus sentimentos</p>
              </div>
              <svg className="ml-auto h-5 w-5 text-emerald-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <div className="flex items-center gap-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <ProgressRing percentage={percentage} />
              <div>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-medium">Progresso</p>
                <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {completedCount}<span className="text-base font-normal text-zinc-400">/{totalModules}</span>
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {completedCount === 0 ? "Vamos começar!" : completedCount === totalModules ? "Jornada completa!" : `${totalModules - completedCount} restantes`}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Barra de progresso */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Progresso da Jornada</p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{percentage}%</p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Módulos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-4"
          >
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Módulos</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Complete cada módulo na ordem recomendada</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2"
          >
            {modulesData.map((mod, index) => {
              const isCompleted = completedIds.has(mod.id);
              const isNext = !isCompleted && (index === 0 || completedIds.has(modulesData[index - 1]?.id));
              const colors = [
                "from-emerald-400 to-teal-500",
                "from-teal-400 to-cyan-500",
                "from-purple-400 to-pink-500",
                "from-amber-400 to-orange-500",
                "from-rose-400 to-pink-500",
                "from-sky-400 to-indigo-500",
                "from-emerald-400 to-green-500",
                "from-violet-400 to-purple-500",
                "from-teal-400 to-emerald-500",
                "from-pink-400 to-rose-500",
              ];
              const grad = colors[index % colors.length];

              return (
                <motion.div key={mod.id} variants={itemVariants}>
                  <Link
                    href={`/dashboard/modules/${mod.slug}`}
                    className={`group relative flex flex-col rounded-2xl border p-5 transition-all duration-300 ${
                      isCompleted
                        ? "border-emerald-200 dark:border-emerald-900 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30"
                        : isNext
                        ? "border-emerald-300 dark:border-emerald-800 bg-white dark:bg-zinc-900 shadow-md shadow-emerald-100/30 dark:shadow-emerald-900/20"
                        : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${grad} shadow-md`}>
                        {isCompleted ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-500">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        ) : (
                          <span className="text-xl">{mod.icon}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                            Módulo {String(mod.order).padStart(2, "0")}
                          </span>
                          {isCompleted && (
                            <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                              Concluído
                            </span>
                          )}
                          {isNext && !isCompleted && (
                            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                              Próximo
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {mod.title}
                        </h3>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {mod.description}
                        </p>
                      </div>
                      <svg
                        className={`h-5 w-5 shrink-0 transition-all duration-300 mt-1 ${
                          isCompleted ? "text-emerald-400" : isNext ? "text-emerald-500 group-hover:translate-x-1" : "text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400"
                        }`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Reset */}
          {completedCount === totalModules && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 hover:bg-rose-50 transition-all"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>
                Quero Recomeçar
              </button>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 text-center">
            <p className="text-xs text-zinc-300 dark:text-zinc-600">
              Lembre-se: este guia é uma ferramenta de apoio. Se precisar, procure ajuda profissional.
            </p>
          </motion.div>
        </main>

        {/* Overlay de acesso */}
        {hasAccess === false && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="absolute inset-0 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-2xl p-8 max-w-sm w-full text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Acesso Exclusivo</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Desbloqueie todos os 10 módulos com acesso vitalício.</p>
              <p className="text-2xl font-bold text-emerald-600 mb-6">R$ 24,99<span className="text-sm font-normal text-zinc-400"> única</span></p>
              <button onClick={() => router.push("/pricing")} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:from-emerald-400 hover:to-teal-400 transition-all">
                Quero Desbloquear Agora
              </button>
            </div>
          </motion.div>
        )}

        {/* Modal reset */}
        {showResetConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={() => setShowResetConfirm(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-2xl p-8 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                <svg className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Recomeçar Jornada?</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Todo o progresso será reiniciado. O diário continua salvo.</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={async () => {
                    setResetting(true);
                    const res = await fetch("/api/progress", { method: "DELETE" });
                    if (res.ok) {
                      setProgress([]);
                      setShowResetConfirm(false);
                      toast.success("Progresso reiniciado!");
                      router.refresh();
                    } else {
                      toast.error("Erro ao reiniciar");
                    }
                    setResetting(false);
                  }}
                  disabled={resetting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-50"
                >
                  {resetting ? "Reiniciando..." : "Sim, recomeçar"}
                </button>
                <button onClick={() => setShowResetConfirm(false)} className="rounded-xl px-6 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 transition-all">
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
