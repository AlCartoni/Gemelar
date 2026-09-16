<template>
  <div class="onboarding-container">
    <!-- Partículas decorativas -->
    <div class="particulas">
      <span v-for="i in 6" :key="i" class="particula" :style="particulaStyle(i)"></span>
    </div>

    <!-- Voltar -->
    <button
      v-if="passo > 1"
      class="btn-voltar glass"
      @click="passo--"
      aria-label="Voltar"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Indicador de passos -->
    <div class="passos-indicador">
      <span
        v-for="i in 4"
        :key="i"
        class="passo-dot"
        :class="{ 'dot-ativo': i <= passo, 'dot-atual': i === passo }"
      ></span>
    </div>

    <BotaoOuvir class="btn-ouvir-onb" :texto-para-ler="textoFala" />

    <Transition name="fade-slide" mode="out-in">
      <!-- PASSO 1: NOME DA MÃE -->
      <div v-if="passo === 1" key="passo1" class="passo passo-centralizado">
        <div class="passo-emoji-grande">🤰</div>
        <h1 class="passo-titulo">Como é seu nome?</h1>
        <p class="passo-sub">A gente quer te chamar pelo nome.</p>

        <div class="input-area glass">
          <span class="input-icone">🌸</span>
          <input
            v-model="nomeMaeTemp"
            class="nome-input"
            placeholder="Seu nome"
            maxlength="20"
            @keyup.enter="avancarNome"
            autocomplete="given-name"
          />
        </div>

        <motion.button
          class="btn-avancar"
          :class="{ disabled: !nomeMaeTemp.trim() }"
          :disabled="!nomeMaeTemp.trim()"
          @click="avancarNome"
          :whileTap="{ scale: 0.95 }"
        >
          Continuar ✨
        </motion.button>
      </div>

      <!-- PASSO 2: TIPO DE GESTAÇÃO -->
      <div v-else-if="passo === 2" key="passo2" class="passo passo-centralizado">
        <div class="passo-emoji-grande">👶👶</div>
        <h1 class="passo-titulo">Seus bebês são...</h1>
        <p class="passo-sub">Se não souber, sem problema!</p>

        <div class="opcoes-grid">
          <motion.button
            v-for="tipo in tiposGestacao"
            :key="tipo.id"
            class="opcao-card glass"
            :class="{ 'opcao-card-ativa': gestacaoTemp === tipo.id }"
            @click="escolherGestacao(tipo.id)"
            :whileTap="{ scale: 0.95 }"
          >
            <div class="opcao-emoji">{{ tipo.emoji }}</div>
            <div class="opcao-textos">
              <strong>{{ tipo.label }}</strong>
              <small>{{ tipo.descricao }}</small>
            </div>
          </motion.button>
        </div>
      </div>

      <!-- PASSO 3: SEMANA ATUAL -->
      <div v-else-if="passo === 3" key="passo3" class="passo passo-centralizado">
        <div class="passo-emoji-grande">📅</div>
        <h1 class="passo-titulo">Em que semana você está?</h1>
        <p class="passo-sub">Seu médico te falou a semana da gravidez.</p>

        <div class="semana-selector">
          <div class="semana-display glass">
            <span class="semana-numero">{{ semanaTemp }}</span>
            <span class="semana-texto">semanas</span>
          </div>

          <input
            type="range"
            v-model.number="semanaTemp"
            min="4"
            max="38"
            step="1"
            class="semana-slider"
          />

          <div class="semana-range-labels">
            <span>4</span>
            <span>Semanas</span>
            <span>38</span>
          </div>
        </div>

        <motion.button
          class="btn-avancar"
          @click="avancarSemana"
          :whileTap="{ scale: 0.95 }"
        >
          Continuar ✨
        </motion.button>
      </div>

      <!-- PASSO 4: DPP -->
      <div v-else-if="passo === 4" key="passo4" class="passo passo-centralizado">
        <div class="passo-emoji-grande">🗓️</div>
        <h1 class="passo-titulo">Quando os bebês devem nascer?</h1>
        <p class="passo-sub">A data que o médico falou. Se não souber, pode pular.</p>

        <div class="dpp-area">
          <div class="input-area glass">
            <span class="input-icone">📆</span>
            <input
              type="date"
              v-model="dppTemp"
              class="dpp-input"
              :min="dppMinDate"
            />
          </div>

          <div v-if="dppTemp" class="dpp-preview glass">
            <span class="dpp-emoji">⏳</span>
            <span class="dpp-texto">Faltam aproximadamente <strong>{{ diasRestantes }}</strong> dias!</span>
          </div>
        </div>

        <div class="botoes-finais">
          <motion.button
            class="btn-concluir"
            @click="concluirOnboarding"
            :whileTap="{ scale: 0.95 }"
          >
            Tudo pronto! 💕
          </motion.button>

          <button
            v-if="!dppTemp"
            class="btn-pular"
            @click="concluirOnboarding"
          >
            Pular por agora
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { useGemelar } from '../composables/useGemelar.js'
import BotaoOuvir from './BotaoOuvir.vue'

