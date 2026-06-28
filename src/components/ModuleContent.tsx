"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import type { ModuleContent, Exercise } from "@/lib/modules-data";
import { modulesData } from "@/lib/modules-data";

function ExerciseBlock({
  exercise,
  modId,
  modTitle,
}: {
  exercise: Exercise;
  modId: string;
  modTitle: string;
}) {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  async function save() {
    if (!answer.trim()) return;
    setSaving(true);
    const res = await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `## Exercício: ${exercise.title} (${modTitle})\n\n${answer}`,
        mood: "exercise",
      }),
    });
    if (res.ok) {
      toast.success("Exercício salvo no diário! ✨");
      setAnswer("");
      router.refresh();
    } else {
      toast.error("Erro ao salvar");
    }
    setSaving(false);
  }

  return (
    <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-white/60 dark:bg-zinc-900/60 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100">
            <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-300">{exercise.title}</p>
            <p className="text-xs text-emerald-600/60 dark:text-emerald-400/50">{open ? "Clique para fechar" : "Clique para expandir"}</p>
          </div>
        </div>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-4 w-4 text-emerald-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-emerald-100 dark:border-emerald-900">
              <div className="rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 p-3 border border-emerald-100 dark:border-emerald-900">
                <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">{exercise.prompt}</p>
              </div>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                className="mt-3 w-full rounded-lg border border-emerald-200 dark:border-emerald-900 bg-white dark:bg-zinc-800 p-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900 transition-all resize-none"
                placeholder="Escreva sua reflexão aqui..."
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={save}
                  disabled={saving || !answer.trim()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-medium text-white shadow-md hover:shadow-lg hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50"
                >
                  {saving ? "Salvando..." : "Salvar no Diário"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ModuleContent({
  mod,
  userId,
  isCompleted: initialCompleted,
}: {
  mod: ModuleContent;
  userId: string;
  isCompleted: boolean;
}) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [saving, setSaving] = useState(false);

  const nextMod = modulesData.find((m) => m.order === mod.order + 1);

  async function toggleComplete() {
    setSaving(true);
    const res = await fetch(`/api/modules/${mod.id}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !isCompleted }),
    });
    if (res.ok) {
      setIsCompleted(!isCompleted);
      toast.success(isCompleted ? "Módulo desmarcado" : "Módulo concluído! 🎉", {
        icon: isCompleted ? "↩️" : "✅",
      });
      router.refresh();
    } else {
      toast.error("Erro ao salvar");
    }
    setSaving(false);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 shadow-sm"
          >
            <span className="text-3xl">{mod.icon}</span>
          </motion.div>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Módulo {mod.order} de 10
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {mod.title}
            </h1>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">{mod.description}</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-5">
        {mod.sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            className="group rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-300 hover:border-emerald-100 dark:hover:border-emerald-800 hover:shadow-md hover:shadow-emerald-50 dark:hover:shadow-emerald-950/30"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-bold text-emerald-700">
                {i + 1}
              </span>
              {section.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{section.text}</p>
          </motion.div>
        ))}
      </div>

      {mod.exercises.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8"
        >
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/30 dark:via-zinc-900 dark:to-teal-950/30 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">Exercícios Práticos</h3>
                <p className="text-sm text-emerald-700/70 dark:text-emerald-400/60">
                  {mod.exercises.length} exercício{mod.exercises.length > 1 ? "s" : ""} para praticar o que aprendeu
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {mod.exercises.map((ex, i) => (
                <ExerciseBlock key={i} exercise={ex} modId={mod.id} modTitle={mod.title} />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {mod.summary.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8"
        >
          <div className="rounded-2xl border border-purple-100 dark:border-purple-900 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/30 dark:via-zinc-900 dark:to-pink-950/30 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <h3 className="font-semibold text-purple-900 dark:text-purple-300">Resumo do Módulo</h3>
            </div>
            <ul className="space-y-2">
              {mod.summary.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[8px] font-bold text-purple-600">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-6"
      >
        <div className="flex items-center justify-between rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              isCompleted
                ? "bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}>
              {isCompleted ? (
                <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Progresso do módulo</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {isCompleted
                  ? "Você concluiu este módulo"
                  : "Marque como concluído quando terminar"}
              </p>
            </div>
          </div>
          <button
            onClick={toggleComplete}
            disabled={saving}
            className={`relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              isCompleted
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg hover:from-emerald-400 hover:to-teal-400"
            }`}
          >
            {saving ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : isCompleted ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Desmarcar
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Concluir Módulo
              </>
            )}
          </button>
        </div>
      </motion.div>

      {isCompleted && nextMod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4"
        >
          <Link
            href={`/dashboard/modules/${nextMod.slug}`}
            className="group flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-5 text-white shadow-lg hover:shadow-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <span className="text-2xl">{nextMod.icon}</span>
              </span>
              <div>
                <p className="text-xs font-medium text-white/70 uppercase tracking-wider">
                  Próximo módulo
                </p>
                <p className="text-base font-semibold">
                  {nextMod.order}. {nextMod.title}
                </p>
              </div>
            </div>
            <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      )}

      {isCompleted && !nextMod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4"
        >
          <Link
            href="/dashboard"
            className="group flex items-center justify-between rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-5 text-white shadow-lg hover:shadow-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-medium text-white/70 uppercase tracking-wider">
                  Jornada completa!
                </p>
                <p className="text-base font-semibold">
                  Ver meu progresso no dashboard
                </p>
              </div>
            </div>
            <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      )}
    </motion.article>
  );
}
