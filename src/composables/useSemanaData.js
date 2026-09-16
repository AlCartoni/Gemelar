import { computed } from 'vue'

/**
 * useSemanaData — Dados completos de cada semana da gestação gemelar (4-38)
 * Inclui: tamanho comparativo, peso, comprimento, marco de desenvolvimento,
 *         frase afetiva, cuidados semanais leves e acolhedores
 */

const semanas = {
  4: {
    emoji: '🌱',
    tamanho: 'uma sementinha',
    peso: '< 1g',
    comprimento: '~1 mm',
    marco: 'Os bebês estão se formando dentro de você.',
    frase: 'Tudo começa bem pequeninho. E já é lindo.',
    carinho: 'Você já é mãe. 💛',
    cuidados: [
      { icone: '💊', texto: 'Tome o ácido fólico todo dia. Ele ajuda muito.' },
      { icone: '💧', texto: 'Beba bastante água. Seu corpo precisa.' },
    ],
  },
  5: {
    emoji: '🌾',
    tamanho: 'um grãozinho de gergelim',
    peso: '< 1g',
    comprimento: '~2 mm',
    marco: 'O coraçãozinho deles está começando a bater.',
    frase: 'Dois coraçõezinhos começando a bater dentro de você.',
    carinho: 'Já são dois amores. ✨',
    cuidados: [
      { icone: '🤰', texto: 'Se sentir enjoo, coma pouco e várias vezes ao dia.' },
      { icone: '😴', texto: 'Descanse sempre que puder. Seu corpo está trabalhando muito.' },
    ],
  },
  6: {
    emoji: '🫘',
    tamanho: 'uma lentilha',
    peso: '< 1g',
    comprimento: '~5 mm',
    marco: 'Os bracinhos e perninhas estão começando a aparecer.',
    frase: 'Eles estão do tamanho de uma lentilha.',
    carinho: 'Pequeninos, mas já cheios de vida. 💕',
    cuidados: [
      { icone: '🥤', texto: 'Gengibre ou limão na água ajuda com enjoo.' },
      { icone: '📋', texto: 'Já marcou a primeira consulta? O médico vai cuidar de vocês.' },
    ],
  },
  7: {
    emoji: '🫐',
    tamanho: 'uma amora',
    peso: '~1g',
    comprimento: '~1 cm',
    marco: 'O cérebro está crescendo rápido.',
    frase: 'Cada bebê está do tamanho de uma amora.',
    carinho: 'Doces como você. 🥰',
    cuidados: [
      { icone: '🥗', texto: 'Coma frutas e verduras. O que faz bem pra você faz bem pra eles.' },
      { icone: '💤', texto: 'Se sentir muito sono, é normal. Seu corpo está fazendo dois bebês!' },
    ],
  },
  8: {
    emoji: '🫒',
    tamanho: 'um feijão',
    peso: '~1g',
    comprimento: '~1.5 cm',
    marco: 'Os dedinhos das mãos estão se formando.',
    frase: 'Eles estão do tamanho de um feijãozinho.',
    carinho: 'Eles já começam a se mexer! 💫',
    cuidados: [
      { icone: '🚶‍♀️', texto: 'Uma caminhada leve faz bem. Sem pressa, no seu ritmo.' },
      { icone: '💧', texto: 'Continue bebendo bastante água, tá?' },
    ],
  },
  9: {
    emoji: '🍇',
    tamanho: 'uma uva',
    peso: '~2g',
    comprimento: '~2 cm',
    marco: 'Os órgãos principais estão todos formados.',
    frase: 'Cada bebê está do tamanho de uma uva.',
    carinho: 'Você está fazendo um trabalho incrível. 🌸',
    cuidados: [
      { icone: '🧘', texto: 'Respire fundo quando estiver ansiosa. Vai ficar tudo bem.' },
      { icone: '🍊', texto: 'Vitamina C ajuda! Laranja, acerola, goiaba...' },
    ],
  },
  10: {
    emoji: '🫒',
    tamanho: 'uma azeitona',
    peso: '~4g',
    comprimento: '~3 cm',
    marco: 'Os dedinhos dos pés estão aparecendo.',
    frase: 'Eles estão do tamanho de uma azeitona.',
    carinho: 'Os dedinhos deles já estão se formando. 🤏',
    cuidados: [
      { icone: '👩‍⚕️', texto: 'Siga direitinho as consultas com o médico.' },
      { icone: '🌿', texto: 'Chá de camomila pode ajudar a relaxar.' },
    ],
  },
  11: {
    emoji: '🍈',
    tamanho: 'um figo',
    peso: '~7g',
    comprimento: '~4 cm',
    marco: 'Eles já conseguem se esticar e bocejar.',
    frase: 'Cada bebê está do tamanho de um figo.',
    carinho: 'Eles já bocejam! Que fofos. 💜',
    cuidados: [
      { icone: '🥛', texto: 'Cálcio é importante! Leite, queijo, iogurte...' },
      { icone: '😊', texto: 'Faça algo que te deixe feliz hoje.' },
    ],
  },
  12: {
    emoji: '🍋',
    tamanho: 'uma lima',
    peso: '~14g',
    comprimento: '~5 cm',
    marco: 'Os reflexos deles estão aparecendo.',
    frase: 'Eles estão do tamanho de uma lima.',
    carinho: 'Fim do primeiro trimestre! Você é guerreira. ✨',
    cuidados: [
      { icone: '🎉', texto: 'Parabéns! Você passou o primeiro trimestre. Isso é ótimo!' },
      { icone: '📸', texto: 'Que tal tirar uma foto da barriguinha?' },
    ],
  },
  13: {
    emoji: '🍑',
    tamanho: 'um pêssego pequeno',
    peso: '~23g',
    comprimento: '~7 cm',
    marco: 'As impressões digitais deles já são únicas.',
    frase: 'Cada bebê está do tamanho de um pesseguinho.',
    carinho: 'Cada um é único. Como você. 🌟',
    cuidados: [
      { icone: '🛌', texto: 'Tente dormir de lado. É mais confortável.' },
      { icone: '🥜', texto: 'Castanhas e nozes são ótimos lanchinhos.' },
    ],
  },
  14: {
    emoji: '🍋',
    tamanho: 'um limão',
    peso: '~43g',
    comprimento: '~9 cm',
    marco: 'Eles já fazem caretinhas.',
    frase: 'Eles estão do tamanho de um limão.',
    carinho: 'Eles já fazem caretas! 😊',
    cuidados: [
      { icone: '💪', texto: 'O enjoo geralmente melhora agora. Que alívio!' },
      { icone: '🏊', texto: 'Natação ou hidroginástica são ótimos pra gestantes.' },
    ],
  },
  15: {
    emoji: '🍎',
    tamanho: 'uma maçã',
    peso: '~70g',
    comprimento: '~10 cm',
    marco: 'Eles já conseguem ouvir sons de dentro do corpo.',
    frase: 'Cada bebê está do tamanho de uma maçã.',
    carinho: 'Você é a casa mais quentinha do mundo. 🏠💕',
    cuidados: [
      { icone: '🎵', texto: 'Coloque uma música suave. Eles podem começar a ouvir!' },
      { icone: '🧴', texto: 'Hidrate a pele da barriga. Vai crescer bastante!' },
    ],
  },
  16: {
    emoji: '🥑',
    tamanho: 'um abacate',
    peso: '~100g',
    comprimento: '~12 cm',
    marco: 'As perninhas já são maiores que os braços.',
    frase: 'Eles estão do tamanho de um abacate.',
    carinho: 'As perninhas deles estão crescendo! 🦵',
    cuidados: [
      { icone: '👟', texto: 'Use sapatos confortáveis. Seus pés vão agradecer.' },
      { icone: '🫶', texto: 'Peça ajuda quando precisar. Você não precisa fazer tudo sozinha.' },
    ],
  },
  17: {
    emoji: '🍐',
    tamanho: 'uma pera',
    peso: '~140g',
    comprimento: '~13 cm',
    marco: 'O esqueleto está ficando mais forte.',
    frase: 'Cada bebê está do tamanho de uma pera.',
    carinho: 'Eles estão ficando mais fortes! 💪',
    cuidados: [
      { icone: '🥩', texto: 'Ferro é importante! Carne, feijão, espinafre ajudam.' },
      { icone: '🌞', texto: 'Um pouquinho de sol de manhã faz bem.' },
    ],
  },
  18: {
    emoji: '🫑',
    tamanho: 'um pimentão',
    peso: '~190g',
    comprimento: '~14 cm',
    marco: 'Eles já ouvem sua voz!',
    frase: 'Eles estão do tamanho de um pimentão.',
    carinho: 'Converse com eles! Eles ouvem você. 🗣️💛',
    cuidados: [
      { icone: '💬', texto: 'Fale com seus bebês. A voz da mãe é o som favorito deles.' },
      { icone: '📖', texto: 'Leia uma história em voz alta. Eles vão adorar.' },
    ],
  },
  19: {
    emoji: '🍊',
    tamanho: 'uma laranja',
    peso: '~240g',
    comprimento: '~15 cm',
    marco: 'Os sentidos estão se desenvolvendo.',
    frase: 'Cada bebê está do tamanho de uma laranja.',
    carinho: 'Os sentidos deles estão aparecendo. 🌈',
    cuidados: [
      { icone: '🧈', texto: 'Pode ser que a pele coce. Mantenha bem hidratada.' },
      { icone: '🤗', texto: 'Um abraço faz bem. Peça um abraço hoje.' },
    ],
  },
  20: {
    emoji: '🍌',
    tamanho: 'uma banana',
    peso: '~300g',
    comprimento: '~16 cm',
    marco: 'Metade do caminho! Eles engolem líquido e treinam a digestão.',
    frase: 'Eles estão do tamanho de uma banana.',
    carinho: 'Metade do caminho! Você é incrível. 🌟🌟',
    cuidados: [
      { icone: '🎉', texto: 'Metade da gravidez! Você está indo muito bem!' },
      { icone: '📸', texto: 'Momento perfeito pra uma foto da barriguinha.' },
      { icone: '💧', texto: 'Beba ainda mais água agora. Seus bebês estão crescendo rápido!' },
    ],
  },
  21: {
    emoji: '🥕',
    tamanho: 'uma cenoura',
    peso: '~360g',
    comprimento: '~27 cm',
    marco: 'Você pode começar a sentir eles se mexendo!',
    frase: 'Cada bebê está do tamanho de uma cenoura.',
    carinho: 'Sentiu um chutinho? São eles dizendo oi. 🤰',
    cuidados: [
      { icone: '🦶', texto: 'Se sentir eles se mexendo, é ótimo sinal!' },
      { icone: '🛋️', texto: 'Descanse com as pernas pra cima. Ajuda com inchaço.' },
    ],
  },
  22: {
    emoji: '🥥',
    tamanho: 'um coco',
    peso: '~430g',
    comprimento: '~28 cm',
    marco: 'Os olhinhos se formaram, mas ainda estão fechados.',
    frase: 'Eles estão do tamanho de um coco.',
    carinho: 'Os olhinhos deles já se formaram! 👀',
    cuidados: [
      { icone: '🧦', texto: 'Meias de compressão ajudam com as pernas cansadas.' },
      { icone: '🍉', texto: 'Frutas com água ajudam: melancia, melão, laranja.' },
    ],
  },
  23: {
    emoji: '🥭',
    tamanho: 'uma manga',
    peso: '~500g',
    comprimento: '~29 cm',
    marco: 'A pele está ficando mais rosadinha.',
    frase: 'Cada bebê está do tamanho de uma manga.',
    carinho: 'Eles estão ficando mais fofinhos. 🌷',
    cuidados: [
      { icone: '🏠', texto: 'Comece a pensar no quartinho. Sem pressa, com carinho.' },
      { icone: '🧘', texto: 'Alongamento suave ajuda com as dores nas costas.' },
    ],
  },
  24: {
    emoji: '🌽',
    tamanho: 'uma espiga de milho',
    peso: '~600g',
    comprimento: '~30 cm',
    marco: 'Eles já têm cílios e sobrancelhas!',
    frase: 'Eles estão do tamanho de uma espiga de milho.',
    carinho: 'Eles já têm cilios e sobrancelhas! 😍',
    cuidados: [
      { icone: '🩺', texto: 'Consulta importante agora. Teste de glicose pode ser pedido.' },
      { icone: '🍫', texto: 'Um docinho de vez em quando pode. Sem culpa!' },
    ],
  },
  25: {
    emoji: '🥒',
    tamanho: 'um pepino',
    peso: '~660g',
    comprimento: '~35 cm',
    marco: 'Eles respondem à sua voz e ao toque.',
    frase: 'Cada bebê está do tamanho de um pepino.',
    carinho: 'Eles respondem quando você fala. 🫶',
    cuidados: [
      { icone: '✋', texto: 'Passe a mão na barriga. Eles sentem seu carinho!' },
      { icone: '🛏️', texto: 'Almofada entre as pernas ajuda a dormir melhor.' },
    ],
  },
  26: {
    emoji: '🥦',
    tamanho: 'uma couve-flor',
    peso: '~760g',
    comprimento: '~36 cm',
    marco: 'Os olhinhos já abrem e fecham!',
    frase: 'Eles estão do tamanho de uma couve-flor.',
    carinho: 'Eles já abrem os olhinhos! ✨',
    cuidados: [
      { icone: '👶', texto: 'Comece a pensar na mala da maternidade.' },
      { icone: '💤', texto: 'Cochile durante o dia se puder. Você merece.' },
    ],
  },
  27: {
    emoji: '🥬',
    tamanho: 'um repolho',
    peso: '~875g',
    comprimento: '~37 cm',
    marco: 'O cérebro está crescendo muito rápido.',
    frase: 'Cada bebê está do tamanho de um repolho.',
    carinho: 'O cérebro deles está se desenvolvendo muito. 🧠💜',
    cuidados: [
      { icone: '🐟', texto: 'Ômega 3 é ótimo para o cérebro dos bebês. Peixes ajudam!' },
      { icone: '📝', texto: 'Escreva no diário o que está sentindo. Faz bem.' },
    ],
  },
  28: {
    emoji: '🍆',
    tamanho: 'uma berinjela',
    peso: '~1 kg',
    comprimento: '~38 cm',
    marco: 'Eles já sonham! O ciclo de sono está se formando.',
    frase: 'Eles estão do tamanho de uma berinjela.',
    carinho: 'Será que eles sonham com você? 🌙',
    cuidados: [
      { icone: '🎉', texto: 'Terceiro trimestre! Falta cada vez menos.' },
      { icone: '🩺', texto: 'As consultas vão ficar mais frequentes. Isso é bom!' },
      { icone: '🧳', texto: 'Hora de preparar a mala da maternidade!' },
    ],
  },
  29: {
    emoji: '🎃',
    tamanho: 'uma abóbora pequena',
    peso: '~1.1 kg',
    comprimento: '~39 cm',
    marco: 'Eles estão ganhando gordurinhas fofinhas.',
    frase: 'Cada bebê está do tamanho de uma abóbora pequena.',
    carinho: 'Estão ficando cada vez mais fofinhos. 🥰',
    cuidados: [
      { icone: '🍽️', texto: 'Coma em porções menores e mais vezes ao dia.' },
      { icone: '🚗', texto: 'Tenha tudo pronto para ir à maternidade.' },
    ],
  },
  30: {
    emoji: '🥒',
    tamanho: 'um pepino grande',
    peso: '~1.3 kg',
    comprimento: '~40 cm',
    marco: 'Eles já sabem a diferença entre claro e escuro.',
    frase: 'Eles estão do tamanho de um pepino grande.',
    carinho: 'Eles percebem a luz! 🌓',
    cuidados: [
      { icone: '🏥', texto: 'Conheça a maternidade onde vai ter os bebês.' },
      { icone: '🤱', texto: 'Pesquise sobre amamentação de gêmeos. É possível!' },
    ],
  },
  31: {
    emoji: '🥥',
    tamanho: 'um coco grande',
    peso: '~1.5 kg',
    comprimento: '~41 cm',
    marco: 'Os pulmões estão quase prontos.',
    frase: 'Cada bebê está do tamanho de um coco grande.',
    carinho: 'Falta pouquinho! 🌬️',
    cuidados: [
      { icone: '📋', texto: 'Revise o plano de parto com seu médico.' },
      { icone: '🛍️', texto: 'Confira se tem tudo: fraldas, roupinhas, cobertores.' },
    ],
  },
  32: {
    emoji: '🍍',
    tamanho: 'um abacaxi pequeno',
    peso: '~1.7 kg',
    comprimento: '~42 cm',
    marco: 'As unhinhas dos pés estão crescendo.',
    frase: 'Eles estão do tamanho de um abacaxi pequeno.',
    carinho: 'Cada dia conta. Vocês estão quase lá. 💕',
    cuidados: [
      { icone: '🧘', texto: 'Técnicas de respiração ajudam a ficar calma.' },
      { icone: '❤️', texto: 'Fique atenta aos movimentos dos bebês. Se mexer, tá tudo bem!' },
    ],
  },
  33: {
    emoji: '🍍',
    tamanho: 'um abacaxi',
    peso: '~1.9 kg',
    comprimento: '~43 cm',
    marco: 'Os ossos estão ficando mais duros, menos o crânio.',
    frase: 'Cada bebê está do tamanho de um abacaxi.',
    carinho: 'Eles estão quase prontos pra te conhecer. 🌟',
    cuidados: [
      { icone: '💤', texto: 'Durma bem. O descanso é importantíssimo agora.' },
      { icone: '📱', texto: 'Tenha o telefone do médico sempre à mão.' },
    ],
  },
  34: {
    emoji: '🍈',
    tamanho: 'um melão',
    peso: '~2.1 kg',
    comprimento: '~45 cm',
    marco: 'O sistema imunológico está ficando mais forte.',
    frase: 'Eles estão do tamanho de um melão.',
    carinho: 'O corpinho deles está cada vez mais pronto. 💪',
    cuidados: [
      { icone: '🧳', texto: 'Mala da maternidade pronta? Confira de novo!' },
      { icone: '🫂', texto: 'Peça ajuda para organizar a casa. Aceitar ajuda é sabedoria.' },
    ],
  },
  35: {
    emoji: '🍈',
    tamanho: 'um melão grande',
    peso: '~2.4 kg',
    comprimento: '~46 cm',
    marco: 'Os rins estão funcionando direitinho.',
    frase: 'Cada bebê está do tamanho de um melão grande.',
    carinho: 'Eles estão quase do tamanho que terão ao nascer! 🎀',
    cuidados: [
      { icone: '🩺', texto: 'Monitoramento pode ser mais frequente agora. Tudo normal!' },
      { icone: '😌', texto: 'Mantenha a calma. Você está preparada.' },
    ],
  },
  36: {
    emoji: '🍉',
    tamanho: 'uma melancia pequena',
    peso: '~2.6 kg',
    comprimento: '~47 cm',
    marco: 'Muitos gêmeos nascem nessa semana. E tá tudo bem!',
    frase: 'Eles estão do tamanho de uma melancia pequena.',
    carinho: 'A qualquer momento eles podem querer te conhecer! 🥹',
    cuidados: [
      { icone: '🏥', texto: 'Fique perto da maternidade. Pode ser a qualquer momento.' },
      { icone: '📞', texto: 'Combine com alguém para te levar à maternidade.' },
      { icone: '💕', texto: 'Você está pronta. Confie em você.' },
    ],
  },
  37: {
    emoji: '🍉',
    tamanho: 'uma melancia',
    peso: '~2.8 kg',
    comprimento: '~48 cm',
    marco: 'Eles estão em posição para nascer.',
    frase: 'Cada bebê está do tamanho de uma melancia.',
    carinho: 'Está quase na hora do grande encontro! 🌈',
    cuidados: [
      { icone: '✅', texto: 'Tudo pronto! Mala, documentos, carro.' },
      { icone: '🫶', texto: 'Você fez um trabalho incrível esses meses todos.' },
    ],
  },
  38: {
    emoji: '🍉',
    tamanho: 'uma melancia grande',
    peso: '~3 kg',
    comprimento: '~49 cm',
    marco: 'Eles estão prontos para nascer!',
    frase: 'Seus bebês estão do tamanho de uma melancia grande.',
    carinho: 'O grande dia está aqui. Você vai ser a melhor mãe do mundo. 💕💕',
    cuidados: [
      { icone: '🌟', texto: 'Você conseguiu! Está tudo pronto.' },
      { icone: '💝', texto: 'Logo logo você vai poder abraçar seus dois amores.' },
    ],
  },
}

