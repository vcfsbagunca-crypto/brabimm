"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface JournalEntry {
  id: string;
  content: string;
  mood: string | null;
  createdAt: string;
}

interface DayPage {
  date: string;
  label: string;
  entries: JournalEntry[];
  isToday: boolean;
}

function formatDateBR(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getDayKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getDayLabel(date: Date, isToday: boolean): string {
  if (isToday) return "Hoje";
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (getDayKey(date) === getDayKey(yesterday)) return "Ontem";
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });
}

function MoodBadge({ mood }: { mood: string }) {
  const moods: Record<string, { emoji: string; label: string; bg: string }> = {
    feliz: { emoji: "😊", label: "Feliz", bg: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400" },
    calmo: { emoji: "😌", label: "Calmo", bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400" },
    neutro: { emoji: "😐", label: "Neutro", bg: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" },
    triste: { emoji: "😢", label: "Triste", bg: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400" },
    ansioso: { emoji: "😰", label: "Ansioso", bg: "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400" },
    irritado: { emoji: "😤", label: "Irritado", bg: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400" },
  };
  const m = moods[mood];
  if (!m) return null;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${m.bg}`}>
      {m.emoji} {m.label}
    </span>
  );
}

export default function JournalDayView() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [allDays, setAllDays] = useState<DayPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0";
    const minH = 80;
    const maxH = 320;
    const newH = Math.min(Math.max(el.scrollHeight, minH), maxH);
    el.style.height = `${newH}px`;
    el.style.overflowY = el.scrollHeight > maxH ? "auto" : "hidden";
  }, []);

  useEffect(() => {
    autoResize();
  }, [content, autoResize]);

  const todayKey = getDayKey(new Date());
  const selectedKey = getDayKey(selectedDate);
  const isToday = selectedKey === todayKey;

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    try {
      const res = await fetch("/api/journal");
      if (res.ok) {
        const data: JournalEntry[] = await res.json();
        groupByDays(data);
      }
    } catch {}
    setLoading(false);
  }

  function groupByDays(allEntries: JournalEntry[]) {
    const dayMap = new Map<string, JournalEntry[]>();
    for (const entry of allEntries) {
      const key = entry.createdAt.split("T")[0];
      if (!dayMap.has(key)) dayMap.set(key, []);
      dayMap.get(key)!.push(entry);
    }

    const days: DayPage[] = [];
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = getDayKey(d);
      const dayEntries = dayMap.get(key) || [];
      days.push({
        date: key,
        label: getDayLabel(d, i === 0),
        entries: dayEntries,
        isToday: i === 0,
      });
    }
    setAllDays(days);

    const selEntries = dayMap.get(selectedKey) || [];
    setEntries(selEntries);
  }

  function selectDay(day: DayPage) {
    const [y, m, d] = day.date.split("-").map(Number);
    setSelectedDate(new Date(y, m - 1, d));
    setEntries(day.entries);
  }

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
      const newEntry: JournalEntry = await res.json();
      setEntries((prev) => [newEntry, ...prev]);
      setAllDays((prev) => {
        const updated = prev.map((day) => {
          if (day.date === selectedKey) {
            return { ...day, entries: [newEntry, ...day.entries] };
          }
          return day;
        });
        return updated;
      });
      setContent("");
      setMood("");
      toast.success("Entrada salva!");
    } else {
      toast.error("Erro ao salvar");
    }
    setSaving(false);
  }

  function navigateDay(offset: number) {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + offset);
    if (newDate > new Date()) return;
    setSelectedDate(newDate);
    const newKey = getDayKey(newDate);
    const day = allDays.find((d) => d.date === newKey);
    setEntries(day?.entries || []);
  }

  const prevDate = new Date(selectedDate);
  prevDate.setDate(prevDate.getDate() - 1);
  const canGoPrev = prevDate <= new Date();
  const nextDate = new Date(selectedDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const canGoNext = nextDate <= new Date();

  const moods = [
    { value: "feliz", emoji: "😊", label: "Feliz" },
    { value: "calmo", emoji: "😌", label: "Calmo" },
    { value: "neutro", emoji: "😐", label: "Neutro" },
    { value: "triste", emoji: "😢", label: "Triste" },
    { value: "ansioso", emoji: "😰", label: "Ansioso" },
    { value: "irritado", emoji: "😤", label: "Irritado" },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Conteúdo principal — aparece primeiro no mobile */}
      <div className="lg:order-2">
        {/* Navegação do dia */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateDay(-1)}
            disabled={!canGoPrev}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all disabled:opacity-30"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isToday ? "Hoje" : formatDateBR(selectedDate)}
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              {entries.length} entrada{entries.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => navigateDay(1)}
            disabled={!canGoNext}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all disabled:opacity-30"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Formulário (só hoje) */}
        {isToday && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100">
                <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </span>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Nova entrada</h3>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Como você está se sentindo?</p>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                autoResize();
              }}
              rows={3}
              className="w-full resize-none overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900 transition-all leading-relaxed"
              placeholder="Escreva livremente sobre seus pensamentos..."
              style={{ minHeight: "80px" }}
            />

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                {moods.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMood(mood === m.value ? "" : m.value)}
                    className={`rounded-lg px-2 py-1.5 text-sm transition-all duration-200 ${
                      mood === m.value
                        ? "bg-emerald-100 dark:bg-emerald-950/50 scale-110 shadow-sm"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                    title={m.label}
                  >
                    {m.emoji}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={saving || !content.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50 shrink-0"
              >
                {saving ? (
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                Salvar
              </button>
            </div>
          </motion.form>
        )}

        {/* Lista de entradas do dia */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {entries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 p-10 text-center"
              >
                <span className="text-3xl">📝</span>
                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  {isToday ? "Nenhuma entrada hoje. Comece a escrever!" : "Nenhuma entrada neste dia."}
                </p>
              </motion.div>
            ) : (
              entries.map((entry, idx) => {
                const isExpanded = expandedIds.has(entry.id);
                const isExercise = entry.content.startsWith("## Exercício:");
                const displayContent = isExercise
                  ? entry.content.replace(/^## Exercício:.*\n\n/, "")
                  : entry.content;
                const isLong = displayContent.length > 30;
                const preview = isLong ? displayContent.slice(0, 30) + "..." : displayContent;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.05 }}
                    className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                        {new Date(entry.createdAt).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {entry.mood && entry.mood !== "exercise" && (
                        <MoodBadge mood={entry.mood} />
                      )}
                    </div>
                    {isExercise ? (
                      <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-3 border border-emerald-100 dark:border-emerald-900">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                          Exercício do diário
                        </p>
                        <div className="whitespace-pre-wrap break-words text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          {isExpanded || !isLong ? displayContent : preview}
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap break-words text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {isExpanded || !isLong ? displayContent : preview}
                      </div>
                    )}
                    {isLong && (
                      <button
                        onClick={() => {
                          setExpandedIds((prev) => {
                            const next = new Set(prev);
                            if (next.has(entry.id)) next.delete(entry.id);
                            else next.add(entry.id);
                            return next;
                          });
                        }}
                        className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        {isExpanded ? "Ver menos" : "Ver mais"}
                      </button>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar: dias anteriores — aparece depois no mobile */}
      <div className="lg:order-1">
        <div className="sticky top-24">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 px-1">
            Páginas
          </h3>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
            {allDays.map((day) => {
              const isSelected = day.date === selectedKey;
              const hasEntries = day.entries.length > 0;
              return (
                <button
                  key={day.date}
                  onClick={() => selectDay(day)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                    isSelected
                      ? "bg-emerald-500 text-white"
                      : hasEntries
                      ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600"
                  }`}>
                    {day.date.split("-")[2]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isSelected ? "text-emerald-700 dark:text-emerald-300" : ""}`}>
                      {day.label}
                    </p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      {hasEntries ? `${day.entries.length} entrada${day.entries.length > 1 ? "s" : ""}` : "Sem entradas"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
