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
      <span v-if="currentScreen === item.screen" class="nav-indicador"></span>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useGemelar } from '../composables/useGemelar.js'

const { state, navigateTo } = useGemelar()
const currentScreen = computed(() => state.currentScreen)

const items = [
  {
    screen: 'semanas',
    label: 'Semanas',
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M12 22V8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 8c-2-3-6-3-7-1s1 5 7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12c2-3 6-4 7-2s-1 5-7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 22h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    screen: 'diario',
    label: 'Diário',
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 7h8M8 11h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    screen: 'saude',
    label: 'Saúde',
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    screen: 'duvidas',
    label: 'Cuidados',
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" stroke="currentColor" stroke-width="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
]
</script>

<style scoped>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  margin: 0 auto;
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
  padding: 10px 20px;
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--color-texto-claro);
  transition: all 0.3s ease;
  position: relative;
  min-width: 65px;
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
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.nav-indicador {
  position: absolute;
  bottom: 4px;
  width: 20px;
  height: 3px;
  border-radius: var(--radius-full);
  background: var(--color-roxo-medio);
}
</style>
