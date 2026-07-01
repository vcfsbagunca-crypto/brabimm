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
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function DecorativeBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-multiply filter blur-3xl ${className}`}
      animate={{
        x: [0, 40, -20, 0],
        y: [0, -50, 25, 0],
        scale: [1, 1.15, 0.9, 1],
        opacity: [0.08, 0.15, 0.08, 0.08],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 20 + delay * 3,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function FloatingDot({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "backOut" }}
    >
      <div
        className="h-full w-full rounded-full bg-gradient-to-br from-emerald-300/30 to-teal-300/30 border border-emerald-200/20"
        style={
          {
            animation: `float-depth ${10 + delay * 2}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          } as React.CSSProperties
        }
      />
    </motion.div>
  );
}

function TypewriterText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.span>
  );
}

export default function LandingPage() {
  const modulesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border-b border-white/20 dark:border-white/5" />
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Cura Emocional" className="h-9 w-auto" />
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Cura Emocional
            </span>
          </Link>
          <nav className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/login"
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
            >
              Começar Agora
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient de fundo suave */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/80 via-white to-white dark:from-emerald-950/20 dark:via-zinc-900 dark:to-zinc-900" />

        {/* Blobs decorativos — reduzido pra mobile */}
        <DecorativeBlob className="top-16 left-[5%] w-[28rem] h-[28rem] bg-emerald-200" delay={0} />
        <DecorativeBlob className="bottom-24 right-[8%] w-[24rem] h-[24rem] bg-teal-200" delay={1} />

        {/* Pontos flutuantes — reduzido */}
        <FloatingDot className="top-[20%] left-[12%] w-3 h-3" delay={0.2} />
        <FloatingDot className="bottom-[30%] right-[15%] w-2.5 h-2.5" delay={0.8} />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 mx-auto max-w-4xl px-5 text-center"
        >
          {/* Badge animado */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm px-5 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Sua jornada de autocuidado começa aqui
            </span>
          </motion.div>

          {/* Título principal */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <TypewriterText text="Sua Jornada de" className="text-zinc-900 dark:text-zinc-50" />
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-500 bg-clip-text text-transparent">
              <TypewriterText text="Cura Emocional" />
            </span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mx-auto mt-7 max-w-2xl text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed"
          >
            Um guia interativo com 10 passos práticos para ajudar você a entender,
            processar e superar experiências traumáticas. <span className="text-emerald-600 dark:text-emerald-400 font-medium">No seu ritmo, no seu tempo.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-9 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 active:scale-[0.97]"
            >
              Começar Gratuitamente
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#modulos"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm px-9 py-4 text-base font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-lg transition-all duration-300"
            >
              <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Ver Módulos
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-400 dark:text-zinc-500"
          >
            <span className="flex items-center gap-2">
              <svg className="h-4.5 w-4.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Conteúdo validado
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4.5 w-4.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No seu ritmo
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4.5 w-4.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              100% gratuito
            </span>
          </motion.div>
        </motion.div>

        {/* Fade out inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent pointer-events-none" />
      </section>

      {/* Módulos */}
      <section id="modulos" ref={modulesRef} className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-zinc-900 dark:via-emerald-950/10 dark:to-zinc-900" />
        <DecorativeBlob className="top-40 left-0 w-72 h-72 bg-emerald-200/30" />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          {/* Título da seção */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300 mb-4">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Os 10 Passos
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Sua Jornada em{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                10 Módulos
              </span>
            </h2>
            <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Cada módulo contém conteúdo educativo, exercícios práticos e espaço para reflexão pessoal
            </p>
          </motion.div>

          {/* Grid de módulos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
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
              const shadows = [
                "shadow-emerald-500/20",
                "shadow-teal-500/20",
                "shadow-purple-500/20",
                "shadow-amber-500/20",
                "shadow-rose-500/20",
                "shadow-sky-500/20",
                "shadow-emerald-500/20",
                "shadow-violet-500/20",
                "shadow-teal-500/20",
                "shadow-pink-500/20",
              ];
              const grad = colors[index % colors.length];
              const shadow = shadows[index % shadows.length];
              return (
                <motion.div key={mod.id} variants={itemVariants} className="group relative">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-200/0 via-transparent to-purple-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-zinc-200/50 dark:group-hover:shadow-zinc-900/50 group-hover:border-zinc-200 dark:group-hover:border-zinc-700">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${grad} shadow-lg ${shadow} group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{mod.icon}</span>
                    </div>
                    <div className="mt-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                        Módulo {String(mod.order).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1.5 text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {mod.title}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <span>Acessar módulo</span>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

      {/* CTA final */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700">
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 left-10 w-48 h-48 rounded-full bg-white/10 backdrop-blur-sm"
              animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm"
              animate={{ y: [0, 30, 0], opacity: [0.1, 0.15, 0.1] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-3xl px-5 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Pronto para começar?
          </h2>
          <p className="mt-5 text-lg text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
            Cadastre-se grátis e acesse todos os módulos, diário emocional e
            acompanhamento de progresso.
          </p>
          <Link
            href="/register"
            className="group mt-10 inline-flex items-center gap-2.5 rounded-2xl bg-white px-9 py-4 text-base font-bold text-emerald-700 shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Criar Conta Gratuita
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 dark:border-zinc-800 py-8">
        <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
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
