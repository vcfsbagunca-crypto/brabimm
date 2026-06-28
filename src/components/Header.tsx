"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 glass-strong" />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href={user ? "/dashboard" : "/"}
          className="group flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-sm shadow-lg shadow-emerald-200">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Cura Emocional
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex relative px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                Início
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/dashboard/journal"
                className="hidden sm:inline-flex relative px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                Diário
              </Link>
              <div className="hidden sm:block h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 px-3 py-1.5 text-sm text-zinc-700 hover:from-emerald-100 hover:to-teal-100 transition-all border border-emerald-100 dark:from-emerald-950/40 dark:to-teal-950/40 dark:text-zinc-300 dark:border-emerald-900"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[10px] font-bold text-white">
                    {(user.name || user.email || "U")[0].toUpperCase()}
                  </span>
                  <span className="hidden sm:inline max-w-[120px] truncate">
                    {user.name || user.email}
                  </span>
                  <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 shadow-xl shadow-black/5 dark:shadow-black/50 border border-zinc-100 dark:border-zinc-800 py-1.5 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Conectado como</p>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/journal"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Diário
                      </Link>
                      <div className="border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            signOut({ callbackUrl: "/" });
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sair
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="relative px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
              >
                Começar Agora
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
