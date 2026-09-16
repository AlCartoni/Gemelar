<template>
  <div class="tela-semanas">
    <div class="tela-header">
      <!-- Mundinho girando com o par -->
      <div class="mundinho-girando">
        <div class="orbita">
          <div class="astro astro-1">{{ parAtual.emoji1 }}</div>
          <div class="astro astro-2">{{ parAtual.emoji2 }}</div>
        </div>
        <div class="mundo-centro">🌍</div>
      </div>
      
      <div class="botoes-topo">
        <BotaoOuvir :texto-para-ler="textoCompleto" />
        <button class="btn-config glass" @click="refazerOnboarding" aria-label="Ajustar Nomes ou Par">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.8.97 1.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Saudação da mamãe -->
    <div class="saudacao-area glass">
      <p class="saudacao-texto">
        Olá, <strong>{{ state.motherName || 'mamãe' }}</strong>. 💕
      </p>
      <p class="saudacao-sub">Seus bebês estão crescendo.</p>
    </div>

    <!-- Visual de crescimento dual -->
    <div class="crescimento-area">
      <!-- Indicador de semana (sutil, só a palavra) -->
      <motion.div
        :key="'semana-label-' + semanaAtual"
        class="semana-label"
        :initial="{ opacity: 0, y: -10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4 }"
      >
        <span class="semana-badge glass">{{ dadosSemana.label }}</span>
      </motion.div>

      <!-- Dois círculos lado a lado -->
      <div class="circulos-container">
        <!-- Círculo A (Elemento 1 do par) -->
        <motion.div
          :key="'circuloA-' + semanaAtual"
          class="circulo-wrapper"
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 180, damping: 18, delay: 0.1 }"
        >
          <div
            class="circulo circulo-a"
            :style="{ background: gradienteA }"
          >
            <span class="circulo-emoji" :style="{ fontSize: emojiSize }">{{ dadosSemana.emoji }}</span>
          </div>
          <span class="circulo-nome">{{ nomeElemento1 }}</span>
        </motion.div>

        <!-- Conexão animada entre os dois -->
        <div class="conexao-semanas">
          <svg viewBox="0 0 40 20" width="32" height="16">
            <path d="M4 10 Q12 2 20 10 Q28 18 36 10" stroke="var(--color-rosa-suave)" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>
          </svg>
        </div>

        <!-- Círculo B (Elemento 2 do par) -->
        <motion.div
          :key="'circuloB-' + semanaAtual"
          class="circulo-wrapper"
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 180, damping: 18, delay: 0.25 }"
        >
          <div
            class="circulo circulo-b"
            :style="{ background: gradienteB }"
          >
            <span class="circulo-emoji" :style="{ fontSize: emojiSize }">{{ dadosSemana.emoji }}</span>
          </div>
          <span class="circulo-nome">{{ nomeElemento2 }}</span>
        </motion.div>
      </div>

      <!-- Frase afetiva -->
      <motion.div
        :key="'frase-' + semanaAtual"
        class="frase-area"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.4, duration: 0.6 }"
      >
        <p class="frase-principal">{{ frasePersonalizada }}</p>
        <p class="frase-dual">{{ fraseDual }}</p>
      </motion.div>

      <!-- Frase de carinho extra -->
      <motion.p
        :key="'carinho-' + semanaAtual"
        class="frase-carinho"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.7 }"
      >
        {{ dadosSemana.carinho }}
      </motion.p>
    </div>

    <!-- Trilha visual com pontinhos duplos -->
    <div class="trilha-visual">
      <div class="trilha-linha"></div>
      <div
        class="trilha-indicador"
        :style="{ left: trilhaPercent + '%' }"
      >
        <span class="trilha-dot dot-a" :style="{ background: corA }"></span>
        <span class="trilha-dot dot-b" :style="{ background: corB }"></span>
      </div>
    </div>

    <!-- Navegação entre semanas -->
    <div class="nav-semanas">
      <motion.button
        class="nav-btn glass"
        :whilePress="{ scale: 0.92 }"
        @click="semanaAnterior"
        :disabled="semanaAtual <= 4"
        aria-label="Semana anterior"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="nav-btn-label">Anterior</span>
      </motion.button>

      <motion.button
        class="nav-btn glass"
        :whilePress="{ scale: 0.92 }"
        @click="proximaSemana"
        :disabled="semanaAtual >= 32"
        aria-label="Próxima semana"
      >
        <span class="nav-btn-label">Próxima</span>
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </motion.button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { motion } from 'motion-v'
import { useGemelar } from '../composables/useGemelar.js'
import BotaoOuvir from './BotaoOuvir.vue'

