import { reactive, watch, computed } from 'vue'

/**
 * useGemelar — Composable central do app
 * Gerencia estado global e persistência em localStorage
 * v2: Focado em evolução da gestação com níveis
 */

const STORAGE_KEY = 'gemelar-dados-v2'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    // Se der erro, só retorna null
  }
  return null
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    // silencioso
  }
}

// Estado global singleton
const saved = loadFromStorage()

const state = reactive({
  // Navegação
  currentScreen: saved?.currentScreen || 'semanas',

  // Onboarding
  onboardingCompleted: saved?.onboardingCompleted || false,
  motherName: saved?.motherName || '',
  partnerName: saved?.partnerName || '', // Opcional — pode ser vazio
  tipoGestacao: saved?.tipoGestacao || 'gemelar', // 'gemelar' | 'unica'
  gestationType: saved?.gestationType || null, // 'identicos', 'fraternos', 'nao-sei' (só gemelar)
  currentWeek: saved?.currentWeek || 20,
  dpp: saved?.dpp || null, // ISO date string

  // Diário
  diaryEntries: saved?.diaryEntries || [],

  // Progresso / Níveis
  xp: saved?.xp || 0,
  cuidadosLidos: saved?.cuidadosLidos || [], // IDs de cuidados que já abriu

  // Legado (manter para não perder dados de quem já usou)
  hasEntered: saved?.hasEntered || false,
})

// Auto-save quando o estado muda
watch(
  () => ({
    ...state,
    diaryEntries: [...state.diaryEntries],
    cuidadosLidos: [...state.cuidadosLidos],
  }),
  () => {
    saveToStorage({
      currentScreen: state.currentScreen,
      onboardingCompleted: state.onboardingCompleted,
      motherName: state.motherName,
      partnerName: state.partnerName,
      tipoGestacao: state.tipoGestacao,
      gestationType: state.gestationType,
      currentWeek: state.currentWeek,
      dpp: state.dpp,
      diaryEntries: state.diaryEntries,
      xp: state.xp,
      cuidadosLidos: state.cuidadosLidos,
      hasEntered: state.hasEntered,
    })
  },
  { deep: true }
)

export function useGemelar() {

  // ── Navegação ──
  function navigateTo(screen) {
    state.currentScreen = screen
    state.hasEntered = true
  }

  // ── Diário ──
  function addDiaryEntry(texto, autor = 'mae') {
    state.diaryEntries.unshift({
      id: Date.now(),
      texto,
      autor,
      data: new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
      }),
      hora: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
    addXp(15) // XP por escrever no diário
  }

  // ── XP e Níveis ──
  function addXp(amount) {
    state.xp += amount
  }

  /**
   * Nível baseado no XP acumulado
   * Cada nível precisa de mais XP que o anterior
   * Nível 1: 0 XP, Nível 2: 30 XP, Nível 3: 80 XP, etc.
   */
  const nivel = computed(() => {
    const xp = state.xp
    if (xp < 30) return 1
    if (xp < 80) return 2
    if (xp < 150) return 3
    if (xp < 250) return 4
    if (xp < 400) return 5
    if (xp < 600) return 6
    if (xp < 850) return 7
    if (xp < 1150) return 8
    if (xp < 1500) return 9
    return 10
  })

  const xpParaProximoNivel = computed(() => {
    const limites = [0, 30, 80, 150, 250, 400, 600, 850, 1150, 1500, 9999]
    const nivelAtual = nivel.value
    return limites[nivelAtual] // XP necessário para o próximo nível
  })

  const xpDoNivelAtual = computed(() => {
    const limites = [0, 30, 80, 150, 250, 400, 600, 850, 1150, 1500]
    const nivelAtual = nivel.value
    return limites[nivelAtual - 1] // XP onde o nível atual começa
  })

  const progressoNivel = computed(() => {
    const inicio = xpDoNivelAtual.value
    const fim = xpParaProximoNivel.value
    const range = fim - inicio
    if (range <= 0) return 100
    return Math.min(100, ((state.xp - inicio) / range) * 100)
  })

  const tituloNivel = computed(() => {
    const titulos = [
      'Família Nascendo', 'Primeiro Batimento', 'Começo de Tudo',
      'Cheia de Vida', 'Metade da Jornada', 'Quase Lá',
      'Reta Final', 'Família Completa', 'Família Radiante', 'Família Lendária'
    ]
    return titulos[nivel.value - 1] || 'Família Nascendo'
  })

  // ── Cuidados ──
  function marcarCuidadoLido(id) {
    if (!state.cuidadosLidos.includes(id)) {
      state.cuidadosLidos.push(id)
      addXp(10)
    }
  }

  // ── DPP e Cálculos ──
  const diasParaDPP = computed(() => {
    if (!state.dpp) return null
    const hoje = new Date()
    const dpp = new Date(state.dpp)
    const diff = dpp - hoje
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  })

  const trimestre = computed(() => {
    const s = state.currentWeek
    if (s <= 13) return 1
    if (s <= 27) return 2
    return 3
  })

  const progressoGestacao = computed(() => {
    // Progresso de 4 a 38 semanas (gemelar) ou 4 a 40 (única)
    const maxSemana = state.tipoGestacao === 'unica' ? 40 : 38
    return Math.min(100, ((state.currentWeek - 4) / (maxSemana - 4)) * 100)
  })

  // ── Reset ──
  function resetOnboarding() {
    state.onboardingCompleted = false
  }

  return {
    state,
    navigateTo,
    addDiaryEntry,
    addXp,
    nivel,
    xpParaProximoNivel,
    xpDoNivelAtual,
    progressoNivel,
    tituloNivel,
    marcarCuidadoLido,
    diasParaDPP,
    trimestre,
    progressoGestacao,
    resetOnboarding,
  }
}