const { state, addXp } = useGemelar()

const passo = ref(1)

// ── Passo 1: Nome ──
const nomeMaeTemp = ref(state.motherName || '')
function avancarNome() {
  if (nomeMaeTemp.value.trim()) {
    state.motherName = nomeMaeTemp.value.trim()
    passo.value++
  }
}

// ── Passo 2: Tipo de gestação ──
const tiposGestacao = [
  {
    id: 'identicos',
    label: 'Gêmeos Idênticos',
    emoji: '👯',
    descricao: 'Parecem iguais, vieram do mesmo óvulo.',
  },
  {
    id: 'fraternos',
    label: 'Gêmeos Fraternos',
    emoji: '👫',
    descricao: 'Cada um é diferente, vieram de óvulos diferentes.',
  },
  {
    id: 'nao-sei',
    label: 'Ainda não sei',
    emoji: '🤷',
    descricao: 'Sem problema! O médico vai te falar.',
  },
]

const gestacaoTemp = ref(state.gestationType)
function escolherGestacao(id) {
  gestacaoTemp.value = id
  state.gestationType = id
  setTimeout(() => passo.value++, 400)
}

// ── Passo 3: Semana ──
const semanaTemp = ref(state.currentWeek || 20)
function avancarSemana() {
  state.currentWeek = semanaTemp.value
  passo.value++
}

// ── Passo 4: DPP ──
const dppTemp = ref(state.dpp || '')
const dppMinDate = computed(() => {
  const hoje = new Date()
  return hoje.toISOString().split('T')[0]
})

const diasRestantes = computed(() => {
  if (!dppTemp.value) return 0
  const hoje = new Date()
  const dpp = new Date(dppTemp.value)
  return Math.max(0, Math.ceil((dpp - hoje) / (1000 * 60 * 60 * 24)))
})

function concluirOnboarding() {
  if (dppTemp.value) {
    state.dpp = dppTemp.value
  }
  state.onboardingCompleted = true
  state.currentScreen = 'semanas'
  addXp(50) // XP por completar o onboarding
}

// ── Visual ──
function particulaStyle(i) {
  const tops = [8, 18, 50, 72, 85, 35]
  const lefts = [10, 80, 90, 15, 60, 5]
  const sizes = [6, 8, 5, 7, 6, 5]
  const delays = [0, 2, 4, 1, 3, 5]
  const colors = [
    'var(--color-roxo-medio)', 'var(--color-azul-medio)', 'var(--color-agua-medio)',
    'var(--color-roxo-claro)', 'var(--color-azul-claro)', 'var(--color-agua-claro)',
  ]
  const idx = i - 1
  return {
    top: tops[idx] + '%',
    left: lefts[idx] + '%',
    width: sizes[idx] + 'px',
    height: sizes[idx] + 'px',
    animationDelay: delays[idx] + 's',
    background: colors[idx],
  }
}

const textoFala = computed(() => {
  if (passo.value === 1) return 'Como é seu nome? Digite seu nome para a gente te conhecer.'
  if (passo.value === 2) return 'Seus bebês são gêmeos idênticos, fraternos, ou você ainda não sabe?'
  if (passo.value === 3) return 'Em que semana da gravidez você está? Use o controle para escolher.'
  if (passo.value === 4) return 'Quando os bebês devem nascer? Coloque a data que o médico falou.'
  return ''
})
</script>

<style scoped>
.onboarding-container {
  min-height: 100dvh;
  padding: 60px 20px 40px;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background: linear-gradient(160deg, var(--color-fundo) 0%, var(--color-roxo-claro) 50%, var(--color-agua-claro) 100%);
}

