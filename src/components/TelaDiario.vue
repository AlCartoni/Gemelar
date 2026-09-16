<template>
  <div class="tela-diario">
    <!-- Cabeçalho -->
    <div class="tela-header">
      <h1 class="tela-titulo">Diário do coração 📖</h1>
      <BotaoOuvir :texto-para-ler="textoParaLer" />
    </div>

    <!-- Frase de incentivo -->
    <motion.div
      class="incentivo glass"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ delay: 0.2 }"
    >
      <span class="incentivo-emoji">{{ fraseAtual.emoji }}</span>
      <p class="incentivo-texto">{{ fraseAtual.texto }}</p>
    </motion.div>

    <!-- Área de escrita -->
    <div class="escrita-wrapper glass">
      <textarea
        v-model="textoAtual"
        class="escrita-area"
        :placeholder="placeholderAtual"
        rows="5"
      ></textarea>
      <div class="escrita-acoes">
        <div class="autor-selector">
          <button 
            class="autor-btn" 
            :class="{ ativo: autorAtual === 'mae' }" 
            @click="autorAtual = 'mae'"
            :style="{ background: autorAtual === 'mae' ? parCores.primary : 'transparent', color: autorAtual === 'mae' ? 'white' : 'var(--color-texto)' }"
          >
            {{ parCores.emoji1 }} Mamãe
          </button>
          <button 
            class="autor-btn" 
            :class="{ ativo: autorAtual === 'parceiro' }" 
            @click="autorAtual = 'parceiro'"
            :style="{ background: autorAtual === 'parceiro' ? parCores.secondary : 'transparent', color: autorAtual === 'parceiro' ? 'white' : 'var(--color-texto)' }"
          >
            {{ parCores.emoji2 }} Parceiro(a)
          </button>
        </div>
        <motion.button
          class="salvar-btn"
          :whilePress="{ scale: 0.95 }"
          @click="salvar"
          :disabled="!textoAtual.trim()"
          :style="{ background: autorAtual === 'mae' ? parCores.primary : parCores.secondary }"
        >
          <span>Guardar</span>
          <span class="salvar-emoji">💜</span>
        </motion.button>
      </div>
    </div>

    <!-- Entradas anteriores -->
    <div v-if="state.diaryEntries.length > 0" class="entradas">
      <p class="entradas-titulo">Seus momentos 💫</p>
      <motion.div
        v-for="(entrada, index) in entradasVisiveis"
        :key="entrada.id"
        class="entrada-card"
        :style="{ 
          background: entrada.autor === 'parceiro' ? parCores.bgTo : parCores.bgFrom,
          borderColor: entrada.autor === 'parceiro' ? parCores.secondary : parCores.primary
        }"
        :initial="{ opacity: 0, x: -20 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ delay: index * 0.1 }"
      >
        <div class="entrada-meta">
          <span class="entrada-icone">{{ entrada.autor === 'parceiro' ? parCores.emoji2 : parCores.emoji1 }}</span>
          <span class="entrada-data">{{ entrada.data }}</span>
          <span class="entrada-hora">{{ entrada.hora }}</span>
        </div>
        <p class="entrada-texto">{{ entrada.texto }}</p>
      </motion.div>
    </div>

    <!-- Feedback de salvo -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="mostrarFeedback" class="feedback-salvo">
          <span>Guardado com carinho 💜</span>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { useGemelar } from '../composables/useGemelar.js'
import BotaoOuvir from './BotaoOuvir.vue'

const { state, addDiaryEntry, getPairColors } = useGemelar()

const textoAtual = ref('')
const mostrarFeedback = ref(false)
const autorAtual = ref('mae')

const parCores = computed(() => getPairColors())

const frases = [
  { texto: 'O que você está sentindo hoje?', emoji: '🌸' },
  { texto: 'Seus bebês adoram ouvir sua voz.', emoji: '💕' },
  { texto: 'Você é incrível. Pode escrever qualquer coisa.', emoji: '✨' },
  { texto: 'Que tal contar um sonho que teve?', emoji: '🌙' },
  { texto: 'Aqui é seu cantinho. Sem pressa.', emoji: '🫶' },
]

