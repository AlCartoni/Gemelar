<template>
  <div class="tela-diario">
    <!-- Cabeçalho -->
    <div class="tela-header">
      <h1 class="tela-titulo">Diário 📖</h1>
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
        <!-- Seletor de autor: só aparece se parceiro cadastrado -->
        <div v-if="state.partnerName" class="autor-selector">
          <button
            class="autor-btn"
            :class="{ ativo: autorAtual === 'mae' }"
            @click="autorAtual = 'mae'"
          >
            🌸 {{ state.motherName || 'Mamãe' }}
          </button>
          <button
            class="autor-btn"
            :class="{ ativo: autorAtual === 'parceiro' }"
            @click="autorAtual = 'parceiro'"
          >
            💙 {{ state.partnerName }}
          </button>
        </div>
        <motion.button
          class="salvar-btn"
          :whileTap="{ scale: 0.95 }"
          @click="salvar"
          :disabled="!textoAtual.trim()"
        >
          <span>Guardar</span>
          <span class="salvar-emoji">💜</span>
        </motion.button>
      </div>
    </div>

    <!-- XP hint -->
    <p class="xp-dica" v-if="state.diaryEntries.length === 0">
      ✨ Escreva algo e ganhe <strong>15 XP</strong>!
    </p>

    <!-- Entradas anteriores -->
    <div v-if="state.diaryEntries.length > 0" class="entradas">
      <p class="entradas-titulo">Seus momentos 💫</p>
      <motion.div
        v-for="(entrada, index) in entradasVisiveis"
        :key="entrada.id"
        class="entrada-card"
        :class="'entrada-' + entrada.autor"
        :initial="{ opacity: 0, x: -20 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ delay: index * 0.1 }"
      >
        <div class="entrada-meta">
          <span class="entrada-icone">{{ entrada.autor === 'parceiro' ? '💙' : '🌸' }}</span>
          <span class="entrada-data">{{ entrada.data }}</span>
          <span class="entrada-hora">{{ entrada.hora }}</span>
        </div>
        <p class="entrada-texto">{{ entrada.texto }}</p>
      </motion.div>

      <button
        v-if="state.diaryEntries.length > 5 && !mostrarTodas"
        class="btn-ver-mais glass"
        @click="mostrarTodas = true"
      >
        Ver mais momentos ✨
      </button>
    </div>

    <!-- Feedback de salvo -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="mostrarFeedback" class="feedback-salvo">
          <span>Guardado com carinho 💜 +15 XP</span>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { useGemelar } from '../composables/useGemelar.js'
import BotaoOuvir from './BotaoOuvir.vue'

const { state, addDiaryEntry } = useGemelar()

const textoAtual = ref('')
const mostrarFeedback = ref(false)
const autorAtual = ref('mae')
const mostrarTodas = ref(false)

const frases = computed(() => [
  { texto: 'O que você está sentindo hoje?', emoji: '🌸' },
  {
    texto: state.tipoGestacao === 'gemelar'
      ? 'Seus bebês adoram ouvir sua voz.'
      : 'Seu bebê adora ouvir sua voz.',
    emoji: '💕'
  },
  { texto: 'Você é incrível. Pode escrever qualquer coisa.', emoji: '✨' },
  { texto: 'Que tal contar um sonho que teve?', emoji: '🌙' },
  { texto: 'Aqui é seu cantinho. Sem pressa.', emoji: '🫶' },
])

const placeholders = computed(() => [
  'Escreva o que quiser...',
  'Hoje eu senti...',
  'Uma coisa boa de hoje...',
  'Quero lembrar que...',
])

const fraseAtual = computed(() => {
  const idx = new Date().getDate() % frases.value.length
  return frases.value[idx]
})

const placeholderAtual = computed(() => {
  const idx = new Date().getHours() % placeholders.value.length
  return placeholders.value[idx]
})

const entradasVisiveis = computed(() => {
  if (mostrarTodas.value) return state.diaryEntries
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
  }, 2500)
}
</script>

<style scoped>
.tela-diario {
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

/* ── Incentivo ── */
.incentivo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: var(--radius-lg);
  margin-bottom: 16px;
}
.incentivo-emoji { font-size: 1.6rem; }
.incentivo-texto {
  font-size: 1rem;
  color: var(--color-texto);
  margin: 0;
  line-height: 1.4;
}

/* ── Área de escrita ── */
.escrita-wrapper {
  border-radius: var(--radius-lg);
  padding: 16px;
  margin-bottom: 12px;
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
  gap: 6px;
  background: rgba(255, 255, 255, 0.4);
  padding: 4px;
  border-radius: var(--radius-full);
}
.autor-btn {
  border: none;
  border-radius: var(--radius-full);
  padding: 8px 14px;
  font-family: var(--font-titulo);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-texto-claro);
  background: transparent;
  transition: all 0.3s;
}
.autor-btn.ativo {
  color: white;
}
.autor-btn.ativo:first-child {
  background: var(--color-mae);
}
.autor-btn.ativo:last-child {
  background: var(--color-parceiro);
}

.salvar-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius-full);
  color: white;
  background: var(--color-roxo);
  font-family: var(--font-titulo);
  font-size: 1rem;
  font-weight: 600;
  box-shadow: var(--shadow-suave);
  transition: opacity 0.2s ease;
}
.salvar-btn:disabled { opacity: 0.35; }
.salvar-emoji { font-size: 1.1rem; }

/* ── XP dica ── */
.xp-dica {
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-roxo);
  font-weight: 600;
  margin: 0 0 20px 0;
}

/* ── Entradas ── */
.entradas { margin-top: 8px; }
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
  margin-bottom: 10px;
  border-left: 4px solid transparent;
}
.entrada-mae {
  background: var(--color-roxo-claro);
  border-color: var(--color-mae);
}
.entrada-parceiro {
  background: var(--color-azul-claro);
  border-color: var(--color-parceiro);
}

.entrada-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  align-items: center;
}
.entrada-data, .entrada-hora {
  font-family: var(--font-titulo);
  font-size: 0.8rem;
  color: var(--color-texto-claro);
  font-weight: 500;
}
.entrada-icone { font-size: 1rem; }
.entrada-texto {
  font-size: 0.95rem;
  color: var(--color-texto);
  margin: 0;
  line-height: 1.5;
}

.btn-ver-mais {
  width: 100%;
  padding: 14px;
  border-radius: var(--radius-lg);
  font-family: var(--font-titulo);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-roxo);
  margin-top: 8px;
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
  white-space: nowrap;
}

.fade-enter-active, .fade-leave-active { transition: all 0.4s ease; }
.fade-enter-from { opacity: 0; transform: translateX(-50%) translateY(-16px); }
.fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(-16px); }
</style>