/* ── Partículas ── */
.particulas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.particula {
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
  animation: flutuar 6s ease-in-out infinite;
}

/* ── Navegação ── */
.btn-voltar, .btn-ouvir-onb {
  position: fixed;
  top: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-texto);
  z-index: 10;
}
.btn-voltar { left: 16px; }
.btn-ouvir-onb { right: 16px; }

/* ── Indicador de passos ── */
.passos-indicador {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}
.passo-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-roxo-claro);
  transition: all 0.4s ease;
}
.dot-ativo {
  background: var(--color-roxo-medio);
}
.dot-atual {
  background: var(--color-roxo);
  transform: scale(1.3);
}

/* ── Passo (layout) ── */
.passo {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 70vh;
}
.passo-centralizado {
  justify-content: center;
}

.passo-emoji-grande {
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 12px;
  animation: pulsar-suave 3s infinite;
}

.passo-titulo {
  font-size: 1.6rem;
  color: var(--color-texto);
  margin-bottom: 8px;
  text-align: center;
  line-height: 1.3;
}
.passo-sub {
  font-size: 1.05rem;
  color: var(--color-texto-claro);
  text-align: center;
  margin-bottom: 28px;
  line-height: 1.4;
}

/* ── Input (Nome e DPP) ── */
.input-area {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-radius: var(--radius-xl);
  margin-bottom: 28px;
}
.input-icone { font-size: 1.8rem; }
.nome-input,
.dpp-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--font-titulo);
  font-size: 1.3rem;
  color: var(--color-texto);
  outline: none;
}
.dpp-input {
  font-size: 1.15rem;
}

/* ── Botão Avançar ── */
.btn-avancar {
  padding: 20px;
  border-radius: var(--radius-xl);
  background: var(--color-roxo);
  color: white;
  font-size: 1.2rem;
  font-family: var(--font-titulo);
  font-weight: 700;
  box-shadow: var(--shadow-media);
  transition: opacity 0.3s;
  width: 100%;
}
.btn-avancar.disabled { opacity: 0.4; pointer-events: none; }

/* ── Passo 2: Tipo de gestação ── */
.opcoes-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.opcao-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius-lg);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  text-align: left;
}
.opcao-card-ativa {
  border-color: var(--color-roxo);
  background: rgba(255,255,255,0.9);
  transform: scale(1.02);
}
.opcao-emoji { font-size: 2.4rem; }
.opcao-textos strong {
  display: block;
  font-size: 1.15rem;
  color: var(--color-texto);
  margin-bottom: 2px;
}
.opcao-textos small {
  color: var(--color-texto-claro);
  font-size: 0.95rem;
  line-height: 1.3;
}

/* ── Passo 3: Semana ── */
.semana-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
}
.semana-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 48px;
  border-radius: var(--radius-xl);
}
.semana-numero {
  font-family: var(--font-titulo);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--color-roxo-intenso);
  line-height: 1;
}
.semana-texto {
  font-size: 1rem;
  color: var(--color-texto-claro);
  font-weight: 600;
}
.semana-slider {
  width: 100%;
  max-width: 320px;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--color-roxo-claro);
  border-radius: var(--radius-full);
  outline: none;
}
.semana-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-roxo);
  cursor: pointer;
  box-shadow: var(--shadow-suave);
}
.semana-slider::-moz-range-thumb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-roxo);
  cursor: pointer;
  border: none;
}
.semana-range-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
  font-size: 0.85rem;
  color: var(--color-texto-claro);
  font-weight: 600;
}

/* ── Passo 4: DPP ── */
.dpp-area {
  margin-bottom: 28px;
}
.dpp-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: var(--radius-lg);
  margin-top: 16px;
}
.dpp-emoji { font-size: 1.5rem; }
.dpp-texto {
  font-size: 1rem;
  color: var(--color-texto);
}

.botoes-finais {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-concluir {
  width: 100%;
  padding: 20px;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, var(--color-roxo-medio) 0%, var(--color-azul) 100%);
  color: white;
  font-size: 1.3rem;
  font-family: var(--font-titulo);
  font-weight: 700;
  box-shadow: var(--shadow-forte);
}

.btn-pular {
  padding: 14px;
  background: transparent;
  color: var(--color-texto-claro);
  font-size: 1rem;
  font-family: var(--font-titulo);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