const { state, getPairColors } = useGemelar()

const semanaAtual = computed({
  get: () => state.currentWeek,
  set: (val) => { state.currentWeek = val },
})

// ── Dados das semanas ──
const semanas = {
  4:  { emoji: '🌱', objeto: 'semente de papoula', plural: 'Duas sementes de papoula', genero: 'f', frase: 'Cada um dos seus bebês é do tamanho de uma sementinha.', carinho: 'Tudo começa pequeno. E lindo. 💛' },
  5:  { emoji: '🌾', objeto: 'semente de gergelim', plural: 'Duas sementes de gergelim', genero: 'f', frase: 'Seus bebês são como grãozinhos de gergelim.', carinho: 'Pequeninhos, mas já cheios de vida. ✨' },
  6:  { emoji: '🫘', objeto: 'grão de lentilha', plural: 'Dois grãozinhos de lentilha', genero: 'm', frase: 'Cada bebê está do tamanho de uma lentilha.', carinho: 'O coraçãozinho deles já está se formando. 💕' },
  7:  { emoji: '🫐', objeto: 'amora', plural: 'Duas amoras', genero: 'f', frase: 'Seus bebês estão do tamanho de uma amora.', carinho: 'Doces e perfeitos, como você. 🥰' },
  8:  { emoji: '🫘', objeto: 'feijão', plural: 'Dois feijõezinhos', genero: 'm', frase: 'Cada bebê está do tamanho de um feijão.', carinho: 'Eles já começam a se mexer! 💫' },
  9:  { emoji: '🍇', objeto: 'uva', plural: 'Duas uvas', genero: 'f', frase: 'Seus bebês estão do tamanho de uma uva.', carinho: 'Você está fazendo um trabalho incrível. 🌸' },
  10: { emoji: '🫒', objeto: 'azeitona', plural: 'Duas azeitonas', genero: 'f', frase: 'Cada bebê está do tamanho de uma azeitona.', carinho: 'Os dedinhos deles já estão se formando. 🤏' },
  11: { emoji: '🍈', objeto: 'figo', plural: 'Dois figos', genero: 'm', frase: 'Seus bebês estão do tamanho de um figo.', carinho: 'Eles já conseguem engolir! Que fofos. 💜' },
  12: { emoji: '🍋‍🟩', objeto: 'lima', plural: 'Duas limas', genero: 'f', frase: 'Cada bebê está do tamanho de uma lima.', carinho: 'Os reflexos deles estão aparecendo. ✨' },
  13: { emoji: '🫛', objeto: 'ervilha torta', plural: 'Duas ervilhas tortas', genero: 'f', frase: 'Seus bebês estão do tamanho de uma ervilha torta.', carinho: 'As impressões digitais deles já são únicas. 🌟' },
  14: { emoji: '🍋', objeto: 'limão-siciliano', plural: 'Dois limões-sicilianos', genero: 'm', frase: 'Cada bebê está do tamanho de um limão-siciliano.', carinho: 'Eles já fazem caretinhas! 😊' },
  15: { emoji: '🍎', objeto: 'maçã', plural: 'Duas maçãs', genero: 'f', frase: 'Seus bebês estão do tamanho de uma maçã.', carinho: 'Você é a casa mais quentinha do mundo. 🏠💕' },
  16: { emoji: '🥑', objeto: 'abacate', plural: 'Dois abacates', genero: 'm', frase: 'Cada bebê está do tamanho de um abacate.', carinho: 'As perninhas deles já são maiores que os braços! 🦵' },
  17: { emoji: '🍑', objeto: 'romã', plural: 'Duas romãs', genero: 'f', frase: 'Seus bebês estão do tamanho de uma romã.', carinho: 'O esqueleto deles está ficando mais forte. 💪' },
  18: { emoji: '🍑', objeto: 'mamão-papaia', plural: 'Dois mamões', genero: 'm', frase: 'Cada bebê está do tamanho de um mamão-papaia.', carinho: 'Eles já ouvem sua voz! Converse com eles. 🗣️💛' },
  19: { emoji: '🍊', objeto: 'toranja', plural: 'Duas toranjas', genero: 'f', frase: 'Seus bebês estão do tamanho de uma toranja.', carinho: 'Os sentidos deles estão se desenvolvendo. 🌈' },
  20: { emoji: '🍌', objeto: 'banana', plural: 'Duas bananas', genero: 'f', frase: 'Cada bebê está do tamanho de uma banana.', carinho: 'Metade do caminho! Você é incrível. 🌟🌟' },
  21: { emoji: '🥕', objeto: 'cenoura', plural: 'Duas cenouras', genero: 'f', frase: 'Seus bebês estão do tamanho de uma cenoura.', carinho: 'Eles já fazem movimentos que você pode sentir. 🤰' },
  22: { emoji: '🎃', objeto: 'abóbora pequena', plural: 'Duas abóboras', genero: 'f', frase: 'Cada bebê está do tamanho de uma abóbora pequena.', carinho: 'Os olhinhos deles já se formaram! 👀' },
  23: { emoji: '🥭', objeto: 'manga', plural: 'Duas mangas', genero: 'f', frase: 'Seus bebês estão do tamanho de uma manga.', carinho: 'A pele deles está ficando mais rosadinha. 🌷' },
  24: { emoji: '🍈', objeto: 'melão', plural: 'Dois melões', genero: 'm', frase: 'Cada bebê está do tamanho de um melão.', carinho: 'Eles já têm cílios e sobrancelhas! 😍' },
  25: { emoji: '🥒', objeto: 'pepino', plural: 'Dois pepinos', genero: 'm', frase: 'Seus bebês estão do tamanho de um pepino.', carinho: 'Eles respondem à sua voz e ao toque. 🫶' },
  26: { emoji: '🥦', objeto: 'couve-flor', plural: 'Duas couves-flores', genero: 'f', frase: 'Cada bebê está do tamanho de uma couve-flor.', carinho: 'Os olhinhos deles já abrem e fecham! ✨' },
  27: { emoji: '🥬', objeto: 'alface', plural: 'Duas alfaces', genero: 'f', frase: 'Seus bebês estão do tamanho de uma alface.', carinho: 'O cérebro deles está crescendo muito rápido. 🧠💜' },
  28: { emoji: '🍆', objeto: 'berinjela', plural: 'Duas berinjelas', genero: 'f', frase: 'Cada bebê está do tamanho de uma berinjela.', carinho: 'Eles já sonham! Será que sonham com você? 🌙' },
  29: { emoji: '🎃', objeto: 'abóbora japonesa', plural: 'Duas abóboras japonesas', genero: 'f', frase: 'Seus bebês estão do tamanho de uma abóbora japonesa.', carinho: 'Eles estão ganhando gordurinhas fofinhas. 🥰' },
  30: { emoji: '🥒', objeto: 'pepino grande', plural: 'Dois pepinos grandes', genero: 'm', frase: 'Cada bebê está do tamanho de um pepino grande.', carinho: 'Eles já sabem a diferença entre claro e escuro! 🌓' },
  31: { emoji: '🥬', objeto: 'repolho', plural: 'Dois repolhos', genero: 'm', frase: 'Seus bebês estão do tamanho de um repolho.', carinho: 'Os pulmões deles estão quase prontos. Falta pouquinho! 🌬️' },
  32: { emoji: '🎃', objeto: 'abóbora', plural: 'Duas abóboras', genero: 'f', frase: 'Cada bebê está do tamanho de uma abóbora.', carinho: 'Seus bebês estão quase prontos pra te conhecer. 💕💕' },
}