/**
 * Retorna os dados da semana informada
 */
export function useSemanaData(semana) {
  const dados = computed(() => {
    const s = typeof semana === 'function' ? semana() : semana.value ?? semana
    const data = semanas[s]
    if (!data) return semanas[20]
    return {
      ...data,
      label: `Semana ${s}`,
      semana: s,
    }
  })

  return { dados }
}

/**
 * Retorna cuidados extras baseados no trimestre
 */
export function getCuidadosTrimestre(semana) {
  if (semana <= 13) {
    return {
      nome: '1º Trimestre',
      emoji: '🌱',
      cor: 'var(--color-nivel-inicio)',
      dicas: [
        'Tome ácido fólico todos os dias.',
        'É normal sentir muito sono e enjoo.',
        'Vá nas consultas. O médico cuida de vocês.',
      ],
    }
  }
  if (semana <= 27) {
    return {
      nome: '2º Trimestre',
      emoji: '🌸',
      cor: 'var(--color-nivel-meio)',
      dicas: [
        'Hidrate a pele da barriga.',
        'Converse com seus bebês. Eles ouvem!',
        'Coma bem e beba muita água.',
      ],
    }
  }
  return {
    nome: '3º Trimestre',
    emoji: '🌟',
    cor: 'var(--color-nivel-fim)',
    dicas: [
      'Prepare a mala da maternidade.',
      'Fique perto de quem pode te levar ao hospital.',
      'Descanse bastante. Falta pouquinho!',
    ],
  }
}

