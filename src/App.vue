<template>
  <div class="app-container">
    <!-- Onboarding vs Main App -->
    <Transition name="fade-slide" mode="out-in">
      <TelaOnboarding v-if="!state.onboardingCompleted" />
      <div v-else class="main-content">
        <!-- Tela ativa -->
        <Transition :name="transitionName" mode="out-in">
          <component :is="currentComponent" :key="state.currentScreen" />
        </Transition>

        <!-- Navegação inferior -->
        <Transition name="slide-up">
          <NavBar />
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useGemelar } from './composables/useGemelar.js'

import TelaOnboarding from './components/TelaOnboarding.vue'
import TelaSemanas from './components/TelaSemanas.vue'
import TelaDiario from './components/TelaDiario.vue'
import TelaDuvidas from './components/TelaDuvidas.vue'
import TelaAcompanhamento from './components/TelaAcompanhamento.vue'
import NavBar from './components/NavBar.vue'

const { state } = useGemelar()

const screens = {
  semanas: TelaSemanas,
  diario: TelaDiario,
  duvidas: TelaDuvidas,
  saude: TelaAcompanhamento,
}

const currentComponent = computed(() => screens[state.currentScreen] || TelaSemanas)

// Direção da transição
const transitionName = ref('fade-slide')
const prevScreenIndex = ref(0)

const screenOrder = ['semanas', 'diario', 'saude', 'duvidas']

watch(() => state.currentScreen, (newScreen, oldScreen) => {
  const newIdx = screenOrder.indexOf(newScreen)
  const oldIdx = screenOrder.indexOf(oldScreen)
  transitionName.value = newIdx > oldIdx ? 'slide-left' : 'slide-right'
})
</script>

<style>
/* ═══ Transições de tela ═══ */

/* Fade suave (padrão) */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

/* Slide para esquerda (avançar) */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

/* Slide para direita (voltar) */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

/* Navbar slide up */
.slide-up-enter-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

/* ═══ Container do App ═══ */
.app-container {
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  min-height: 100dvh;
}

.main-content {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
</style>