const dadosSemana = computed(() => {
  const dados = semanas[semanaAtual.value]
  if (!dados) return semanas[20] // fallback
  return {
    ...dados,
    label: `Semana ${semanaAtual.value}`,
  }
})

// ── Cores e nomes do par selecionado ──
const pairConfig = {
  'lua-sol': {
    nome1: 'Lua', nome2: 'Sol',
    corA: 'var(--color-lua)', corB: 'var(--color-sol)',
    gradA: 'linear-gradient(135deg, var(--color-lua-claro) 0%, var(--color-lua-medio) 100%)',
    gradB: 'linear-gradient(135deg, var(--color-sol-claro) 0%, var(--color-sol-medio) 100%)',
    rawA: '#C5AEEA', rawB: '#FFE08A',
  },
  'agua-fogo': {
    nome1: 'Água', nome2: 'Fogo',
    corA: 'var(--color-agua)', corB: 'var(--color-fogo)',
    gradA: 'linear-gradient(135deg, var(--color-agua-claro) 0%, var(--color-agua-medio) 100%)',
    gradB: 'linear-gradient(135deg, var(--color-fogo-claro) 0%, var(--color-fogo-medio) 100%)',
    rawA: '#A0DDD6', rawB: '#FFB88A',
  },
  'terra-ar': {
    nome1: 'Terra', nome2: 'Ar',
    corA: 'var(--color-terra)', corB: 'var(--color-ar)',
    gradA: 'linear-gradient(135deg, var(--color-terra-claro) 0%, var(--color-terra-medio) 100%)',
    gradB: 'linear-gradient(135deg, var(--color-ar-claro) 0%, var(--color-ar-medio) 100%)',
    rawA: '#AED49A', rawB: '#A8E0EE',
  },
}

