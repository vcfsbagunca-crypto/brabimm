const { PrismaClient } = require("@prisma/client");
const { PrismaLibSql } = require("@prisma/adapter-libsql");

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const modulesData = [
  { id: "mod-1", order: 1, title: "Entendendo o Trauma", slug: "entendendo-o-trauma", description: "O que é um trauma, como ele afeta o corpo e a mente.", icon: "🧠", content: "Conteúdo completo sobre trauma..." },
  { id: "mod-2", order: 2, title: "Identificando Gatilhos", slug: "identificando-gatilhos", description: "Aprenda a reconhecer situações que disparam reações emocionais.", icon: "🔍", content: "Conteúdo completo sobre gatilhos..." },
  { id: "mod-3", order: 3, title: "Respiração e Relaxamento", slug: "respiracao-e-relaxamento", description: "Técnicas de respiração para regular o sistema nervoso.", icon: "🌬️", content: "Conteúdo completo sobre respiração..." },
  { id: "mod-4", order: 4, title: "Escrita Terapêutica", slug: "escrita-terapeutica", description: "O poder do journaling para processar emoções.", icon: "✍️", content: "Conteúdo completo sobre escrita terapêutica..." },
  { id: "mod-5", order: 5, title: "Higiene do Sono", slug: "higiene-do-sono", description: "Hábitos práticos para dormir melhor.", icon: "🌙", content: "Conteúdo completo sobre sono..." },
  { id: "mod-6", order: 6, title: "Movimento e Humor", slug: "movimento-e-humor", description: "Exercícios físicos e regulação emocional.", icon: "🏃", content: "Conteúdo completo sobre movimento..." },
  { id: "mod-7", order: 7, title: "Rede de Apoio", slug: "rede-de-apoio", description: "Construindo conexões saudáveis.", icon: "🤝", content: "Conteúdo completo sobre rede de apoio..." },
  { id: "mod-8", order: 8, title: "Limites Saudáveis", slug: "limites-saudaveis", description: "Aprender a dizer não e proteger sua energia.", icon: "🛡️", content: "Conteúdo completo sobre limites..." },
  { id: "mod-9", order: 9, title: "Mindfulness Prático", slug: "mindfulness-pratico", description: "Técnicas de atenção plena para o dia a dia.", icon: "🧘", content: "Conteúdo completo sobre mindfulness..." },
  { id: "mod-10", order: 10, title: "Ajuda Profissional", slug: "ajuda-profissional", description: "Quando e como buscar acompanhamento profissional.", icon: "🏥", content: "Conteúdo completo sobre ajuda profissional..." },
];

async function seed() {
  for (const mod of modulesData) {
    await prisma.module.upsert({
      where: { slug: mod.slug },
      update: { title: mod.title, description: mod.description, icon: mod.icon, order: mod.order, content: mod.content },
      create: { id: mod.id, order: mod.order, title: mod.title, slug: mod.slug, description: mod.description, icon: mod.icon, content: mod.content },
    });
    console.log(`✓ ${mod.title}`);
  }
  console.log("\nTodos os 10 módulos foram populados!");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error("Erro:", e);
  process.exit(1);
});
