<template>
  <div class="tela-semanas">
    <!-- Header: Saudação + Nível -->
    <div class="tela-header">
      <div class="header-esq">
        <p class="saudacao">Olá, <strong>{{ state.motherName || 'mamãe' }}</strong> 💕</p>
        <div class="nivel-badge glass">
          <span class="nivel-estrela">⭐</span>
          <span class="nivel-texto">Nível {{ nivel }} — {{ tituloNivel }}</span>
        </div>
      </div>
      <div class="header-dir">
        <BotaoOuvir :texto-para-ler="textoCompleto" />
        <button class="btn-config glass" @click="resetOnboarding" aria-label="Ajustar dados">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.8.97 1.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Barra de XP -->
    <div class="xp-container glass">
      <div class="xp-info">
        <span class="xp-label">{{ state.xp }} XP</span>
        <span class="xp-proximo">Nível {{ nivel + 1 }}</span>
      </div>
      <div class="xp-barra">
        <div class="xp-preenchido" :style="{ width: progressoNivel + '%' }"></div>
      </div>
    </div>

    <!-- Card central: Bebê da semana -->
    <Transition name="fade-slide" mode="out-in">
      <div :key="semanaAtual" class="semana-card glass">
        <div class="semana-badge-top">
          <span class="semana-badge-texto">{{ dados.label }}</span>
          <span v-if="trimestre" class="trimestre-tag" :class="'tri-' + trimestre">{{ trimestre }}º trimestre</span>
        </div>

        <div class="bebe-visual">
          <div class="bebe-circulo" :style="{ width: circuloSize + 'px', height: circuloSize + 'px' }">
            <span class="bebe-emoji" :style="{ fontSize: emojiSize }">{{ dados.emoji }}</span>
          </div>
        </div>

        <div class="bebe-info">
          <p class="bebe-tamanho">
          {{ state.tipoGestacao === 'gemelar' ? 'Cada bebê está do tamanho de' : 'Seu bebê está do tamanho de' }}
          <strong>{{ dados.tamanho }}</strong>
        </p>
          <div class="bebe-medidas">
            <span class="medida">📏 {{ dados.comprimento }}</span>
            <span class="medida">⚖️ {{ dados.peso }}</span>
          </div>
        </div>

        <p class="bebe-marco">{{ dados.marco }}</p>
        <p class="bebe-carinho">{{ dados.carinho }}</p>
      </div>
    </Transition>

    <!-- Conquista da semana (se houver) -->
    <Transition name="fade-slide">
      <div v-if="conquista" class="conquista-card glass">
        <span class="conquista-emoji">{{ conquista.emoji }}</span>
        <div class="conquista-textos">
          <strong>🏆 {{ conquista.titulo }}</strong>
          <small>{{ conquista.descricao }}</small>
        </div>
      </div>
    </Transition>

    <!-- Cuidados da semana -->
    <div class="cuidados-semana">
      <h2 class="secao-titulo">Cuidados da semana 🌿</h2>
      <div class="cuidados-lista">
        <motion.div
          v-for="(cuidado, index) in dados.cuidados"
          :key="semanaAtual + '-' + index"
          class="cuidado-card glass"
          :class="{ 'cuidado-lido': isCuidadoLido(semanaAtual + '-' + index) }"
          @click="lerCuidado(semanaAtual + '-' + index)"
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: index * 0.1 }"
        >
          <span class="cuidado-icone">{{ cuidado.icone }}</span>
          <span class="cuidado-texto">{{ cuidado.texto }}</span>
          <span v-if="!isCuidadoLido(semanaAtual + '-' + index)" class="cuidado-xp">+10 XP</span>
          <span v-else class="cuidado-check">✅</span>
        </motion.div>
      </div>
    </div>

      <!-- Barra de progresso da gestação -->
      <div class="progresso-gestacao">
        <div class="progresso-header">
          <span class="progresso-label">Progresso da gestação</span>
          <span v-if="diasParaDPP !== null" class="progresso-dpp">{{ diasParaDPP }} dias para o parto</span>
        </div>
        <div class="progresso-barra">
          <div class="progresso-preenchido" :style="{ width: progressoGestacao + '%' }"></div>
          <div class="progresso-marcadores">
            <span class="marcador" style="left: 0%">4</span>
            <span class="marcador" v-if="state.tipoGestacao === 'gemelar'" style="left: 26.5%">13</span>
            <span class="marcador" v-if="state.tipoGestacao === 'gemelar'" style="left: 67.6%">27</span>
            <span class="marcador" v-if="state.tipoGestacao === 'gemelar'" style="left: 100%">38</span>
            <span class="marcador" v-if="state.tipoGestacao === 'unica'" style="left: 100%">40</span>
          </div>
        </div>
        <div class="progresso-trimestres">
          <span class="tri-label">1º tri</span>
          <span class="tri-label">2º tri</span>
          <span class="tri-label">3º tri</span>
        </div>
      </div>

    <!-- Navegação entre semanas -->
    <div class="nav-semanas">
      <motion.button
        class="nav-btn glass"
        :whileTap="{ scale: 0.92 }"
        @click="semanaAnterior"
        :disabled="semanaAtual <= 4"
        aria-label="Semana anterior"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Anterior</span>
      </motion.button>

      <motion.button
        class="nav-btn glass"
        :whileTap="{ scale: 0.92 }"
        @click="proximaSemana"
        :disabled="semanaAtual >= maxSemana"
        aria-label="Próxima semana"
      >
        <span>Próxima</span>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </motion.button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { motion } from 'motion-v'