const parAtual = computed(() => getPairColors())
const nomeElemento1 = computed(() => parAtual.value.name1)
const nomeElemento2 = computed(() => parAtual.value.name2)
const gradienteA = computed(() => parAtual.value.bgFrom)
const gradienteB = computed(() => parAtual.value.bgTo)
const corA = computed(() => parAtual.value.primary)
const corB = computed(() => parAtual.value.secondary)

// Frase principal usando os nomes escolhidos
const frasePersonalizada = computed(() => {
  const dados = dadosSemana.value
  let sujeitos = 'Cada bebê'
  
  if (state.chosenBabyNames && state.chosenBabyNames.length === 2) {
    sujeitos = `${state.chosenBabyNames[0]} e ${state.chosenBabyNames[1]}`
    return `${sujeitos} estão do tamanho de uma ${dados.objeto}.`
  }
  
  if (state.babyGenders === 'boys') sujeitos = 'Cada menino'
  else if (state.babyGenders === 'girls') sujeitos = 'Cada menina'

  return `${sujeitos} está do tamanho de um(a) ${dados.objeto}.`
})

// Tamanho do emoji baseado na semana (cresce conforme avança)
const emojiSize = computed(() => {
  const min = 2.2  // rem na semana 4
  const max = 4.0  // rem na semana 32
  const progress = (semanaAtual.value - 4) / (32 - 4)
  return (min + (max - min) * progress).toFixed(1) + 'rem'
})

// Frase dual baseada no tema
const fraseDual = computed(() => {
  const dados = dadosSemana.value
  const par = parAtual.value
  return `${dados.plural}, crescendo como ${par.name1} e ${par.name2}. ${par.emoji1}${par.emoji2}`
})

// Trilha visual
const trilhaPercent = computed(() => {
  return ((semanaAtual.value - 4) / (32 - 4)) * 100
})

// Texto completo para leitura
const textoCompleto = computed(() => {
  const nome = state.motherName ? `Olá, ${state.motherName}. ` : ''
  const dados = dadosSemana.value
  return `${nome}Crescendo juntos. ${dados.frase} ${fraseDual.value} ${dados.carinho}`
})

// ── Ações ──
function refazerOnboarding() {
  state.onboardingCompleted = false
}

function semanaAnterior() {
  if (semanaAtual.value > 4) {
    semanaAtual.value--
  }
}

function proximaSemana() {
  if (semanaAtual.value < 32) {
    semanaAtual.value++
  }
}
</script>

<style scoped>
.tela-semanas {
  padding: 20px 16px 100px 16px;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.tela-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}

.botoes-topo {
  display: flex;
  gap: 12px;
}

.btn-config {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-texto-claro);
  transition: all 0.3s ease;
}
.btn-config:active { transform: scale(0.9); }

