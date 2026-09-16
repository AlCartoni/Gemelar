<template>
  <nav class="navbar glass-forte" role="navigation" aria-label="Navegação principal">
    <button
      v-for="item in items"
      :key="item.screen"
      class="nav-item"
      :class="{ 'nav-item-ativo': currentScreen === item.screen }"
      @click="navigateTo(item.screen)"
      :aria-label="item.label"
      :aria-current="currentScreen === item.screen ? 'page' : undefined"
    >
      <span class="nav-icon" v-html="item.icon"></span>
      <span class="nav-label">{{ item.label }}</span>
      <!-- Indicador de ativo -->
      <span v-if="currentScreen === item.screen" class="nav-indicador"></span>
    </button>
  </nav>
</template>

<script setup>
import { useGemelar } from '../composables/useGemelar.js'

const { state, navigateTo } = useGemelar()
const currentScreen = computed(() => state.currentScreen)

import { computed } from 'vue'

const items = [
  {
    screen: 'semanas',
    label: 'Crescer',
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M12 22V8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 8c-2-3-6-3-7-1s1 5 7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12c2-3 6-4 7-2s-1 5-7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="22" r="0" stroke="currentColor" stroke-width="0"/><path d="M8 22h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    screen: 'diario',
    label: 'Diário',
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 7h8M8 11h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    screen: 'duvidas',
    label: 'Dúvidas',
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="0.5" fill="currentColor" stroke="currentColor" stroke-width="1"/><path d="M9.5 8.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
]
</script>

<style scoped>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 12px 12px 12px;
  padding-bottom: max(12px, env(safe-area-inset-bottom));
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: 0 -4px 24px rgba(167, 139, 219, 0.12);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--color-texto-claro);
  transition: all 0.3s ease;
  position: relative;
  min-width: 60px;
}

.nav-item:active {
  transform: scale(0.9);
}

.nav-item-ativo {
  color: var(--color-roxo);
  background: rgba(167, 139, 219, 0.1);
}

.nav-item-ativo .nav-icon {
  transform: scale(1.1);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.nav-label {
  font-family: var(--font-titulo);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.nav-indicador {
  position: absolute;
  bottom: 2px;
  width: 20px;
  height: 3px;
  border-radius: var(--radius-full);
  background: var(--color-roxo-medio);
}
</style>
