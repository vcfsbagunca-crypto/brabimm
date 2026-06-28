export interface Section {
  heading: string;
  text: string;
}

export interface Exercise {
  title: string;
  prompt: string;
}

export interface ModuleContent {
  id: string;
  order: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  sections: Section[];
  exercises: Exercise[];
  summary: string[];
}

export const modulesData: ModuleContent[] = [
  {
    id: "mod-1",
    order: 1,
    title: "Entendendo o Trauma",
    slug: "entendendo-o-trauma",
    description: "O que é um trauma, como ele afeta o corpo e a mente, e por que a recuperação é possível.",
    icon: "🧠",
    sections: [
      {
        heading: "O que é um trauma?",
        text: "Trauma é a resposta emocional e fisiológica do corpo a um evento extremamente estressante ou perturbador. Não é o evento em si, mas como seu sistema nervoso o processa e armazena essa experiência. Traumas podem ser agudos (um evento único, como um acidente ou violência) ou complexos (exposição prolongada a estresse, como abuso na infância, relacionamentos abusivos ou negligência crônica). Entender essa distinção é importante porque cada tipo pode exigir abordagens diferentes de cuidado.",
      },
      {
        heading: "Os três tipos de trauma",
        text: "Trauma Agudo: resulta de um único evento estressante ou perigoso (acidente, agressão, desastre natural). Trauma Crônico: exposição repetida e prolongada a eventos estressantes (violência doméstica, bullying constante). Trauma Complexo: exposição a múltiplos eventos traumáticos, geralmente invasivos e interpessoais, com início na infância (abuso, negligência). Saber qual se aplica à sua história ajuda a direcionar a recuperação.",
      },
      {
        heading: "Como o trauma afeta o corpo?",
        text: "O trauma ativa o sistema nervoso simpático (luta ou fuga) de forma prolongada, mesmo quando o perigo já passou. O corpo fica em estado de alerta constante. Isso pode causar: tensão muscular crônica (ombros, mandíbula, costas), problemas digestivos (síndrome do intestino irritável, náuseas), fadiga e exaustão adrenal, insônia e pesadelos, alterações no apetite e na libido. Compreender essas reações como respostas fisiológicas — e não como fraqueza pessoal — é o primeiro passo para recuperar o equilíbrio.",
      },
      {
        heading: "A mente sob trauma",
        text: "Pensamentos intrusivos, flashbacks, dificuldade de concentração e hipervigilância são manifestações comuns. O cérebro reorganiza suas prioridades para garantir 'sobrevivência', o que pode afetar a memória (brancos, lapsos), o raciocínio (dificuldade de tomar decisões) e a regulação emocional (explosões de raiva, choro repentino, numbness). A mente também desenvolve crenças negativas sobre si mesma, os outros e o mundo. Saber disso ajuda a reduzir a culpa e a autocobrança — você não está 'louco', está respondendo a uma experiência real.",
      },
      {
        heading: "O papel da neuroplasticidade na cura",
        text: "O cérebro é neuroplástico — ele pode criar novos caminhos neurais e se reconectar ao longo da vida. Isso significa que padrões de pensamento e reação aprendidos durante o trauma podem ser gradualmente substituídos por padrões mais saudáveis. Cada nova experiência de segurança, cada momento de regulação emocional, cada prática de autocuidado literalmente reconecta seu cérebro. A recuperação não é linear, mas é biologicamente possível.",
      },
      {
        heading: "Sinais de que você está se curando",
        text: "A cura não significa esquecer o que aconteceu, mas sim integrar a experiência de forma que ela não domine mais sua vida. Sinais positivos incluem: conseguir falar sobre o evento sem revivê-lo intensamente, sentir mais dias de calma do que de crise, reconhecer gatilhos sem ser controlado por eles, restabelecer conexões com pessoas e atividades que antes traziam prazer, sentir esperança em relação ao futuro. Cada pequeno passo na direção do autocuidado é uma vitória.",
      },
    ],
    exercises: [
      {
        title: "Linha do Tempo Emocional",
        prompt: "Desenhe (mentalmente ou no papel) uma linha do tempo da sua vida, desde o nascimento até hoje. Marque nela os momentos mais significativos — tanto positivos quanto desafiadores. Para cada momento, anote: (1) O que aconteceu, (2) Qual foi sua idade, (3) Como você se sentiu na época, (4) Como você vê esse evento hoje. Reflita sobre como cada um desses momentos contribuiu para quem você é. Escreva um parágrafo sobre o que essa linha do tempo revela sobre sua jornada.",
      },
      {
        title: "Mapa Corporal do Trauma",
        prompt: "Feche os olhos por um momento e escaneie seu corpo. Onde você sente tensão, aperto, desconforto ou dormência? Desenhe um contorno simples do corpo humano (ou imagine) e marque os pontos de tensão. Anote depois: (1) Onde estão as tensões, (2) Como descreveria a sensação (peso, aperto, formigamento), (3) Quando você percebe que essas sensações aparecem mais. Este exercício conecta a experiência emocional às sensações físicas.",
      },
      {
        title: "Declaração de Auto-Compaixão",
        prompt: "Escreva uma carta curta para si mesmo(a) sobre o que você passou. Use estas frases como ponto de partida: 'O que aconteceu comigo foi real e doloroso. Eu mereço cura. Não foi minha culpa. Estou fazendo o melhor que posso com os recursos que tenho.' Depois de escrever, leia em voz alta para si mesmo(a) e observe o que sente.",
      },
    ],
    summary: [
      "Trauma é uma resposta do sistema nervoso, não uma fraqueza pessoal",
      "Existem diferentes tipos de trauma (agudo, crônico, complexo) que exigem cuidados específicos",
      "Os sintomas físicos e mentais são respostas adaptativas do corpo à experiência traumática",
      "A neuroplasticidade permite que o cérebro se reconecte e se cure ao longo do tempo",
      "A recuperação é possível — e você já deu o primeiro passo ao buscar este conteúdo",
    ],
  },
  {
    id: "mod-2",
    order: 2,
    title: "Identificando Gatilhos",
    slug: "identificando-gatilhos",
    description: "Aprenda a reconhecer situações, pessoas ou ambientes que disparam reações emocionais intensas e como responder a elas.",
    icon: "🔍",
    sections: [
      {
        heading: "O que são gatilhos emocionais?",
        text: "Gatilhos são estímulos internos ou externos que ativam respostas automáticas de estresse relacionadas a experiências passadas. Podem ser uma palavra específica, um cheiro, um lugar, um tom de voz, uma data ou até mesmo uma sensação corporal. O gatilho não é o problema em si — ele apenas 'lembra' seu sistema nervoso de um momento em que você precisou estar em alerta para sobreviver. O cérebro faz isso para protegê-lo, mas às vezes o alarme dispara mesmo quando o perigo já passou.",
      },
      {
        heading: "Tipos comuns de gatilhos",
        text: "Sensoriais: sons altos, sirenes, cheiros específicos (perfume, álcool, comida), texturas de roupas, luzes piscando. Situacionais: multidões, conflitos, silêncio após uma briga, ambientes fechados, estar sozinho. Relacionais: tom de voz elevado, expressão facial de desaprovação, figuras de autoridade, certo tipo de pessoa que lembra alguém. Temporais: aniversários do trauma, feriados, época do ano, horário específico do dia. Internos: certos pensamentos, sensações corporais (coração acelerado), emoções como tristeza ou raiva.",
      },
      {
        heading: "A janela de tolerância",
        text: "A 'janela de tolerância' é o estado ideal de ativação do sistema nervoso — onde você consegue pensar, sentir e responder de forma flexível. Quando um gatilho atinge você, pode ocorrer: Hiperativação (luta/fuga): aceleração, ansiedade, pânico, agitação, raiva explosiva. Hipoativação (congelamento): paralisia, dormência, desligamento, fadiga, dissociação. O objetivo não é eliminar gatilhos, mas expandir sua janela de tolerância para que você consiga voltar ao equilíbrio mais rapidamente.",
      },
      {
        heading: "Como identificar seus gatilhos",
        text: "Comece observando suas reações com curiosidade, não com julgamento. Quando sentir ansiedade, medo, raiva ou entorpecimento desproporcionais à situação, faça uma pausa e pergunte-se: 'O que aconteceu nos segundos ou minutos antes dessa sensação?' Esteja atento a padrões: você se sente mal sempre que... vai para certos lugares? Interage com certas pessoas? Escuta certos temas? Ouve um tom de voz específico? Use o diário emocional da plataforma para registrar esses momentos — com o tempo, os padrões ficarão claros.",
      },
      {
        heading: "Ancoragem: trazendo-se de volta ao presente",
        text: "Ancoragem são técnicas simples para trazer sua atenção ao momento presente quando um gatilho é ativado. Experimente: (1) 5-4-3-2-1: note 5 coisas que você vê, 4 que pode tocar, 3 que ouve, 2 que cheira, 1 que saboreia. (2) Toque um objeto próximo e descreva mentalmente sua textura, temperatura, peso. (3) Sinta seus pés no chão — literalmente e mentalmente: 'Estou aqui, agora, em segurança.' (4) Respire fundo e nomeie o que está acontecendo: 'Isso é um gatilho. Já passei por isso. Estou seguro agora.'",
      },
      {
        heading: "Prevenção e planejamento",
        text: "Depois de identificar seus principais gatilhos, você pode criar estratégias preventivas: (1) Evite quando possível — não há vergonha em se afastar de situações desnecessariamente ativadoras. (2) Prepare-se — se sabe que vai enfrentar um gatilho (ex: consulta médica, reunião difícil), tenha um plano de regulação pronto. (3) Tenha um 'kit de emergência emocional' — uma lista de 3-5 coisas que ajudam a se acalmar (respiração, música, contato com alguém seguro, caminhada). Lembre-se: evitar permanentemente não é cura, mas dar-se tempo e segurança para processar é parte do tratamento.",
      },
    ],
    exercises: [
      {
        title: "Registro Diário de Gatilhos",
        prompt: "Ao longo da próxima semana, use o diário emocional para registrar: (1) Data e hora, (2) O que aconteceu (situação), (3) O que você sentiu no corpo, (4) Qual emoção predominante, (5) De 0-10, qual a intensidade, (6) Como você respondeu. No final da semana, revise e busque padrões.",
      },
      {
        title: "Técnica de Ancoragem Guiada",
        prompt: "Pense em um gatilho que você já identificou, mas que seja leve o suficiente para trabalhar agora. Feche os olhos e lembre-se brevemente dele — note onde a ativação aparece no corpo. Agora pratique: toque as pontas do polegar e indicador juntas enquanto respira profundamente 5 vezes. Repita 3 vezes. Escreva sobre como se sentiu.",
      },
      {
        title: "Mapa de Gatilhos + Plano",
        prompt: "Liste de 3 a 5 gatilhos que você percebeu. Para cada um, crie um plano de 3 passos: (1) O que farei para me preparar se encontrar esse gatilho? (2) O que farei no momento para me regular? (3) O que farei depois para me cuidar? Guarde este plano em um lugar acessível.",
      },
    ],
    summary: [
      "Gatilhos são respostas automáticas do sistema nervoso, não escolhas conscientes",
      "A janela de tolerância explica por que às vezes reagimos de forma intensa ou desligada",
      "Identificar padrões é o primeiro passo para expandir sua capacidade de regulação",
      "Técnicas de ancoragem ajudam a trazer a mente de volta ao presente",
      "Com planejamento e prática, é possível responder em vez de apenas reagir",
    ],
  },
  {
    id: "mod-3",
    order: 3,
    title: "Respiração e Relaxamento",
    slug: "respiracao-e-relaxamento",
    description: "Técnicas práticas de respiração e relaxamento para regular o sistema nervoso e reduzir a ansiedade no momento.",
    icon: "🌬️",
    sections: [
      {
        heading: "A respiração como ferramenta de regulação",
        text: "A respiração é a ponte entre o consciente e o automático. Diferente dos batimentos cardíacos ou da digestão, você pode controlar intencionalmente sua respiração. Ao fazer isso, envia sinais de segurança ao seu cérebro, ativando o sistema nervoso parassimpático (responsável pelo repouso e digestão) e reduzindo a atividade do simpático (luta ou fuga). É a ferramenta mais rápida e acessível que você tem para se autorregular.",
      },
      {
        heading: "O ciclo de resposta ao estresse",
        text: "Quando um gatilho aparece (Módulo 2), seu corpo inicia o ciclo de estresse. Sem intervenção, esse ciclo pode se prolongar por horas. A respiração lenta e profunda interrompe esse ciclo ao: aumentar a oxigenação do sangue, reduzir a frequência cardíaca, diminuir a pressão arterial, relaxar a musculatura e liberar hormônios de bem-estar. Praticar regularmente cria um 'freio de mão' para o sistema nervoso.",
      },
      {
        heading: "Técnica 1: Respiração Diafragmática",
        text: "Deite-se ou sente-se confortavelmente. Coloque uma mão no peito e outra na barriga. Inspire profundamente pelo nariz por 4 segundos, sentindo a barriga expandir como um balão (a mão no peito deve ficar parada). Segure por 4 segundos. Expire lentamente pela boca por 6 segundos, sentindo a barriga se contrair. Repita por 5 minutos. Dica: se estiver em público, faça apenas a expiração mais longa que a inspiração — isso já ativa o parassimpático discretamente.",
      },
      {
        heading: "Técnica 2: Respiração 4-7-8 (o calmante natural)",
        text: "Inspire pelo nariz por 4 segundos. Segure a respiração por 7 segundos (sem forçar, apenas suspendendo). Expire completamente pela boca por 8 segundos, fazendo um som suave de 'whoosh'. Esta técnica é conhecida como 'o calmante natural do sistema nervoso'. É especialmente útil: antes de dormir, ao acordar de um pesadelo, após uma discussão, em momentos de pânico iminente. Faça 4 ciclos no máximo no início.",
      },
      {
        heading: "Técnica 3: Respiração Alternada (Nadi Shodhana)",
        text: "Sente-se confortavelmente e leve a mão direita ao nariz. Feche a narina direita com o polegar e inspire pela esquerda (4 seg). Feche a narina esquerda com o anelar (ou mindinho), solte a direita e expire lentamente (6 seg). Inspire pela narina direita (4 seg), feche-a com o polegar, solte a esquerda e expire (6 seg). Isso completa 1 ciclo. Faça 5-10 ciclos. Esta técnica equilibra os hemisférios cerebrais e é particularmente útil para ansiedade mental (pensamentos acelerados).",
      },
      {
        heading: "Relaxamento Muscular Progressivo",
        text: "O trauma frequentemente mantém os músculos em estado de tensão crônica. Esta técnica ajuda a liberar essa tensão: sente-se ou deite-se confortavelmente. Comece pelos pés: contraia os músculos por 5 segundos, depois solte completamente e note a sensação de relaxamento por 10 segundos. Suba gradualmente: pernas, abdômen, mãos, braços, ombros (elevando em direção às orelhas), pescoço, mandíbula e rosto. Quando chegar ao topo, sinta o corpo inteiro mais pesado e relaxado.",
      },
    ],
    exercises: [
      {
        title: "Diário da Respiração (3 Dias)",
        prompt: "Durante os próximos 3 dias, pratique uma das técnicas de respiração 3 vezes ao dia (manhã, tarde e noite). Após cada sessão, anote no diário: (1) Qual técnica usou, (2) Como se sentia antes (0-10), (3) Como se sentiu depois (0-10), (4) Onde percebeu diferença no corpo. No 3º dia, revise e veja os padrões.",
      },
      {
        title: "Respiração em Contexto Real",
        prompt: "Na próxima vez que perceber um gatilho ou momento de estresse, use a técnica 4-7-8 por apenas 2 ciclos. Depois anote: (1) O que aconteceu, (2) Como foi tentar respirar no momento, (3) Qual foi o efeito (mesmo que pequeno). O objetivo é treinar o uso em contexto real.",
      },
      {
        title: "Relaxamento Guiado",
        prompt: "Grave um áudio curto (3 min) no seu celular guiando você pelo relaxamento muscular progressivo, ou encontre um vídeo no YouTube que faça isso. Pratique antes de dormir pelos próximos 5 dias. Anote como foi sua qualidade de sono.",
      },
    ],
    summary: [
      "A respiração consciente é a ferramenta mais rápida para regular o sistema nervoso",
      "A técnica 4-7-8 é especialmente eficaz para momentos de estresse intenso",
      "Praticar regularmente aumenta sua capacidade de se autorregular no dia a dia",
      "O relaxamento muscular progressivo libera a tensão física armazenada pelo trauma",
      "Com prática, a regulação se torna mais automática e acessível",
    ],
  },
  {
    id: "mod-4",
    order: 4,
    title: "Escrita Terapêutica",
    slug: "escrita-terapeutica",
    description: "O poder do journaling para processar emoções, organizar pensamentos e promover autoconhecimento profundo.",
    icon: "✍️",
    sections: [
      {
        heading: "Por que escrever ajuda a curar?",
        text: "A escrita terapêutica permite que você externalize pensamentos e emoções que muitas vezes ficam 'presos' no sistema nervoso. Ao escrever, você ativa o córtex pré-frontal (a parte racional do cérebro), ajudando a regular a amígdala (centro do medo). Pesquisas mostram que escrever sobre experiências emocionais por 15-20 minutos em 3-4 sessões já produz melhorias significativas na saúde física e mental. É uma forma segura e acessível de processamento emocional.",
      },
      {
        heading: "Diferentes formas de journaling terapêutico",
        text: "Experimente estilos diferentes para descobrir o que funciona para você: (1) Fluxo de consciência — escreva sem parar, sem se preocupar com gramática ou coerência, por 10 minutos. (2) Cartas não enviadas — escreva para alguém (ou algo) sem intenção de enviar; pode ser libertador. (3) Gratidão — liste 3 coisas boas do dia, mesmo que pequenas. (4) Check-in emocional — 'Como estou me sentindo agora? O que contribuiu para isso?' (5) Reenquadramento — escreva sobre uma situação desafiadora e depois reescreva sob uma perspectiva diferente.",
      },
      {
        heading: "O método dos 3 cadernos",
        text: "Uma estratégia útil é separar a escrita em três categorias: (1) Caderno de despejo — escreva tudo que está ocupando sua mente, sem filtro. (2) Caderno de processamento — reflita sobre questões específicas, explore sentimentos, faça conexões. (3) Caderno de crescimento — anote insights, aprendizados, conquistas e intenções. Na plataforma, você pode usar o diário emocional e usar tags ou separações por '---' para categorizar.",
      },
      {
        heading: "Dicas para o hábito consistente",
        text: "Não precisa ser longo — 5 a 10 minutos por dia já trazem benefícios. Escolha um horário fixo (ao acordar, no almoço ou antes de dormir). Associe a escrita a um hábito existente (ex: depois de escovar os dentes). Não se preocupe com a qualidade do texto — ninguém vai ler. Use o diário da plataforma para manter tudo em um só lugar e acompanhar sua evolução ao longo do tempo.",
      },
      {
        heading: "O que fazer com emoções difíceis ao escrever",
        text: "É esperado que escrever sobre traumas traga emoções fortes à tona. Se isso acontecer: (1) Pare imediatamente. (2) Respire fundo 3 vezes (use a técnica 4-7-8 do Módulo 3). (3) Lembre-se: você está seguro agora, no presente. A emoção é uma memória, não uma ameaça real. (4) Volte a escrever quando se sentir pronto — ou pare por hoje. (5) Se as emoções forem muito intensas ou persistirem por horas/dias, considere buscar apoio profissional (Módulo 10). A escrita é uma ferramenta poderosa que deve ser usada com respeito pelos seus limites.",
      },
      {
        heading: "Escrevendo para reenquadrar a narrativa",
        text: "O trauma muitas vezes cria uma narrativa interna de vergonha, culpa e desamparo. A escrita permite reescrever essa narrativa. Experimente: pegue um evento difícil e escreva sobre ele em terceira pessoa, como se fosse um amigo contando a história. Depois, escreva como essa história poderia ser contada de uma perspectiva de força e sobrevivência. Você não está negando o que aconteceu — está escolhendo qual significado dar à sua história.",
      },
    ],
    exercises: [
      {
        title: "Fluxo de Consciência (10 min)",
        prompt: "Timer de 10 minutos. Escreva sem parar, sem tirar a caneta do papel ou os dedos do teclado. Não se preocupe com ortografia, coerência ou 'ter o que dizer'. Se não souber o que escrever, escreva 'não sei o que escrever' até que venha outra coisa. Depois, releia e sublinhe uma frase que chame sua atenção.",
      },
      {
        title: "Carta para o Eu do Passado",
        prompt: "Escreva uma carta para uma versão mais jovem de você — aquela que passou pela experiência difícil. Ofereça palavras de conforto, validação e esperança. Diga as coisas que você precisava ouvir na época. Depois, escreva uma breve resposta do eu do passado para o eu do presente. O que aquele 'você' diria sobre quem você se tornou?",
      },
      {
        title: "Reenquadramento de Narrativa",
        prompt: "Pense em uma crença negativa que o trauma deixou em você ('não sou bom o suficiente', 'não posso confiar em ninguém', 'é minha culpa'). Escreva essa crença. Ao lado, escreva evidências que contradizem essa crença. Depois, escreva 3 formas alternativas de ver a situação. Como seria se você escolhesse uma narrativa mais compassiva?",
      },
    ],
    summary: [
      "A escrita terapêutica ajuda a regular o sistema nervoso ao ativar o córtex pré-frontal",
      "Existem diversos estilos de journaling — encontre o que funciona para você",
      "Consistência importa mais que quantidade: 5 min/dia > 1 hora por mês",
      "Respeite seus limites: se a escrita ativar emoções intensas, pause e respire",
      "Reescrever sua narrativa interna é um dos atos mais poderosos de cura",
    ],
  },
  {
    id: "mod-5",
    order: 5,
    title: "Higiene do Sono",
    slug: "higiene-do-sono",
    description: "Como o sono afeta a recuperação emocional e hábitos práticos para dormir melhor e acordar mais regulado.",
    icon: "🌙",
    sections: [
      {
        heading: "Sono e trauma: uma via de mão dupla",
        text: "O trauma frequentemente perturba o sono, e a má qualidade do sono dificulta a regulação emocional — um ciclo vicioso. Pesadelos, insônia, terror noturno, despertares frequentes e cansaço matinal são comuns em pessoas com histórico de trauma. Durante o sono profundo, o cérebro processa emoções e consolida memórias. Quando o sono é interrompido, esse processamento fica prejudicado, mantendo o sistema nervoso em estado de alerta. Melhorar o sono é uma das formas mais eficazes de fortalecer sua resiliência emocional.",
      },
      {
        heading: "A ciência do sono e da regulação emocional",
        text: "Durante o sono REM (movimento rápido dos olhos), o cérebro 'arquiva' memórias emocionais, reduzindo sua carga afetiva. É como se o cérebro dissesse: 'Lembro disso, mas não preciso mais reagir como se estivesse acontecendo agora.' Pessoas com trauma têm padrões de sono REM alterados, o que dificulta esse processamento natural. Além disso, a privação de sono aumenta a atividade da amígdala em até 60%, tornando você mais reativo a gatilhos. Dormir bem não é um luxo — é uma necessidade neurológica para a cura.",
      },
      {
        heading: "Crie um ritual noturno consistente",
        text: "Estabeleça uma sequência relaxante 60-90 minutos antes de dormir. Uma sugestão: (1) Desconecte-se de telas (luz azul inibe a melatonina). (2) Tome um banho morno (a queda de temperatura depois induz o sono). (3) Faça uma atividade calma: leitura física (não digital), alongamento suave, ouvir música instrumental, escrever no diário. (4) Diminua gradualmente as luzes da casa. (5) Evite cafeína após as 14h e refeições pesadas 3h antes de dormir. A consistência treina seu cérebro para reconhecer os sinais de que é hora de descansar.",
      },
      {
        heading: "Ambiente de sono ideal",
        text: "Seu quarto deve ser um santuário do sono: Escuridão total: use cortanas blackout ou máscara de dormir. Silêncio: protetores auriculares ou máquina de ruído branco/chuva. Temperatura: 18-22°C (o corpo precisa esfriar para dormir). Conforto: invista em um bom colchão e travesseiro. Ar fresco: janela aberta ou ventilador. Sem eletrônicos: deixe o celular fora do quarto ou no modo avião. Se possível, use o quarto apenas para dormir — assim seu cérebro associa o ambiente ao descanso.",
      },
      {
        heading: "Lidando com pensamentos noturnos",
        text: "Pensamentos intrusivos ao deitar são extremamente comuns. Algumas estratégias: (1) Caderno de 'preocupações' — mantenha um ao lado da cama. Anote rapidamente o que está vindo à mente e escreva 'guardado para amanhã'. (2) Técnica do 'pensamento em nuvem' — imagine cada pensamento como uma nuvem passando no céu; você observa sem se agarrar. (3) Respiração 4-7-8 (Módulo 3) — excelente para acalmar a mente noturna. (4) Se não conseguir dormir após 20-30 minutos, levante-se, vá para outro cômodo, leia algo leve em luz baixa, e volte quando sentir sono. Não force o sono.",
      },
      {
        heading: "Lidando com pesadelos",
        text: "Pesadelos são uma forma do cérebro tentar processar o trauma durante o sono. Estratégias úteis: (1) Ao acordar de um pesadelo, lembre-se: 'Foi um sonho. Estou seguro agora. Estou no meu quarto.' (2) Use uma luz noturna baixa para se reorientar no ambiente. (3) Técnica de 'reescrita' — durante o dia, escreva o pesadelo e depois reescreva o final de forma diferente, mais segura ou empoderadora. (4) Se os pesadelos forem frequentes e perturbadores, considere buscar a técnica IRT (Image Rehearsal Therapy) com um profissional — ela tem alta eficácia para pesadelos traumáticos.",
      },
    ],
    exercises: [
      {
        title: "Meu Ritual do Sono Personalizado",
        prompt: "Crie seu próprio ritual noturno de 45 minutos. Descreva passo a passo o que você fará desde 1 hora antes de dormir até o momento de deitar. Seja específico: 'às 21h apago o celular, às 21h15 tomo um banho, às 21h40 leio 15 minutos, às 21h55 apago a luz.' Comprometa-se a seguir este ritual pelos próximos 7 dias e anote cada manhã: (1) Horas de sono, (2) Qualidade (0-10), (3) Como acordou.",
      },
      {
        title: "Diário do Sono (7 Dias)",
        prompt: "Durante 7 dias, mantenha um registro do sono: (1) Horário que foi para a cama, (2) Horário que apagou a luz, (3) Estimativa de quanto tempo levou para dormir, (4) Acordou durante a noite? Quantas vezes? (5) Horário que acordou, (6) Como se sente agora (0-10 energia). No 7º dia, analise os padrões.",
      },
      {
        title: "Reescrita de Pesadelo",
        prompt: "Se você tem um pesadelo recorrente, escreva-o em detalhes durante o dia. Depois, reescreva o final OU um elemento do sonho de forma diferente — mais segura, mais fortalecida. Por exemplo, se no sonho você foge, na reescrita você enfrenta ou recebe ajuda. Leia a nova versão antes de dormir.",
      },
    ],
    summary: [
      "O sono é essencial para o processamento emocional e a regulação do sistema nervoso",
      "Privação de sono aumenta a reatividade da amígdala a gatilhos emocionais",
      "Um ritual consistente treina o cérebro para reconhecer a hora de dormir",
      "Pesadelos são processamento noturno do trauma — há estratégias para lidar com eles",
      "Pequenas melhorias no ambiente e nos hábitos geram grandes ganhos na qualidade do sono",
    ],
  },
  {
    id: "mod-6",
    order: 6,
    title: "Movimento e Humor",
    slug: "movimento-e-humor",
    description: "A relação entre exercícios físicos, neuroquímica cerebral e regulação do humor.",
    icon: "🏃",
    sections: [
      {
        heading: "Movimento como medicina para o sistema nervoso",
        text: "O exercício físico regular é um dos antidepressivos naturais mais potentes que existem. Ele aumenta a produção de endorfinas (analgésicos naturais), serotonina (regulador do humor) e dopamina (motivação e prazer). Além disso, reduz o cortisol (hormônio do estresse) e o TNF-alfa (marcador inflamatório ligado à depressão). Para quem vive com trauma, o movimento também ajuda a 'descongelar' o corpo, liberando a tensão física armazenada e restaurando a sensação de segurança no próprio corpo.",
      },
      {
        heading: "Movimento não precisa ser academia",
        text: "Movimentar-se não significa malhar pesado, ir à academia ou seguir um plano rígido. Atividades que contam como movimento para o cérebro: caminhada ao ar livre (especialmente em áreas verdes), dança na sala (coloque 3 músicas e se mova livremente), alongamentos ao acordar, ioga ou tai chi, jardinagem, brincar com crianças ou animais de estimação, subir escadas, estacionar mais longe e caminhar. O segredo é encontrar algo que você goste — a consistência vem do prazer, não da disciplina.",
      },
      {
        heading: "Neurobiologia do movimento",
        text: "Diferentes tipos de movimento afetam o cérebro de formas diferentes: Movimento aeróbico (caminhada, corrida, natação, bicicleta) — aumenta BDNF (fator neurotrófico derivado do cérebro), uma proteína que ajuda na neuroplasticidade e na regeneração de neurônios. Movimento com ritmo e repetição — tem efeito meditativo, acalmando a amígdala. Movimento que exige foco no presente (ioga, artes marciais, pilates) — reduz a hipervigilância ao trazer a atenção para o corpo e a respiração. Alongamento e liberação miofascial — ajudam a liberar a tensão muscular crônica do trauma.",
      },
      {
        heading: "Comece pequeno — a regra dos 2 minutos",
        text: "Se está há muito tempo sem se exercitar, a barreira para começar pode ser enorme. Use a regra dos 2 minutos: comprometa-se a fazer apenas 2 minutos de movimento. Só 2. Na maioria das vezes, você continuará além dos 2 minutos. Se não continuar, ainda assim terá feito 2 minutos a mais do que ontem. Exemplos: 2 minutos de alongamento ao acordar, 2 minutos de dança na cozinha, caminhar até o final da rua e voltar (2-5 min). Aumente gradualmente conforme seu corpo se adapta.",
      },
      {
        heading: "Movimento e regulação emocional",
        text: "Atividades que envolvem ritmo e repetição (correr, nadar, pedalar, caminhar) ativam o sistema nervoso parassimpático e têm efeito meditativo — o 'transe do corredor' é real. Já exercícios que exigem foco coordenado (ioga, tai chi, dança coreografada, artes marciais) ajudam a reduzir a hipervigilância porque exigem que sua atenção esteja no corpo no presente. Exercícios de força (musculação, calistenia) podem ser empoderadores para quem se sente fisicamente vulnerável. Varie e descubra o que mais ressoa com você.",
      },
      {
        heading: "Movimento como prática de autocuidado, não punição",
        text: "Para muitas pessoas com trauma, o exercício foi associado a punição, cobrança ou vergonha (educação física na escola, padrões estéticos, comentários sobre o corpo). Se esse é seu caso, é importante ressignificar o movimento como um presente para o corpo, não uma obrigação. Pergunte-se: 'Que tipo de movimento seria um ato de carinho comigo hoje?' em vez de 'quanto devo treinar?' Movimento como autocuidado é algo que você escolhe fazer porque faz bem, não porque deve.",
      },
    ],
    exercises: [
      {
        title: "Experimento de 7 Dias com Movimento",
        prompt: "Nos próximos 7 dias, experimente uma forma diferente de movimento a cada dia (ou repita as que gostar). Gaste pelo menos 5 minutos. Anote no diário: (1) Qual atividade, (2) Como se sentia ANTES (0-10 energia/humor), (3) Como se sentiu DURANTE, (4) Como se sente DEPOIS (0-10). No final da semana, qual atividade teve o maior impacto positivo?",
      },
      {
        title: "Movimento como Regulação Emocional",
        prompt: "Na próxima vez que sentir ansiedade, raiva ou ativação intensa (em vez de se sentar e 'respirar', que também funciona), tente: sair para caminhar rápido por 5 minutos, fazer 10 polichinelos ou agachamentos, dançar 1 música inteira sem pensar nos passos. Depois, anote: (1) O que sentia antes, (2) O que fez, (3) Como ficou depois. Você pode descobrir que o movimento regula mais rápido que a respiração em alguns momentos.",
      },
      {
        title: "Ressignificando o Movimento",
        prompt: "Escreva sobre sua história com o exercício físico. Teve experiências negativas? Associou movimento a obrigação ou punição? Agora, escreva como você gostaria de se relacionar com o movimento daqui em diante. Que tipo de movimento seria um presente para seu corpo? Que frase você poderia usar para se motivar com gentileza?",
      },
    ],
    summary: [
      "O movimento regular é um dos reguladores mais potentes do sistema nervoso",
      "Não precisa ser academia — qualquer movimento que você goste já conta",
      "A regra dos 2 minutos elimina a barreira para começar",
      "Diferentes tipos de movimento produzem diferentes benefícios para o cérebro",
      "Ressignifique o movimento como autocuidado, não como obrigação ou punição",
    ],
  },
  {
    id: "mod-7",
    order: 7,
    title: "Rede de Apoio",
    slug: "rede-de-apoio",
    description: "Construindo conexões saudáveis e aprendendo a pedir ajuda quando precisar.",
    icon: "🤝",
    sections: [
      {
        heading: "Por que a conexão cura?",
        text: "O trauma frequentemente nos isola. A vergonha ('se eu contar, vão me julgar'), o medo de ser vulnerável e a sensação de que 'ninguém entenderia' nos afastam das pessoas. No entanto, a conexão humana é um dos fatores mais poderosos de cura identificados pela pesquisa em trauma. O sistema nervoso se regula através da co-regulação — quando estamos perto de alguém seguro, nosso sistema nervoso se acalma em resposta à calma do outro. Relacionamentos seguros são um antídoto direto para os efeitos do trauma.",
      },
      {
        heading: "Os 3 tipos de apoio que precisamos",
        text: "Apoio emocional: alguém que ouve, valida e acolhe sem tentar 'consertar'. A função não é resolver o problema, mas testemunhar sua experiência. Apoio prático: alguém que pode ajudar com tarefas concretas (carona, refeição, companhia para uma consulta). Apoio informacional: alguém que compartilha conhecimento, recursos ou orientações (um amigo que já passou por terapia, um livro que recomendaram). Reconhecer qual tipo de apoio você precisa em cada momento ajuda a pedir de forma mais eficaz.",
      },
      {
        heading: "Identificando sua rede atual",
        text: "Pegue uma folha de papel e desenhe 3 círculos concêntricos. No centro: você. Círculo interno (apoio forte): pessoas seguras, que ouvem sem julgar, com quem você pode ser vulnerável — podem ser familiares, amigos, parceiro(a), terapeuta. Círculo médio (apoio moderado): pessoas com quem você pode contar em algumas situações, mas não para tudo — colegas de trabalho, amigos recentes, vizinhos. Círculo externo (apoio frágil): relações que podem ser estressantes, tóxicas ou que exigem mais energia do que dão. Avalie honestamente: quem está em cada círculo? Se o círculo externo está cheio e o interno vazio, isso é um sinal importante.",
      },
      {
        heading: "Como pedir ajuda de forma eficaz",
        text: "Seja direta e específica. Em vez de um genérico 'estou mal', tente: 'Estou passando por um momento difícil e gostaria de conversar. Você teria 20 minutos para me ouvir?' ou 'Preciso de ajuda com [tarefa específica]. Você pode me ajudar?' Ofereça contexto: 'Não preciso que você resolva nada, só quero desabafar.' Defina limites: você decide o quanto compartilhar e com quem. Você não precisa contar tudo para todos. Pedir ajuda é um ato de coragem e autoconhecimento, não de fraqueza.",
      },
      {
        heading: "Qualidade sobre quantidade — e como lidar com decepções",
        text: "Uma rede de apoio não se mede pelo número de contatos, mas pela profundidade e segurança das conexões. É melhor ter 1-2 pessoas verdadeiramente seguras do que 20 conhecidos superficiais. IMPORTANTE: nem todas as pessoas vão corresponder às suas expectativas. Algumas podem reagir de forma insensível, invalidar sua experiência ou simplesmente não ter capacidade de apoiar no momento. Isso não significa que você é 'pesado demais' ou que há algo errado em pedir ajuda — significa que aquela pessoa não é a certa para esse tipo de apoio. Não desista de pedir ajuda por causa de uma má experiência.",
      },
      {
        heading: "Expandindo sua rede com segurança",
        text: "Se sua rede atual é pequena ou insuficiente, existem formas seguras de expandi-la: Grupos de apoio temáticos (online ou presenciais) — existem grupos específicos para ansiedade, luto, abuso, TEPT. Comunidades com interesses comuns — clube do livro, grupo de caminhada, aula de cerâmica, meditação em grupo. Trabalho voluntário — ajudar outros é uma forma de conexão significativa. Terapia em grupo — acompanhada por profissional, é um ambiente seguro para praticar vulnerabilidade. Comece com atividades de baixa pressão, onde você pode ir e vir sem compromisso.",
      },
    ],
    exercises: [
      {
        title: "Mapeando Minha Rede (Círculos)",
        prompt: "Desenhe 3 círculos concêntricos em uma folha (ou mentalmente). No centro: você. Círculo interno (segurança): quem ouve sem julgar? Círculo médio (apoio moderado): em quem você pode contar para coisas específicas? Círculo externo (relações que drenam): quem exige mais do que dá? Depois, escolha UMA pessoa do círculo interno e escreva um plano concreto de fortalecer essa conexão esta semana.",
      },
      {
        title: "Praticando Pedir Ajuda",
        prompt: "Escolha uma pessoa do seu círculo interno ou médio. Pense em algo pequeno e específico que você poderia pedir (não um desabafo profundo, mas algo simples: 'você pode me acompanhar no mercado amanhã?' ou 'pode me ligar por 10 minutos hoje?'). Escreva o que você diria. Depois, execute. Anote como foi: a pessoa reagiu bem? Como você se sentiu depois?",
      },
      {
        title: "Carta de Limites em Relações Desiguais",
        prompt: "Pense em uma relação do círculo externo (que drena sua energia). Escreva uma carta (não enviada) expressando como essa relação afeta você. Depois, escreva uma versão prática: qual limite você poderia estabelecer para proteger sua energia nessa relação? Pode ser reduzir contato, mudar o assunto quando algo aparece ou dizer 'não' a um pedido. Escreva uma frase que você poderia dizer.",
      },
    ],
    summary: [
      "Conexão humana segura regula o sistema nervoso — é um antídoto direto ao trauma",
      "Existem 3 tipos de apoio: emocional, prático e informacional — saiba qual você precisa",
      "Qualidade importa mais que quantidade; 1-2 pessoas seguras fazem diferença",
      "Pedir ajuda se aprende — comece pequeno e seja específico",
      "Se uma pessoa não corresponde, não desista — ela só não é a pessoa certa para esse apoio",
    ],
  },
  {
    id: "mod-8",
    order: 8,
    title: "Limites Saudáveis",
    slug: "limites-saudaveis",
    description: "Aprender a dizer não, proteger sua energia e estabelecer relações mais equilibradas.",
    icon: "🛡️",
    sections: [
      {
        heading: "O que são limites saudáveis?",
        text: "Limites são as regras que você estabelece para proteger seu bem-estar físico, emocional, mental e espiritual. Eles definem o que é aceitável e o que não é no seu convívio com os outros, como você permite ser tratado e onde termina sua responsabilidade e começa a dos outros. Pessoas que passaram por traumas frequentemente têm dificuldade em estabelecer limites — seja porque aprenderam que suas necessidades não importam, seja porque tiveram seus limites violados repetidamente na infância ou em relacionamentos abusivos. A boa notícia é que limites saudáveis podem ser aprendidos e praticados.",
      },
      {
        heading: "Por que é tão difícil dizer não?",
        text: "Se você tem dificuldade com limites, pode estar lidando com: Medo de abandono — 'se eu disser não, a pessoa vai me deixar.' Culpa — 'se eu disser não, sou egoísta/ingrato.' Crença de que seu valor depende do que você faz pelos outros. Responsabilidade excessiva pelos sentimentos alheios. Histórico de ter seus limites punidos ou ignorados. Identifique qual desses ressoa mais com você. O primeiro passo é validar que essa dificuldade tem uma razão de ser — você não é 'fraca' por ter dificuldade com limites; você está desaprendendo um padrão de sobrevivência.",
      },
      {
        heading: "Os 5 tipos de limites",
        text: "Físicos: seu espaço pessoal, toque físico, privacidade, necessidades corporais (sono, alimentação). Ex: 'Prefiro cumprimentar com um aceno', 'Preciso de 30 minutos sozinho quando chego em casa.' Emocionais: separar seus sentimentos dos sentimentos alheios; não assumir a dor do outro como sua. Ex: 'Eu entendo que você está chateado, mas não posso assumir essa responsabilidade.' Temporais: como você usa seu tempo — o recurso mais finito. Ex: 'Não posso atender ligações após as 20h', 'Posso ajudar por 15 minutos.' Materiais: seu dinheiro, pertences, espaço. Ex: 'Não posso emprestar dinheiro agora', 'Prefiro não compartilhar meu carro.' Intelectuais: suas opiniões, crenças, valores — você não precisa concordar com tudo. Ex: 'Respeito sua opinião, mas vejo isso de forma diferente.'",
      },
      {
        heading: "Dizer não é um ato de autocuidado",
        text: "Você não precisa justificar seu 'não' extensivamente. Um 'não, obrigado', 'isso não funciona para mim agora', 'hoje não vai dar' ou 'prefiro não' é suficiente. Quanto mais você justifica, mais abre espaço para negociação. Lembre-se: toda vez que você diz sim para algo que não quer, está dizendo não para si mesmo — não para seu tempo, sua energia, sua paz. Pratique em situações de baixo risco primeiro (recusar uma amostra na rua, dizer não a um convite casual) para fortalecer o 'músculo do limite'.",
      },
      {
        heading: "Sinais de que um limite foi violado",
        text: "Seu corpo e suas emoções são seus melhores indicadores. Fique atento a: Ressentimento — você se sente irritado com alguém que pediu algo 'razoável'. Exaustão — interações com certa pessoa deixam você exausto. Sensação de ser 'usado' — como se a pessoa só aparecesse quando precisa. Desconforto físico — tensão, náusea, aperto no peito ao pensar em alguém. 'Andar em ovos' — sentir que precisa medir cada palavra para não causar reação. Esses são sinais de que seus limites precisam ser reforçados ou estabelecidos.",
      },
      {
        heading: "O limite não é sobre controlar o outro, é sobre cuidar de você",
        text: "Uma confusão comum é achar que estabelecer um limite é 'controlar' a outra pessoa. Na verdade, o limite é sobre você: 'Isso é o que eu posso/gosto/fazer. Você é livre para escolher como reagir.' Exemplo: 'Não posso atender ligações depois das 21h' é um limite. 'Você não pode me ligar depois das 21h' é uma tentativa de controle. A diferença é sutil mas importante. O limite informa o outro sobre como cuidar da relação com você; a intenção não é punir, mas proteger a conexão a longo prazo.",
      },
    ],
    exercises: [
      {
        title: "Diagnóstico de Limites",
        prompt: "Para cada área abaixo, avalie de 0 a 10 como está seu limite atualmente: Físicos (privacidade, toque, espaço), Emocionais (separar sentimentos), Tempo (disponibilidade), Materiais (dinheiro, pertences), Intelectuais (opiniões). Depois, escolha a área com menor nota e identifique UMA situação específica onde você poderia praticar um limite esta semana.",
      },
      {
        title: "Praticando o 'Não'",
        prompt: "Escreva 3 situações hipotéticas onde você gostaria de dizer não. Para cada uma, escreva: (1) O que a pessoa pede, (2) O que você gostaria de responder (seja direto), (3) Como você se sentiria depois. Depois, pratique em voz alta. Depois, tente em uma situação real de baixo risco.",
      },
      {
        title: "Limite em Ação",
        prompt: "Identifique UM limite que você precisa estabelecer ou fortalecer esta semana. Escreva: (1) Qual é o limite, (2) Como você vai comunicar (frase exata), (3) Quando e onde vai fazer isso, (4) O que fará depois para se cuidar (independente da reação do outro). Volte aqui depois e escreva como foi.",
      },
    ],
    summary: [
      "Limites saudáveis protegem seu bem-estar e são essenciais para relações equilibradas",
      "Dizer não é um ato de autocuidado, não de egoísmo",
      "Existem 5 tipos de limites — identifique onde você precisa reforçar",
      "O limite informa o outro sobre como cuidar da relação com você",
      "Pratique em situações de baixo risco e vá aumentando gradualmente",
    ],
  },
  {
    id: "mod-9",
    order: 9,
    title: "Mindfulness Prático",
    slug: "mindfulness-pratico",
    description: "Técnicas simples de atenção plena para trazer calma e presença ao seu dia a dia.",
    icon: "🧘",
    sections: [
      {
        heading: "O que é mindfulness (e o que NÃO é)?",
        text: "Mindfulness é a prática de prestar atenção ao momento presente, de forma intencional e sem julgamento. Não se trata de 'esvaziar a mente' — isso é um mito. A mente vai pensar, e isso é normal. Mindfulness é sobre notar quando ela vagou e gentilmente trazê-la de volta, sem críticas. Também não é uma técnica de relaxamento (embora relaxe), não é uma prática religiosa (embora tenha origens contemplativas), e não é sobre ser 'zen' o tempo todo. É sobre desenvolver uma relação diferente com sua experiência — mais curiosa e menos reativa.",
      },
      {
        heading: "Mindfulness e trauma: cuidados importantes",
        text: "Para pessoas com histórico de trauma, algumas práticas de mindfulness precisam ser adaptadas. A atenção plena ao corpo pode ativar memórias traumáticas se feita sem orientação adequada. Recomendações: Comece com práticas de 'mente aberta' (foco no ambiente) em vez de escaneamento corporal fechado. Mantenha os olhos abertos se fechar ativar sensações de insegurança. Tenha um 'ponto seguro' para onde voltar (respiração, som ambiente, contato das mãos). Se uma prática ativar desconforto intenso, pare e mude para algo mais neutro. Mindfulness para trauma é sobre expansão da tolerância, não sobre 'enfrentar' o desconforto.",
      },
      {
        heading: "Prática 1: Escaneamento Corporal Amigável",
        text: "Sente-se ou deite-se confortavelmente, com os olhos fechados ou semi-abertos. Em vez de 'escaneier em busca de sensações', convide a atenção para cada parte, como se estivesse saudando cada área com gentileza: pés: 'obrigado por me sustentarem', pernas: 'obrigado por me levarem', abdômen: 'obrigado por respirar por mim', mãos: 'obrigado por me permitirem tocar e criar', coração: 'obrigado por bater por mim'. Gaste 1-2 minutos em cada área. Quando a mente vagar, apenas note e volte. Esta versão compassiva é mais segura para quem tem trauma.",
      },
      {
        heading: "Prática 2: Atenção Plena no Dia a Dia (micro-momentos)",
        text: "Escolha UMA atividade cotidiana para fazer com atenção plena esta semana. Pode ser: escovar os dentes — sinta a textura da escova, o gosto da pasta, o movimento do braço. Tomar banho — sinta a água na pele, o vapor, o cheiro do sabonete. Comer — preste atenção às cores, texturas, sabores, mastigue devagar. Lavar louça — sinta a água morna, a textura dos pratos, o movimento das mãos. Quando sua mente vagar (e vai vagar), gentilmente traga-a de volta para a atividade. Sem julgamento. Cada micro-momento é um 'treino' de presença.",
      },
      {
        heading: "Prática 3: Observação de Pensamentos (rio de folhas)",
        text: "Sente-se confortavelmente e feche os olhos (ou mantenha semi-abertos). Imagine-se sentado à margem de um rio, vendo folhas passarem na correnteza. Cada folha é um pensamento. Você não precisa pular no rio e agarrar a folha, nem analisá-la, nem afogá-la — apenas observe-a passar. Se perceber que 'pulou no rio' (se envolveu com o pensamento), apenas note e volte para a margem. Pratique por 5 minutos. Variante: em vez de folhas, use nuvens passando no céu ou carros passando na estrada. Você pode rotular mentalmente cada pensamento: 'planejamento', 'lembrança', 'preocupação', 'julgamento', 'sensação'.",
      },
      {
        heading: "Criando o hábito de mindfulness",
        text: "Mindfulness é como um músculo — quanto mais você pratica, mais forte fica. Mas consistência é mais importante que duração. Melhor 2 minutos por dia do que 30 minutos uma vez por semana. Estratégias: (1) Âncora: escolha um horário fixo (ao acordar, antes do café, ao deitar). (2) Gatilho: associe a prática a um hábito existente ('depois de escovar os dentes, respiro 3 vezes'). (3) Micro-práticas: 3 respirações conscientes várias vezes ao dia. (4) Use aplicativos: Insight Timer, Meditopia ou Lojong têm práticas guiadas gratuitas em português.",
      },
    ],
    exercises: [
      {
        title: "Desafio de 7 Dias Mindfulness",
        prompt: "Escolha UMA das três práticas do módulo. Pratique-a diariamente pelos próximos 7 dias. Dias 1-2: 2 minutos. Dias 3-4: 4 minutos. Dias 5-7: 6 minutos. Cada dia, anote no diário: (1) Qual prática, (2) Como foi (0-10 facilidade), (3) O que percebeu (pensamentos, sensações, emoções), (4) Como se sente depois (0-10).",
      },
      {
        title: "Mindfulness em Movimento",
        prompt: "Escolha uma caminhada curta (5-10 min) para fazer com atenção plena. Não use fones de ouvido. Preste atenção: aos passos (sensação dos pés no chão), à respiração, ao vento na pele, aos sons ao redor (passarinho, carros, conversas distantes), às cores e luzes. Quando a mente vagar, traga-a gentilmente de volta para a caminhada. Anote como foi diferente de uma caminhada normal.",
      },
      {
        title: "Mindfulness da Respiração (3 Minutos)",
        prompt: "Sente-se e coloque um timer de 3 minutos. Apenas preste atenção à sua respiração — onde você sente mais: narinas, peito ou barriga? Não tente controlar, apenas observe. Conte 1 ao inspirar, 2 ao expirar, até 10, e recomece. Se perder a conta, apenas recomece do 1. Depois, escreva: o que notou sobre sua mente e sua respiração?",
      },
    ],
    summary: [
      "Mindfulness é prestar atenção ao presente com intenção e sem julgamento",
      "Para quem tem trauma, adapte as práticas para serem mais seguras e gentis",
      "Micro-momentos de atenção plena ao longo do dia são tão eficazes quanto sessões longas",
      "A mente vai vagar — isso não é erro, é o que mentes fazem. A prática é notar e voltar",
      "Consistência supera duração: 2 min/dia > 30 min/semana",
    ],
  },
  {
    id: "mod-10",
    order: 10,
    title: "Ajuda Profissional",
    slug: "ajuda-profissional",
    description: "Quando e como buscar acompanhamento profissional e recursos de saúde mental disponíveis.",
    icon: "🏥",
    sections: [
      {
        heading: "Este guia é um apoio, não um substituto",
        text: "Este material foi criado como uma ferramenta de apoio e psicoeducação, não substitui o acompanhamento profissional. Assim como você não trataria uma fratura com um livro sobre ossos, o trauma muitas vezes requer a orientação de um profissional treinado. Buscar ajuda não significa que você 'falhou' ou que seu esforço pessoal não foi suficiente — significa que você está levando sua saúde a sério. A combinação de autocuidado (como o que você praticou nos 9 módulos anteriores) com apoio profissional é o caminho mais eficaz para a cura.",
      },
      {
        heading: "Sinais de que você pode precisar de ajuda profissional",
        text: "Considere buscar apoio se você está enfrentando: Sofrimento intenso e persistente que não melhora com autocuidado. Pensamentos de autoagressão, morte ou suicídio — ligue CVV 188 IMEDIATAMENTE. Dificuldade de funcionar no dia a dia (trabalho, estudos, higiene, alimentação). Uso de substâncias (álcool, drogas) para lidar com emoções. Isolamento social extremo. Sintomas físicos sem causa médica (dores, fadiga, problemas digestivos). Flashbacks frequentes, pesadelos ou sensação de estar revivendo o trauma. Sensação de que 'não vale a pena viver' ou desesperança persistente. Você merece apoio profissional — não precisa passar por isso sozinho.",
      },
      {
        heading: "Tipos de profissionais e abordagens",
        text: "Psicólogos: oferecem psicoterapia. Abordagens eficazes para trauma incluem: TCC (Terapia Cognitivo-Comportamental) — focada em pensamentos e comportamentos atuais. EMDR (Dessensibilização e Reprocessamento por Movimentos Oculares) — especificamente desenvolvida para trauma. Terapia de Exposição — ajuda a reduzir o medo associado a memórias traumáticas. Terapia do Esquema — útil para traumas complexos e de infância. Psiquiatras: médicos que podem diagnosticar e prescrever medicação se necessário (antidepressivos, ansiolíticos, estabilizadores). Terapeutas ocupacionais: ajudam na retomada de atividades diárias e na criação de rotinas. Assistentes sociais: conectam com recursos da comunidade (benefícios, grupos de apoio, programas sociais).",
      },
      {
        heading: "Como encontrar o profissional certo",
        text: "Passos práticos: (1) Consulte o CRP (Conselho Regional de Psicologia) do seu estado — eles têm listas de profissionais registrados. (2) Plataformas online: Psicologia Viva, Zenklub, Vittude, Eurekka — conectam você a profissionais para atendimento remoto, muitas vezes com preços acessíveis. (3) Aplicativos de plano de saúde: muitos oferecem cobertura para psicologia e psiquiatria. (4) Peça referências: amigos, familiares ou seu clínico geral podem recomendar profissionais. (5) Não se sinta preso ao primeiro profissional — a relação terapêutica é fundamental. Se não sentir segurança ou conexão após algumas sessões, é válido buscar outro profissional.",
      },
      {
        heading: "Recursos gratuitos e de baixo custo",
        text: "CAPS (Centros de Atenção Psicossocial) — atendimento gratuito pelo SUS para saúde mental. Busque o CAPS mais próximo da sua região. CVV (Centro de Valorização da Vida) — apoio emocional gratuito 24 horas pelo telefone 188, chat ou e-mail. Clínicas-escola de universidades — faculdades de psicologia oferecem atendimento a baixo custo (ou gratuito) com supervisão de professores experientes. Hospitais públicos com serviço de psicologia. Projetos sociais e ONGs — muitas oferecem acolhimento psicológico gratuito. Pesquise no Google: 'atendimento psicológico gratuito [sua cidade]'.",
      },
      {
        heading: "O que esperar da primeira consulta",
        text: "A primeira consulta é uma conversa. O profissional vai perguntar sobre: o que te trouxe ali, sua história, sintomas atuais, histórico de saúde, suporte social. Você pode perguntar: qual abordagem ele usa, se tem experiência com trauma, qual a frequência e duração do tratamento, valor e formas de pagamento. Não precisa saber exatamente o que dizer — o profissional está treinado para conduzir a conversa. Leve anotações se quiser. Se sentir vergonha ou nervosismo, isso é normal — profissionais estão acostumados. Lembre-se: você está no controle — pode escolher não responder algo, pode fazer perguntas, pode decidir se quer continuar.",
      },
    ],
    exercises: [
      {
        title: "Meu Plano de Cuidado em Saúde Mental",
        prompt: "Crie seu plano pessoal: (1) Liste 3 sinais de que você pode precisar de ajuda profissional (baseado no que leu aqui). (2) Pesquise 2 profissionais ou serviços na sua região e anote nome, contato, abordagem e valor. (3) Escreva um roteiro do que gostaria de dizer em uma primeira consulta (pode ser tópicos, não frases completas). (4) Defina: qual seu próximo passo concreto e quando você vai executá-lo. Ex: 'Até sexta-feira, vou ligar para a clínica-escola da universidade.'",
      },
      {
        title: "Barreiras vs. Soluções",
        prompt: "O que pode estar te impedindo de buscar ajuda? Liste as barreiras (ex: dinheiro, vergonha, não saber por onde começar, medo do que vão pensar). Para cada barreira, escreva uma solução possível: 'Não tenho dinheiro' → 'clínicas-escola têm preço social', 'Tenho vergonha' → 'a primeira consulta é só uma conversa', 'Não sei onde encontrar' → 'pesquisar CRP do meu estado'. Transforme cada barreira em um passo prático.",
      },
      {
        title: "Carta de Apresentação para Terapia",
        prompt: "Escreva uma carta (para você mesmo) contando: (1) O que você está sentindo e passando, (2) O que já tentou fazer para melhorar, (3) O que espera da terapia, (4) Perguntas que tem para o profissional. Leve esta carta para a primeira consulta — você pode entregá-la ao profissional ou usá-la como guia para a conversa. Isso reduz a ansiedade de 'não saber o que dizer'.",
      },
    ],
    summary: [
      "Este guia é uma ferramenta de apoio — a ajuda profissional é um complemento, não um substituto do seu esforço",
      "Existem sinais claros de que chegou a hora de buscar apoio profissional",
      "Diferentes profissionais e abordagens existem para diferentes necessidades",
      "Recursos gratuitos e de baixo custo estão disponíveis — você não precisa ter dinheiro para se cuidar",
      "Pedir ajuda é um ato de coragem e autocuidado. Você merece esse cuidado.",
    ],
  },
];