/* ── Mundinho Girando ── */
.mundinho-girando {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mundo-centro {
  font-size: 2.2rem;
  z-index: 2;
  animation: pulsar-suave 4s infinite;
}
.orbita {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: girar 10s linear infinite;
}
.astro {
  position: absolute;
  font-size: 1.4rem;
  animation: counter-girar 10s linear infinite; /* Para o emoji não ficar de cabeça pra baixo */
}
.astro-1 { top: -10px; left: 50%; transform: translateX(-50%); }
.astro-2 { bottom: -10px; left: 50%; transform: translateX(-50%); }

@keyframes girar { 100% { transform: rotate(360deg); } }
@keyframes counter-girar { 100% { transform: rotate(-360deg); } }

/* ── Saudação ── */
.saudacao-area {
  padding: 16px 20px;
  border-radius: var(--radius-xl);
  margin-bottom: 24px;
  text-align: center;
}

.saudacao-texto {
  font-family: var(--font-titulo);
  font-size: 1.05rem;
  color: var(--color-texto);
  margin: 0 0 2px 0;
}

.saudacao-sub {
  font-size: 0.9rem;
  color: var(--color-texto-claro);
  margin: 0;
}

.nome-editar {
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: transparent;
  color: var(--color-texto-claro);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  padding: 0;
}

/* ── Área de crescimento ── */
.crescimento-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px 0;
}

.semana-label {
  text-align: center;
}

.semana-badge {
  display: inline-block;
  padding: 6px 20px;
  border-radius: var(--radius-full);
  font-family: var(--font-titulo);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-texto-claro);
}

/* ── Círculos duais ── */
.circulos-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
}

.circulo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.circulo {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-suave);
  animation: respirar 4s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

.circulo::after {
  content: '';
  position: absolute;
  top: 12%;
  left: 18%;
  width: 30%;
  height: 20%;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  filter: blur(4px);
}

.circulo-a {
  animation-delay: 0s;
}

.circulo-b {
  animation-delay: 2s;
}

.circulo-emoji {
  z-index: 1;
  animation: balanco-suave 5s ease-in-out infinite;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.circulo-nome {
  font-family: var(--font-titulo);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-texto-claro);
}

.conexao-semanas {
  margin: 0 -4px;
  animation: pulsar-suave 3s ease-in-out infinite;
  align-self: center;
  margin-bottom: 20px;
}

@keyframes respirar {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

@keyframes balanco-suave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}

/* ── Frases ── */
.frase-area {
  text-align: center;
  max-width: 320px;
  padding: 0 8px;
}

.frase-principal {
  font-family: var(--font-titulo);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-texto);
  line-height: 1.5;
  margin: 0 0 6px 0;
}

.frase-dual {
  font-family: var(--font-corpo);
  font-size: 0.95rem;
  color: var(--color-texto-claro);
  line-height: 1.4;
  margin: 0;
}

.frase-carinho {
  font-family: var(--font-corpo);
  font-size: 0.9rem;
  color: var(--color-texto);
  text-align: center;
  opacity: 0.7;
  font-style: italic;
  margin: 4px 0 0 0;
  max-width: 280px;
}

/* ── Trilha visual ── */
.trilha-visual {
  position: relative;
  height: 20px;
  margin: 12px 24px 8px 24px;
}

.trilha-linha {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-roxo-claro);
  border-radius: var(--radius-full);
  transform: translateY(-50%);
}

.trilha-indicador {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 4px;
  transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.trilha-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease;
}

/* ── Navegação de semanas ── */
.nav-semanas {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 0 8px;
  margin-top: 8px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: var(--radius-xl);
  color: var(--color-texto);
  font-family: var(--font-titulo);
  font-size: 1rem;
  font-weight: 600;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  box-shadow: var(--shadow-suave);
}

.nav-btn:disabled {
  opacity: 0.25;
  pointer-events: none;
}

.nav-btn:active:not(:disabled) {
  box-shadow: none;
}

.nav-btn-label {
  font-size: 0.95rem;
}

/* ── Responsivo ── */
@media (max-width: 360px) {
  .circulo {
    width: 105px;
    height: 105px;
  }

  .nav-btn {
    padding: 12px 18px;
    font-size: 0.9rem;
  }

  .frase-principal {
    font-size: 1rem;
  }
}
</style>
