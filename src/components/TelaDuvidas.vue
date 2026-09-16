<template>
  <div class="tela-cuidados">
    <!-- Cabeçalho -->
    <div class="tela-header">
      <h1 class="tela-titulo">Cuidados 🌿</h1>
      <BotaoOuvir :texto-para-ler="textoParaLer" />
    </div>

    <!-- Card do trimestre -->
    <div class="trimestre-card glass" :class="'tri-card-' + trimestre">
      <span class="tri-emoji">{{ trimestreInfo.emoji }}</span>
      <div class="tri-textos">
        <strong>{{ trimestreInfo.nome }}</strong>
        <small>Dicas especiais para esse momento</small>
      </div>
    </div>

    <!-- Dicas do trimestre -->
    <div class="secao">
      <h2 class="secao-titulo">Dicas gerais do {{ trimestreInfo.nome.toLowerCase() }} 💡</h2>
      <div class="dicas-lista">
        <motion.div
          v-for="(dica, index) in trimestreInfo.dicas"
          :key="'tri-' + trimestre + '-' + index"
          class="dica-card glass"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: index * 0.1 }"
        >
          <span class="dica-icone">{{ dicaIcones[index] || '💡' }}</span>
          <p class="dica-texto">{{ dica }}</p>
        </motion.div>
      </div>
    </div>

    <!-- Perguntas comuns -->
    <div class="secao">
      <h2 class="secao-titulo">Perguntas comuns 💬</h2>
      <p class="secao-sub">Toque para ver a resposta</p>

      <div class="perguntas-lista">
        <motion.div
          v-for="(pergunta, index) in perguntasFiltradas"
          :key="pergunta.id"
          class="pergunta-card glass"
          :class="{ 'pergunta-aberta': pergunta.aberto, ['pergunta-cor-' + (index % 3)]: true }"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: index * 0.08 }"
          @click="togglePergunta(pergunta.id)"
        >
          <div class="pergunta-header">
            <span class="pergunta-icone">{{ pergunta.icone }}</span>
            <span class="pergunta-texto">{{ pergunta.pergunta }}</span>
            <span class="pergunta-seta" :class="{ 'seta-aberta': pergunta.aberto }">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>

          <Transition name="resposta">
            <div v-if="pergunta.aberto" class="pergunta-resposta">
              <p>{{ pergunta.resposta }}</p>
              <span class="resposta-emoji">{{ pergunta.respostaEmoji }}</span>
            </div>
          </Transition>
        </motion.div>
      </div>
    </div>

    <!-- Acolhimento -->
    <motion.div
      class="acolhimento glass"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 0.5 }"
    >
      <span class="acolhimento-emoji">🫶</span>
      <p class="acolhimento-texto">Se algo te preocupa, fale com seu médico. Ele está ali pra te ajudar e cuidar de vocês.</p>
    </motion.div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { motion } from 'motion-v'
import { useGemelar } from '../composables/useGemelar.js'
import { getCuidadosTrimestre } from '../composables/useSemanaData.js'
import BotaoOuvir from './BotaoOuvir.vue'

const { state, trimestre, addXp } = useGemelar()

const trimestreInfo = computed(() => getCuidadosTrimestre(state.currentWeek))

const dicaIcones = ['🌱', '💧', '🏥']

// Perguntas organizadas por trimestre — linguagem muito simples
const todasPerguntas = reactive([
  // Geral
  {
    id: 1, icone: '👶👶', trimestres: [1, 2, 3],
    pergunta: 'Meus bebês vão nascer antes?',
    resposta: 'Muitos gêmeos chegam um pouquinho mais cedo, e isso é normal. Seu médico vai cuidar de tudo.',
    respostaEmoji: '💛', aberto: false,
  },
  {
    id: 2, icone: '😴', trimestres: [1, 2, 3],
    pergunta: 'É normal sentir tanto sono?',
    resposta: 'Sim! Seu corpo está fazendo dois bebês. Descanse sempre que puder. Você merece.',
    respostaEmoji: '💤', aberto: false,
  },
  {
    id: 3, icone: '💕', trimestres: [1, 2, 3],
    pergunta: 'Vou conseguir cuidar dos dois?',
    resposta: 'Vai sim! O amor não se divide, ele se multiplica. E você pode pedir ajuda.',
    respostaEmoji: '✨', aberto: false,
  },
  // 1º trimestre
  {
    id: 4, icone: '🤢', trimestres: [1],
    pergunta: 'O enjoo vai passar?',
    resposta: 'Geralmente melhora depois da semana 12. Coma pouco e várias vezes ao dia.',
    respostaEmoji: '🌸', aberto: false,
  },
  {
    id: 5, icone: '💊', trimestres: [1],
    pergunta: 'O que é ácido fólico?',
    resposta: 'É uma vitamina que ajuda os bebês a se formarem. Tome todo dia. O médico vai receitar.',
    respostaEmoji: '💚', aberto: false,
  },
  // 2º trimestre
  {
    id: 6, icone: '🤰', trimestres: [2],
    pergunta: 'Minha barriga vai ficar muito grande?',
    resposta: 'Vai ficar linda! São dois amores ali dentro. Cada centímetro é amor.',
    respostaEmoji: '🥰', aberto: false,
  },
  {
    id: 7, icone: '🍽️', trimestres: [2],
    pergunta: 'Preciso comer por três?',
    resposta: 'Não precisa. Coma com carinho e atenção. O que faz bem pra você faz bem pros bebês.',
    respostaEmoji: '🥗', aberto: false,
  },
  {
    id: 8, icone: '🦶', trimestres: [2],
    pergunta: 'Quando vou sentir eles se mexendo?',
    resposta: 'Geralmente entre a semana 18 e 22. Parece uma borboleta na barriga!',
    respostaEmoji: '🦋', aberto: false,
  },
  // 3º trimestre
  {
    id: 9, icone: '🏥', trimestres: [3],
    pergunta: 'Preciso ir mais ao médico agora?',
    resposta: 'Sim, as consultas ficam mais frequentes. Isso é ótimo! Mais cuidado com vocês.',
    respostaEmoji: '🩺', aberto: false,
  },
  {
    id: 10, icone: '🧳', trimestres: [3],
    pergunta: 'O que levo na mala da maternidade?',
    resposta: 'Roupinhas pros bebês, suas coisas pessoais, documentos e o cartão do pré-natal.',
    respostaEmoji: '👶', aberto: false,
  },
  {
    id: 11, icone: '🤱', trimestres: [3],
    pergunta: 'Dá pra amamentar os dois?',
    resposta: 'Sim! Muitas mães de gêmeos amamentam. Peça ajuda na maternidade.',
    respostaEmoji: '💕', aberto: false,
  },
])