import { useGemelar } from '../composables/useGemelar.js'
import { useSemanaData, getConquista, useSemanaDataUnica, getConquistaUnica } from '../composables/useSemanaData.js'
import BotaoOuvir from './BotaoOuvir.vue'

const {
  state, nivel, tituloNivel, progressoNivel,
  marcarCuidadoLido, diasParaDPP, trimestre,
  progressoGestacao, resetOnboarding,
} = useGemelar()

const semanaAtual = computed({
  get: () => state.currentWeek,
  set: (val) => { state.currentWeek = val },
})

// Usa o dataset correto conforme o tipo de gestação
const isGemelar = computed(() => state.tipoGestacao !== 'unica')
const { dados: dadosGemelar } = useSemanaData(semanaAtual)
const { dados: dadosUnica } = useSemanaDataUnica(semanaAtual)
const dados = computed(() => isGemelar.value ? dadosGemelar.value : dadosUnica.value)

const conquista = computed(() => {
  if (isGemelar.value) return getConquista(semanaAtual.value)
  return getConquistaUnica(semanaAtual.value)
})

// Tamanho do círculo e emoji baseado na semana
const maxSemana = computed(() => isGemelar.value ? 38 : 40)
const circuloSize = computed(() => {
  const min = 100
  const max = 180
  const progress = (semanaAtual.value - 4) / (maxSemana.value - 4)
  return Math.round(min + (max - min) * progress)
})

const emojiSize = computed(() => {
  const min = 2.2
  const max = 4.5
  const progress = (semanaAtual.value - 4) / (maxSemana.value - 4)
  return (min + (max - min) * progress).toFixed(1) + 'rem'
})

// Cuidados
function isCuidadoLido(id) {
  return state.cuidadosLidos.includes(id)
}

function lerCuidado(id) {
  marcarCuidadoLido(id)
}

// Navegação
function semanaAnterior() {
  if (semanaAtual.value > 4) semanaAtual.value--
}

function proximaSemana() {
  if (semanaAtual.value < maxSemana.value) semanaAtual.value++
}

// Leitura
const textoCompleto = computed(() => {
  const d = dados.value
  const nome = state.motherName ? `Olá, ${state.motherName}. ` : ''
  return `${nome}${d.label || ''}. ${d.frase} ${d.marco} ${d.carinho}`
})
</script>

<style scoped>
.tela-semanas {
  padding: 16px 16px 110px 16px;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── Header ── */
.tela-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 4px;
}

.header-esq {
  flex: 1;
}

.saudacao {
  font-family: var(--font-titulo);
  font-size: 1.1rem;
  color: var(--color-texto);
  margin: 0 0 6px 0;
}

.nivel-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-roxo-intenso);
}

.nivel-estrela {
  font-size: 1rem;
}

.header-dir {
  display: flex;
  gap: 8px;
  align-items: center;
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

/* ── Barra de XP ── */
.xp-container {
  padding: 12px 16px;
  border-radius: var(--radius-lg);
}

.xp-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.xp-label {
  font-family: var(--font-titulo);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-roxo-intenso);
}

.xp-proximo {
  font-size: 0.75rem;
  color: var(--color-texto-claro);
  font-weight: 600;
}