const placeholders = [
  'Escreva o que quiser...',
  'Hoje eu senti...',
  'Uma coisa boa de hoje...',
  'Quero lembrar que...',
]

const fraseAtual = computed(() => {
  const idx = new Date().getDate() % frases.length
  return frases[idx]
})

const placeholderAtual = computed(() => {
  const idx = new Date().getHours() % placeholders.length
  return placeholders[idx]
})

const entradasVisiveis = computed(() => {
  return state.diaryEntries.slice(0, 5)
})

const textoParaLer = computed(() => {
  return `Diário do coração. ${fraseAtual.value.texto}. Aqui você pode escrever o que estiver sentindo. Tudo fica guardado com carinho.`
})

function salvar() {
  const texto = textoAtual.value.trim()
  if (!texto) return

  addDiaryEntry(texto, autorAtual.value)
  textoAtual.value = ''
  mostrarFeedback.value = true

  setTimeout(() => {
    mostrarFeedback.value = false
  }, 2000)
}
</script>

<style scoped>
.tela-diario {
  padding: 20px 16px 100px 16px;
  min-height: 100dvh;
}

.tela-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-top: 8px;
}

.tela-titulo {
  font-size: 1.4rem;
  color: var(--color-texto);
  margin: 0;
}

/* ── Incentivo ── */
.incentivo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: var(--radius-lg);
  margin-bottom: 20px;
}

.incentivo-emoji {
  font-size: 1.6rem;
}

.incentivo-texto {
  font-family: var(--font-corpo);
  font-size: 1rem;
  color: var(--color-texto);
  margin: 0;
  line-height: 1.4;
}

/* ── Área de escrita ── */
.escrita-wrapper {
  border-radius: var(--radius-lg);
  padding: 16px;
  margin-bottom: 28px;
}

.escrita-area {
  width: 100%;
  border: none;
  background: transparent;
  font-family: var(--font-corpo);
  font-size: 1.05rem;
  color: var(--color-texto);
  outline: none;
  resize: none;
  line-height: 1.6;
  box-sizing: border-box;
}

.escrita-area::placeholder {
  color: var(--color-texto-claro);
  opacity: 0.5;
}

.escrita-acoes {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

.autor-selector {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.4);
  padding: 4px;
  border-radius: var(--radius-full);
}

.autor-btn {
  border: none;
  border-radius: var(--radius-full);
  padding: 6px 12px;
  font-family: var(--font-titulo);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s;
}

.salvar-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius-full);
  color: white;
  font-family: var(--font-titulo);
  font-size: 1rem;
  font-weight: 600;
  box-shadow: var(--shadow-suave);
  transition: opacity 0.2s ease;
}

.salvar-btn:disabled {
  opacity: 0.35;
}

.salvar-emoji {
  font-size: 1.1rem;
}

/* ── Entradas anteriores ── */
.entradas {
  margin-top: 8px;
}

.entradas-titulo {
  font-family: var(--font-titulo);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-texto-claro);
  margin-bottom: 14px;
}

.entrada-card {
  padding: 16px;
  border-radius: var(--radius-md);
  margin-bottom: 12px;
  border-left: 4px solid transparent;
}

.entrada-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}

.entrada-data,
.entrada-hora {
  font-family: var(--font-titulo);
  font-size: 0.8rem;
  color: var(--color-texto-claro);
  font-weight: 500;
}

.entrada-icone {
  font-size: 1rem;
}

.entrada-texto {
  font-size: 0.95rem;
  color: var(--color-texto);
  margin: 0;
  line-height: 1.5;
}

/* ── Feedback ── */
.feedback-salvo {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 28px;
  border-radius: var(--radius-full);
  background: var(--color-roxo);
  color: white;
  font-family: var(--font-titulo);
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: var(--shadow-media);
  z-index: 200;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-16px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-16px);
}
</style>
