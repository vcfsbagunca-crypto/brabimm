import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

const modulesData = [
  {
    id: "mod-1",
    order: 1,
    title: "Entendendo o Trauma",
    slug: "entendendo-o-trauma",
    description: "O que é um trauma, como ele afeta o corpo e a mente, e por que a recuperação é possível.",
    icon: "🧠",
    content: "## O que é um trauma?\n\nTrauma é a resposta emocional e fisiológica do corpo a um evento extremamente estressante ou perturbador...\n\n## Como o trauma afeta o corpo?\n\nO trauma ativa o sistema nervoso simpático (luta ou fuga) de forma prolongada...\n\n## A mente sob trauma\n\nPensamentos intrusivos, flashbacks, dificuldade de concentração e hipervigilância são comuns...\n\n## A recuperação é possível\n\nO cérebro é neuroplástico — ele pode se reconectar e se curar...",
  },
  {
    id: "mod-2",
    order: 2,
    title: "Identificando Gatilhos",
    slug: "identificando-gatilhos",
    description: "Aprenda a reconhecer situações, pessoas ou ambientes que disparam reações emocionais intensas.",
    icon: "🔍",
    content: "## O que são gatilhos emocionais?\n\nGatilhos são estímulos que fazem seu cérebro reviver aspectos de uma experiência traumática...\n\n## Tipos comuns de gatilhos\n\nGatilhos podem ser sensoriais, situacionais, relacionais ou temporais...\n\n## Como identificar seus gatilhos\n\nComece observando suas reações...\n\n## O que fazer ao identificar um gatilho\n\nReconhecer é o primeiro passo...",
  },
  {
    id: "mod-3",
    order: 3,
    title: "Respiração e Relaxamento",
    slug: "respiracao-e-relaxamento",
    description: "Técnicas práticas de respiração para regular o sistema nervoso e reduzir a ansiedade no momento.",
    icon: "🌬️",
    content: "## A respiração como ferramenta\n\nA respiração é a ponte entre o consciente e o automático...\n\n## Técnica 1: Respiração Diafragmática\n\nColoque uma mão no peito e outra na barriga...\n\n## Técnica 2: Respiração 4-7-8\n\nInspire por 4, segure por 7, expire por 8...\n\n## Técnica 3: Respiração Alternada\n\nEquilibra os hemisférios cerebrais...",
  },
  {
    id: "mod-4",
    order: 4,
    title: "Escrita Terapêutica",
    slug: "escrita-terapeutica",
    description: "O poder do journaling para processar emoções, organizar pensamentos e promover autoconhecimento.",
    icon: "✍️",
    content: "## Por que escrever ajuda?\n\nA escrita terapêutica permite que você externalize pensamentos e emoções...\n\n## Diferentes formas de journaling\n\nFluxo de consciência, cartas não enviadas, gratidão...\n\n## Criando o hábito\n\n5 a 10 minutos por dia já trazem benefícios...\n\n## O que fazer com emoções difíceis\n\nÉ normal que escrever sobre traumas traga emoções fortes...",
  },
  {
    id: "mod-5",
    order: 5,
    title: "Higiene do Sono",
    slug: "higiene-do-sono",
    description: "Como o sono afeta a recuperação emocional e hábitos práticos para dormir melhor.",
    icon: "🌙",
    content: "## Sono e trauma: uma via de mão dupla\n\nO trauma frequentemente perturba o sono...\n\n## Crie um ritual noturno\n\nEstabeleça uma sequência relaxante...\n\n## Ambiente de sono ideal\n\nMantenha o quarto escuro, silencioso e fresco...\n\n## Lidando com pensamentos noturnos\n\nTécnicas para acalmar a mente antes de dormir...",
  },
  {
    id: "mod-6",
    order: 6,
    title: "Movimento e Humor",
    slug: "movimento-e-humor",
    description: "A relação entre exercícios físicos, neuroquímica cerebral e regulação do humor.",
    icon: "🏃",
    content: "## Movimento como medicina\n\nO exercício físico regular aumenta a produção de endorfinas...\n\n## Não precisa ser academia\n\nCaminhadas, dança, ioga, jardinagem...\n\n## Comece pequeno\n\n5 a 10 minutos diários já fazem diferença...\n\n## Exercício e regulação emocional\n\nAtividades com ritmo e repetição têm efeito meditativo...",
  },
  {
    id: "mod-7",
    order: 7,
    title: "Rede de Apoio",
    slug: "rede-de-apoio",
    description: "Construindo conexões saudáveis e aprendendo a pedir ajuda quando precisar.",
    icon: "🤝",
    content: "## Por que precisamos de outros?\n\nA conexão humana é um dos fatores mais poderosos de cura...\n\n## Identifique sua rede atual\n\nMapeie as pessoas na sua vida...\n\n## Como pedir ajuda\n\nSeja direta e específica...\n\n## Expandindo sua rede\n\nGrupos de apoio, comunidades, voluntariado...",
  },
  {
    id: "mod-8",
    order: 8,
    title: "Limites Saudáveis",
    slug: "limites-saudaveis",
    description: "Aprender a dizer não, proteger sua energia e estabelecer relações mais equilibradas.",
    icon: "🛡️",
    content: "## O que são limites saudáveis?\n\nLimites são as regras que você estabelece para proteger seu bem-estar...\n\n## Tipos de limites\n\nFísicos, emocionais, temporais, materiais, intelectuais...\n\n## Dizer não é um ato de autocuidado\n\nVocê não precisa justificar seu 'não'...\n\n## Sinais de que um limite foi violado\n\nRessentimento, exaustão, desconforto...",
  },
  {
    id: "mod-9",
    order: 9,
    title: "Mindfulness Prático",
    slug: "mindfulness-pratico",
    description: "Técnicas simples de atenção plena para trazer calma e presença ao seu dia a dia.",
    icon: "🧘",
    content: "## O que é mindfulness?\n\nPrestar atenção ao momento presente de forma intencional e sem julgamento...\n\n## Escaneamento Corporal\n\nReconectar mente e corpo...\n\n## Atenção Plena no Dia a Dia\n\nMicro-momentos de presença...\n\n## Observação de Pensamentos\n\nComo observar pensamentos sem se prender a eles...",
  },
  {
    id: "mod-10",
    order: 10,
    title: "Ajuda Profissional",
    slug: "ajuda-profissional",
    description: "Quando e como buscar acompanhamento profissional e recursos de saúde mental.",
    icon: "🏥",
    content: "## Este guia não substitui terapia\n\nEste material é uma ferramenta de apoio...\n\n## Tipos de profissionais\n\nPsicólogos, psiquiatras, terapeutas ocupacionais...\n\n## Como encontrar ajuda\n\nCRP, plataformas online, atendimento remoto...\n\n## Recursos gratuitos\n\nCAPS, CVV (188), clínicas-escola...",
  },
];

async function seed() {
  for (const mod of modulesData) {
    await prisma.module.upsert({
      where: { slug: mod.slug },
      update: {
        title: mod.title,
        description: mod.description,
        icon: mod.icon,
        order: mod.order,
        content: mod.content,
      },
      create: {
        id: mod.id,
        order: mod.order,
        title: mod.title,
        slug: mod.slug,
        description: mod.description,
        icon: mod.icon,
        content: mod.content,
      },
    });
    console.log(`Seeded: ${mod.title}`);
  }
  console.log("Done! All modules seeded.");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
