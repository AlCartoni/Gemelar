<template>
  <button
    v-if="isSupported"
    class="botao-ouvir"
    :class="{ 'ouvindo': isSpeaking }"
    @click="toggle(textoParaLer)"
    :aria-label="isSpeaking ? 'Parar de ouvir' : 'Ouvir em voz alta'"
  >
    <!-- Ícone de alto-falante -->
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 5L6 9H2v6h4l5 4V5z"
        :fill="isSpeaking ? 'var(--color-roxo)' : 'var(--color-texto-claro)'"
        stroke="none"
      />
      <g v-if="!isSpeaking" opacity="0.6">
        <path d="M15.5 8.5a5 5 0 010 7" stroke="var(--color-texto-claro)" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M18 6a8 8 0 010 12" stroke="var(--color-texto-claro)" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <!-- Ondas animadas quando falando -->
      <g v-else>
        <path class="onda onda-1" d="M15.5 8.5a5 5 0 010 7" stroke="var(--color-roxo)" stroke-width="1.5" stroke-linecap="round"/>
        <path class="onda onda-2" d="M18 6a8 8 0 010 12" stroke="var(--color-roxo-medio)" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </svg>
    <span class="botao-ouvir-label">{{ isSpeaking ? 'Parar' : 'Ouvir' }}</span>
  </button>
</template>

<script setup>
import { useSpeech } from '../composables/useSpeech.js'

const props = defineProps({
  textoParaLer: {
    type: String,
    required: true,
  },
})

const { isSpeaking, isSupported, toggle } = useSpeech()
</script>

<style scoped>
.botao-ouvir {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(167, 139, 219, 0.2);
  color: var(--color-texto-claro);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(167, 139, 219, 0.1);
}

.botao-ouvir:active {
  transform: scale(0.95);
}

.botao-ouvir.ouvindo {
  background: rgba(232, 224, 246, 0.8);
  border-color: var(--color-roxo-medio);
  color: var(--color-roxo);
}

.botao-ouvir-label {
  font-family: var(--font-titulo);
}

/* Ondas sonoras animadas */
.onda {
  animation: pulsar-onda 1s ease-in-out infinite;
}

.onda-2 {
  animation-delay: 0.3s;
}

@keyframes pulsar-onda {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
</style>