/**
 * Retorna as conquistas/marcos por semana
 */
export function getConquista(semana) {
  const conquistas = {
    8: { titulo: 'Primeiro Batimento', emoji: '💓', descricao: 'O coração dos bebês já bate!' },
    12: { titulo: 'Primeiro Trimestre', emoji: '🏅', descricao: 'Você completou 1/3 da jornada!' },
    16: { titulo: 'Crescendo Juntos', emoji: '🌱', descricao: 'Os bebês dobraram de tamanho!' },
    18: { titulo: 'Primeiros Sons', emoji: '🎵', descricao: 'Eles já ouvem sua voz!' },
    20: { titulo: 'Metade do Caminho', emoji: '⭐', descricao: 'Você chegou na metade! Incrível!' },
    24: { titulo: 'Olhinhos Abertos', emoji: '👀', descricao: 'Eles já abrem os olhinhos!' },
    28: { titulo: 'Terceiro Trimestre', emoji: '🏆', descricao: 'A reta final começou!' },
    32: { titulo: 'Quase Lá', emoji: '🎉', descricao: 'Falta pouquinho pra conhecer eles!' },
    36: { titulo: 'Prontos', emoji: '🌈', descricao: 'Eles podem nascer a qualquer momento!' },
    38: { titulo: 'O Grande Dia', emoji: '💕', descricao: 'Seus bebês estão prontos pra te conhecer!' },
  }
  return conquistas[semana] || null
}

export { semanas }