.xp-barra {
  height: 8px;
  background: var(--color-xp-bar);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.xp-preenchido {
  height: 100%;
  background: linear-gradient(90deg, var(--color-roxo-medio), var(--color-azul), var(--color-agua));
  border-radius: var(--radius-full);
  transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* ── Card central ── */
.semana-card {
  padding: 24px 20px;
  border-radius: var(--radius-xl);
  text-align: center;
}

.semana-badge-top {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.semana-badge-texto {
  font-family: var(--font-titulo);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-roxo-intenso);
}

.trimestre-tag {
  padding: 3px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
}
.tri-1 { background: var(--color-tri1); color: var(--color-roxo-intenso); }
.tri-2 { background: var(--color-tri2); color: var(--color-azul-intenso); }
.tri-3 { background: var(--color-tri3); color: var(--color-agua-intenso); }

/* ── Visual do bebê ── */
.bebe-visual {
  display: flex;
  justify-content: center;
  margin: 8px 0 16px 0;
}

.bebe-circulo {
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-roxo-claro) 0%, var(--color-azul-claro) 50%, var(--color-agua-claro) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-suave);
  animation: respirar 4s ease-in-out infinite;
  transition: width 0.5s ease, height 0.5s ease;
  position: relative;
  overflow: hidden;
}

.bebe-circulo::after {
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

.bebe-emoji {
  z-index: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.bebe-info {
  margin-bottom: 12px;
}

.bebe-tamanho {
  font-family: var(--font-titulo);
  font-size: 1.1rem;
  color: var(--color-texto);
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.bebe-medidas {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.medida {
  font-size: 0.9rem;
  color: var(--color-texto-claro);
  font-weight: 600;
}

.bebe-marco {
  font-size: 1rem;
  color: var(--color-texto);
  font-weight: 600;
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.bebe-carinho {
  font-size: 0.9rem;
  color: var(--color-texto);
  opacity: 0.7;
  font-style: italic;
  margin: 0;
}

/* ── Conquista ── */
.conquista-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--color-roxo);
}

.conquista-emoji {
  font-size: 2rem;
}

.conquista-textos strong {
  display: block;
  font-size: 1rem;
  color: var(--color-roxo-intenso);
}

.conquista-textos small {
  font-size: 0.9rem;
  color: var(--color-texto-claro);
}

/* ── Cuidados da semana ── */
.secao-titulo {
  font-size: 1.15rem;
  color: var(--color-texto);
  margin: 0 0 12px 0;
}

.cuidados-lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cuidado-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.cuidado-card:active {
  transform: scale(0.98);
}

.cuidado-lido {
  opacity: 0.7;
}

.cuidado-icone {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.cuidado-texto {
  flex: 1;
  font-size: 0.95rem;
  color: var(--color-texto);
  line-height: 1.4;
}

.cuidado-xp {
  font-family: var(--font-titulo);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-roxo);
  background: var(--color-roxo-claro);
  padding: 3px 8px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.cuidado-check {
  font-size: 1.2rem;
  flex-shrink: 0;
}

/* ── Progresso gestação ── */
.progresso-gestacao {
  padding: 0 4px;
}

.progresso-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progresso-label {
  font-family: var(--font-titulo);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-texto);
}

.progresso-dpp {
  font-size: 0.8rem;
  color: var(--color-roxo);
  font-weight: 600;
}

.progresso-barra {
  height: 10px;
  background: var(--color-roxo-claro);
  border-radius: var(--radius-full);
  overflow: visible;
  position: relative;
}

.progresso-preenchido {
  height: 100%;
  background: linear-gradient(90deg, var(--color-roxo-medio), var(--color-azul), var(--color-agua));
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

.progresso-marcadores {
  position: relative;
  height: 0;
}

.marcador {
  position: absolute;
  top: 6px;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: var(--color-texto-claro);
  font-weight: 600;
}

.progresso-trimestres {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.tri-label {
  font-size: 0.75rem;
  color: var(--color-texto-claro);
  font-weight: 600;
}

/* ── Navegação ── */
.nav-semanas {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 22px;
  border-radius: var(--radius-xl);
  color: var(--color-texto);
  font-family: var(--font-titulo);
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: var(--shadow-suave);
  transition: opacity 0.2s ease;
}

.nav-btn:disabled {
  opacity: 0.25;
  pointer-events: none;
}

.nav-btn:active:not(:disabled) {
  box-shadow: none;
}

/* ── Responsivo ── */
@media (max-width: 360px) {
  .bebe-circulo {
    max-width: 140px !important;
    max-height: 140px !important;
  }

  .nav-btn {
    padding: 12px 16px;
    font-size: 0.85rem;
  }

  .semana-badge-top {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
