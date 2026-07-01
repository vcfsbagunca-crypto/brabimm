"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { modulesData } from "@/lib/modules-data";
import ThemeToggle from "@/components/ThemeToggle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

function DecorativeBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-multiply filter blur-2xl opacity-10 ${className}`}
      animate={{ 
        x: [0, 50, -30, 0], 
        y: [0, -60, 30, 0], 
        scale: [1, 1.2, 0.8, 1],
        opacity: [0.1, 0.2, 0.1, 0.1]
      }}
      transition={{ 
        repeat: Infinity, 
        repeatType: "reverse",
        duration: 25 + delay, 
        ease: "easeInOut",
        delay
      }}
    />
  );
}

function FloatingShape({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
    >
      <div 
        className="h-full w-full rounded-full bg-gradient-to-br from-emerald-200/20 via-teal-200/20 to-purple-200/20 backdrop-blur-sm border border-emerald-200/10"
        style={
          {
            animation: `float-depth ${8 + delay * 2}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          } as React.CSSProperties
        }
      />
    </motion.div>
  );
}

function TypewriterText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03, type: "spring", stiffness: 200 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function LandingPage() {
  const modulesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800" />
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Cura Emocional" className="h-8 w-auto" />
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Cura Emocional
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/login"
              className="relative inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Começar Agora
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <DecorativeBlob className="top-20 left-10 w-96 h-96 bg-emerald-200" delay={0.0} />
        <DecorativeBlob className="top-40 right-20 w-[30rem] h-[30rem] bg-teal-200" delay={0.8} />
        <DecorativeBlob className="bottom-20 left-1/3 w-80 h-80 bg-purple-200" delay={1.2} />
        <DecorativeBlob className="top-60 left-1/4 w-64 h-64 bg-cyan-200" delay={1.5} />
        <DecorativeBlob className="bottom-40 right-1/4 w-48 h-48 bg-pink-200" delay={2.0} />

        <FloatingShape className="top-32 left-[15%] w-20 h-20" delay={0.2} />
        <FloatingShape className="top-48 right-[20%] w-16 h-16" delay={0.7} />
        <FloatingShape className="bottom-40 left-[25%] w-24 h-24" delay={1.2} />
        <FloatingShape className="bottom-32 right-[15%] w-14 h-14" delay={0.5} />
        <FloatingShape className="top-64 left-[45%] w-18 h-18" delay={1.8} />
        <FloatingShape className="top-80 right-[10%] w-12 h-12" delay={2.3} />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-200/50 shadow-sm">
              <motion.span 
              className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" 
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >Sua jornada de autocuidado começa aqui</motion.span>
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <TypewriterText text="Sua Jornada de" className="text-zinc-900 dark:text-zinc-100" />
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-500 bg-clip-text text-transparent">
              <TypewriterText text="Cura Emocional" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed"
          >
            Um guia interativo com 10 passos práticos para ajudar você a entender,
            processar e superar experiências traumáticas. No seu ritmo, no seu tempo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:shadow-emerald-300/50 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 active:scale-[0.98]"
            >
              <span>Começar Gratuitamente</span>
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#modulos"
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm px-8 py-4 text-base font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-lg transition-all duration-300"
            >
              <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Ver Módulos
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-16 flex items-center justify-center gap-8 text-sm text-zinc-400 dark:text-zinc-500"
          >
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Conteúdo validado
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No seu ritmo
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              100% gratuito
            </span>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent pointer-events-none" />
      </section>

      <section id="modulos" ref={modulesRef} className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />
        <DecorativeBlob className="top-40 left-0 w-72 h-72 bg-emerald-200/40" />
        <DecorativeBlob className="bottom-40 right-0 w-96 h-96 bg-purple-200/30" />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              staggerChildren: 0.1
            }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-200/50 mb-4">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Os 10 Passos
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mt-3">
              Sua Jornada em{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                10 Módulos
              </span>
            </h2>
            <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Cada módulo contém conteúdo educativo, exercícios práticos e espaço para reflexão pessoal
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {modulesData.map((mod, index) => {
              const colors = [
                "from-emerald-500 to-teal-500",
                "from-teal-500 to-cyan-500",
                "from-purple-500 to-pink-500",
                "from-amber-500 to-orange-500",
                "from-rose-500 to-pink-500",
                "from-sky-500 to-indigo-500",
                "from-emerald-500 to-green-500",
                "from-violet-500 to-purple-500",
                "from-teal-500 to-emerald-500",
                "from-pink-500 to-rose-500",
              ];
              const grad = colors[index % colors.length];
              return (
                <motion.div
                  key={mod.id}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-emerald-200/0 via-transparent to-purple-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div
                    className={`relative rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 card-hover card-glow`}
                  >
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${grad} shadow-lg`}>
                      <span className="text-2xl">{mod.icon}</span>
                    </div>
                    <div className="mt-5">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                        Módulo {String(mod.order).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 transition-colors">
                        {mod.title}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Acessar módulo</span>
                      <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700">
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm"
              animate={{ 
                y: [0, -20, 0], 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10 backdrop-blur-sm"
              animate={{ 
                y: [0, 30, 0], 
                scale: [1, 0.9, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5 backdrop-blur-sm"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1, 
            ease: [0.4, 0, 0.2, 1],
            staggerChildren: 0.1
          }}
          className="relative z-10 mx-auto max-w-3xl px-4 text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-white"
          >
            Pronto para começar?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="mt-4 text-lg text-emerald-100/80 max-w-xl mx-auto"
          >
            Cadastre-se grátis e acesse todos os módulos, diário emocional e
            acompanhamento de progresso.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href="/register"
              className="group mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <span>Criar Conta Gratuita</span>
              <svg className="h-5 w-5 transition-all group-hover:translate-x-1 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <footer className="border-t border-zinc-100 dark:border-zinc-800 py-8">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Cura Emocional — Um guia de apoio. Não substitui acompanhamento profissional.
          </p>
          <p className="text-xs text-zinc-300 dark:text-zinc-600">
            Feito com cuidado para sua jornada de autocuidado
          </p>
        </div>
      </footer>
    </div>
  );
}