const perguntasFiltradas = computed(() => {
  return todasPerguntas.filter(p => p.trimestres.includes(trimestre.value))
})

const textoParaLer = computed(() => {
  return `Cuidados do ${trimestreInfo.value.nome}. Aqui você encontra dicas e respostas para suas dúvidas. Toque nas perguntas para ver as respostas.`
})

function togglePergunta(id) {
  const p = todasPerguntas.find(p => p.id === id)
  if (p) {
    p.aberto = !p.aberto
    if (p.aberto) addXp(5)
  }
}
</script>

<style scoped>
.tela-cuidados {
  padding: 20px 16px 110px 16px;
  min-height: 100dvh;
}

.tela-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-top: 8px;
}

.tela-titulo {
  font-size: 1.4rem;
  color: var(--color-texto);
  margin: 0;
}

/* ── Trimestre card ── */
.trimestre-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
}
.tri-card-1 { border-left: 4px solid var(--color-roxo-medio); }
.tri-card-2 { border-left: 4px solid var(--color-azul-medio); }
.tri-card-3 { border-left: 4px solid var(--color-agua-medio); }
.tri-emoji { font-size: 2rem; }
.tri-textos strong { display: block; font-size: 1.1rem; color: var(--color-texto); }
.tri-textos small { font-size: 0.9rem; color: var(--color-texto-claro); }

/* ── Seções ── */
.secao {
  margin-bottom: 28px;
}
.secao-titulo {
  font-size: 1.1rem;
  color: var(--color-texto);
  margin: 0 0 8px 0;
}
.secao-sub {
  font-size: 0.9rem;
  color: var(--color-texto-claro);
  margin: 0 0 14px 0;
}

/* ── Dicas ── */
.dicas-lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.dica-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: var(--radius-lg);
}
.dica-icone { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
.dica-texto {
  font-size: 0.95rem;
  color: var(--color-texto);
  margin: 0;
  line-height: 1.5;
}

/* ── Perguntas ── */
.perguntas-lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pergunta-card {
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  overflow: hidden;
}
.pergunta-card:active { transform: scale(0.98); }
.pergunta-aberta { box-shadow: var(--shadow-media); }

.pergunta-cor-0 { border-left: 4px solid var(--color-roxo-medio); }
.pergunta-cor-1 { border-left: 4px solid var(--color-azul-medio); }
.pergunta-cor-2 { border-left: 4px solid var(--color-agua-medio); }

.pergunta-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 16px;
}
.pergunta-icone { font-size: 1.4rem; flex-shrink: 0; }
.pergunta-texto {
  flex: 1;
  font-family: var(--font-titulo);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-texto);
}
.pergunta-seta {
  flex-shrink: 0;
  color: var(--color-texto-claro);
  transition: transform 0.3s ease;
  display: flex;
}
.seta-aberta { transform: rotate(180deg); }

.pergunta-resposta {
  padding: 0 16px 18px 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.pergunta-resposta p {
  font-size: 0.95rem;
  color: var(--color-texto);
  line-height: 1.6;
  margin: 0;
  opacity: 0.85;
}
.resposta-emoji { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }

/* Transição resposta */
.resposta-enter-active { transition: all 0.3s ease; }
.resposta-leave-active { transition: all 0.2s ease; }
.resposta-enter-from { opacity: 0; transform: translateY(-8px); }
.resposta-leave-to { opacity: 0; }

/* ── Acolhimento ── */
.acolhimento {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border-radius: var(--radius-lg);
}
.acolhimento-emoji { font-size: 1.5rem; flex-shrink: 0; }
.acolhimento-texto {
  font-size: 0.9rem;
  color: var(--color-texto);
  margin: 0;
  line-height: 1.5;
  opacity: 0.75;
}
</style>
