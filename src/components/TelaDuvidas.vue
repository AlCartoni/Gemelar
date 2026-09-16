<template>
  <div class="tela-duvidas">
    <!-- Cabeçalho -->
    <div class="tela-header">
      <h1 class="tela-titulo">Cantinho das dúvidas 💬</h1>
      <BotaoOuvir :texto-para-ler="textoParaLer" />
    </div>

    <p class="subtitulo">Toque em uma pergunta para ver a resposta 💕</p>

    <!-- Balões de perguntas -->
    <div class="duvidas-lista">
      <motion.div
        v-for="(duvida, index) in duvidas"
        :key="duvida.id"
        class="balao glass"
        :class="{ 'balao-aberto': duvida.aberto, ['balao-cor-' + (index % 3)]: true }"
        :initial="{ opacity: 0, y: 20, scale: 0.95 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ type: 'spring', stiffness: 180, damping: 20, delay: index * 0.1 }"
        @click="toggleDuvida(duvida.id)"
      >
        <!-- Pergunta -->
        <div class="balao-pergunta">
          <span class="balao-icone">{{ duvida.icone }}</span>
          <span class="balao-texto">{{ duvida.pergunta }}</span>
          <span class="balao-seta" :class="{ 'seta-aberta': duvida.aberto }">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>

        <!-- Resposta -->
        <transition name="resposta">
          <div v-if="duvida.aberto" class="balao-resposta">
            <p>{{ duvida.resposta }}</p>
            <span class="resposta-emoji">{{ duvida.respostaEmoji }}</span>
          </div>
        </transition>
      </motion.div>
    </div>

    <!-- Mensagem de acolhimento no final -->
    <motion.div
      class="acolhimento glass"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 0.8 }"
    >
      <span class="acolhimento-emoji">🫶</span>
      <p class="acolhimento-texto">Se algo te preocupa, converse com seu médico. Ele está ali pra te ajudar.</p>
    </motion.div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { motion } from 'motion-v'
import BotaoOuvir from './BotaoOuvir.vue'

const duvidas = reactive([
  {
    id: 1,
    icone: '👶👶',
    pergunta: 'Vou ter os bebês antes?',
    resposta: 'Sim, e tá tudo bem. Muitos gêmeos chegam um pouquinho mais cedo. Você e seu médico estão preparados.',
    respostaEmoji: '💛',
    aberto: false,
  },
  {
    id: 2,
    icone: '🤰',
    pergunta: 'Minha barriga vai ficar muito grande?',
    resposta: 'Vai ficar linda! A barriga de gêmeos cresce mais, porque são dois amorzinhos ali dentro. Cada centímetro é amor.',
    respostaEmoji: '🥰',
    aberto: false,
  },
  {
    id: 3,
    icone: '😴',
    pergunta: 'É normal sentir tanto sono?',
    resposta: 'Muito normal! Seu corpo está trabalhando dobrado. Descanse sempre que puder. Você merece.',
    respostaEmoji: '💤',
    aberto: false,
  },
  {
    id: 4,
    icone: '🍽️',
    pergunta: 'Preciso comer por três?',
    resposta: 'Não precisa. Só coma com carinho e atenção. Coisas que fazem bem pra você fazem bem pros bebês também.',
    respostaEmoji: '🥗',
    aberto: false,
  },
  {
    id: 5,
    icone: '💕',
    pergunta: 'Vou conseguir amar os dois igual?',
    resposta: 'O amor não se divide, ele se multiplica. Você vai se surpreender com o tamanho do seu coração.',
    respostaEmoji: '✨',
    aberto: false,
  },
  {
    id: 6,
    icone: '🏥',
    pergunta: 'Vou precisar ir mais ao médico?',
    resposta: 'Talvez um pouquinho mais, e isso é uma coisa boa! Mais visitas significa mais cuidado com vocês três.',
    respostaEmoji: '🩺',
    aberto: false,
  },
])

const textoParaLer = computed(() => {
  return 'Cantinho das dúvidas. Toque em uma pergunta para ver a resposta. São perguntas comuns sobre gravidez de gêmeos.'
})

function toggleDuvida(id) {
  const duvida = duvidas.find(d => d.id === id)
  if (duvida) {
    duvida.aberto = !duvida.aberto
  }
}
</script>

<style scoped>
.tela-duvidas {
  padding: 20px 16px 100px 16px;
  min-height: 100dvh;
}

.tela-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-top: 8px;
}

.tela-titulo {
  font-size: 1.4rem;
  color: var(--color-texto);
  margin: 0;
}

.subtitulo {
  font-size: 0.95rem;
  color: var(--color-texto-claro);
  margin-bottom: 20px;
}

/* ── Balões ── */
.duvidas-lista {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.balao {
  border-radius: var(--radius-lg);
  padding: 0;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  overflow: hidden;
}

.balao:active {
  transform: scale(0.98);
}

.balao-aberto {
  box-shadow: var(--shadow-media);
}

/* Cores variadas para os balões */
.balao-cor-0 {
  border-left: 4px solid var(--color-roxo-medio);
}
.balao-cor-1 {
  border-left: 4px solid var(--color-azul-medio);
}
.balao-cor-2 {
  border-left: 4px solid var(--color-agua-medio);
}

.balao-pergunta {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 16px;
}

.balao-icone {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.balao-texto {
  flex: 1;
  font-family: var(--font-titulo);
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--color-texto);
}

.balao-seta {
  flex-shrink: 0;
  color: var(--color-texto-claro);
  transition: transform 0.3s ease;
  display: flex;
}

.seta-aberta {
  transform: rotate(180deg);
}

/* ── Resposta ── */
.balao-resposta {
  padding: 0 16px 18px 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.balao-resposta p {
  font-size: 0.95rem;
  color: var(--color-texto);
  line-height: 1.6;
  margin: 0;
  opacity: 0.85;
}

.resposta-emoji {
  font-size: 1.3rem;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Transição da resposta */
.resposta-enter-active {
  transition: all 0.3s ease;
}

.resposta-leave-active {
  transition: all 0.2s ease;
}

.resposta-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}

.resposta-leave-to {
  opacity: 0;
  max-height: 0;
}

/* ── Acolhimento ── */
.acolhimento {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border-radius: var(--radius-lg);
}

.acolhimento-emoji {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.acolhimento-texto {
  font-size: 0.9rem;
  color: var(--color-texto);
  margin: 0;
  line-height: 1.5;
  opacity: 0.75;
}
</style>
