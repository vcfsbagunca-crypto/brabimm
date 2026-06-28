"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function JournalForm() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setSaving(true);

    const res = await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, mood: mood || undefined }),
    });

    if (res.ok) {
      toast.success("Entrada salva! ✨");
      setContent("");
      setMood("");
      router.refresh();
    } else {
      toast.error("Erro ao salvar");
    }
    setSaving(false);
  }

  const moods = [
    { value: "feliz", label: "Feliz", emoji: "😊", color: "from-amber-100 to-yellow-100" },
    { value: "calmo", label: "Calmo", emoji: "😌", color: "from-emerald-100 to-teal-100" },
    { value: "neutro", label: "Neutro", emoji: "😐", color: "from-zinc-100 to-gray-100" },
    { value: "triste", label: "Triste", emoji: "😢", color: "from-sky-100 to-blue-100" },
    { value: "ansioso", label: "Ansioso", emoji: "😰", color: "from-purple-100 to-pink-100" },
    { value: "irritado", label: "Irritado", emoji: "😤", color: "from-red-100 to-rose-100" },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100">
          <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </span>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Nova entrada</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Como você está se sentindo agora?</p>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900 transition-all"
        placeholder="Escreva livremente sobre seus pensamentos, sentimentos e descobertas..."
      />

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Humor:</span>
          <div className="flex gap-1 flex-wrap">
            {moods.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(mood === m.value ? "" : m.value)}
                className={`rounded-lg px-2.5 py-1.5 text-sm transition-all duration-200 ${
                  mood === m.value
                    ? `bg-gradient-to-r ${m.color} shadow-sm scale-110`
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                title={m.label}
              >
                {m.emoji}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving || !content.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50 shrink-0"
        >
          {saving ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Salvando...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Salvar entrada
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
