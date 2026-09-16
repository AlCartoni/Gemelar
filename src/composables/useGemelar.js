import { reactive, watch, toRefs } from 'vue'

/**
 * useGemelar — Composable central do app
 * Gerencia estado global e persistência em localStorage
 */

const STORAGE_KEY = 'gemelar-dados'

// Sugestões iniciais de nomes (curtos, clássicos, modernos)
const nomesIniciais = [
  { id: 1, nome: 'Luna', favoritado: false },
  { id: 2, nome: 'Aurora', favoritado: false },
  { id: 3, nome: 'Noah', favoritado: false },
  { id: 4, nome: 'Theo', favoritado: false },
  { id: 5, nome: 'Maya', favoritado: false },
  { id: 6, nome: 'Gael', favoritado: false },
  { id: 7, nome: 'Iris', favoritado: false },
  { id: 8, nome: 'Luca', favoritado: false },
  { id: 9, nome: 'Flora', favoritado: false },
  { id: 10, nome: 'Enzo', favoritado: false },
  { id: 11, nome: 'Olívia', favoritado: false },
  { id: 12, nome: 'Ravi', favoritado: false },
]

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
  currentScreen: saved?.currentScreen || 'semanas',
  selectedPair: saved?.selectedPair || 'lua-sol',
  babyNames: saved?.babyNames || [...nomesIniciais],
  diaryEntries: saved?.diaryEntries || [],
  hasEntered: saved?.hasEntered || false,
  motherName: saved?.motherName || '',
  currentWeek: saved?.currentWeek || 20,
  onboardingCompleted: saved?.onboardingCompleted || false,
  babyGenders: saved?.babyGenders || null,
  chosenBabyNames: saved?.chosenBabyNames || [],
})

// Auto-save quando o estado muda
watch(
  () => ({ ...state, babyNames: [...state.babyNames], diaryEntries: [...state.diaryEntries] }),
  () => {
    saveToStorage({
      currentScreen: state.currentScreen,
      selectedPair: state.selectedPair,
      babyNames: state.babyNames,
      diaryEntries: state.diaryEntries,
      hasEntered: state.hasEntered,
      motherName: state.motherName,
      currentWeek: state.currentWeek,
      onboardingCompleted: state.onboardingCompleted,
      babyGenders: state.babyGenders,
      chosenBabyNames: state.chosenBabyNames,
    })
  },
  { deep: true }
)

export function useGemelar() {

  function navigateTo(screen) {
    state.currentScreen = screen
    if (screen !== 'abertura') {
      state.hasEntered = true
    }
  }

  function selectPair(pair) {
    state.selectedPair = pair
  }

  function toggleFavorite(id) {
    const name = state.babyNames.find(n => n.id === id)
    if (name) {
      name.favoritado = !name.favoritado
    }
  }

  function addName(nome) {
    const maxId = Math.max(...state.babyNames.map(n => n.id), 0)
    state.babyNames.push({
      id: maxId + 1,
      nome,
      favoritado: false,
    })
  }

  function removeName(id) {
    const index = state.babyNames.findIndex(n => n.id === id)
    if (index > -1) {
      state.babyNames.splice(index, 1)
    }
  }

  function addDiaryEntry(texto, autor = 'mae') {
    state.diaryEntries.unshift({
      id: Date.now(),
      texto,
      autor, // 'mae' (elemento 1) ou 'parceiro' (elemento 2)
      data: new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
      }),
      hora: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
  }

  // Cores do par selecionado
  function getPairColors() {
    const pairs = {
      'lua-sol': {
        primary: 'var(--color-lua)', secondary: 'var(--color-sol)',
        bgFrom: 'var(--color-lua-claro)', bgTo: 'var(--color-sol-claro)',
        name1: 'Lua', name2: 'Sol', emoji1: '🌙', emoji2: '☀️',
      },
      'agua-fogo': {
        primary: 'var(--color-agua)', secondary: 'var(--color-fogo)',
        bgFrom: 'var(--color-agua-claro)', bgTo: 'var(--color-fogo-claro)',
        name1: 'Água', name2: 'Fogo', emoji1: '💧', emoji2: '🔥',
      },
      'terra-ar': {
        primary: 'var(--color-terra)', secondary: 'var(--color-ar)',
        bgFrom: 'var(--color-terra-claro)', bgTo: 'var(--color-ar-claro)',
        name1: 'Terra', name2: 'Ar', emoji1: '🌿', emoji2: '☁️',
      },
      'dia-noite': {
        primary: 'var(--color-dia)', secondary: 'var(--color-noite)',
        bgFrom: 'var(--color-dia-claro)', bgTo: 'var(--color-noite-claro)',
        name1: 'Dia', name2: 'Noite', emoji1: '🌅', emoji2: '🌌',
      },
      'flor-folha': {
        primary: 'var(--color-flor)', secondary: 'var(--color-folha)',
        bgFrom: 'var(--color-flor-claro)', bgTo: 'var(--color-folha-claro)',
        name1: 'Flor', name2: 'Folha', emoji1: '🌸', emoji2: '🍃',
      },
      'rio-montanha': {
        primary: 'var(--color-rio)', secondary: 'var(--color-montanha)',
        bgFrom: 'var(--color-rio-claro)', bgTo: 'var(--color-montanha-claro)',
        name1: 'Rio', name2: 'Montanha', emoji1: '🏞️', emoji2: '⛰️',
      },
      'estrela-cometa': {
        primary: 'var(--color-estrela)', secondary: 'var(--color-cometa)',
        bgFrom: 'var(--color-estrela-claro)', bgTo: 'var(--color-cometa-claro)',
        name1: 'Estrela', name2: 'Cometa', emoji1: '⭐', emoji2: '☄️',
      },
      'nuvem-arco': {
        primary: 'var(--color-nuvem)', secondary: 'var(--color-arco)',
        bgFrom: 'var(--color-nuvem-claro)', bgTo: 'var(--color-arco-claro)',
        name1: 'Nuvem', name2: 'Arco-íris', emoji1: '💭', emoji2: '🌈',
      },
      'gato-cachorro': {
        primary: 'var(--color-gatinho)', secondary: 'var(--color-cachorro)',
        bgFrom: 'var(--color-gatinho-claro)', bgTo: 'var(--color-cachorro-claro)',
        name1: 'Gatinho', name2: 'Cachorrinho', emoji1: '🐱', emoji2: '🐶',
      },
      'urso-coelho': {
        primary: 'var(--color-ursinho)', secondary: 'var(--color-coelhinho)',
        bgFrom: 'var(--color-ursinho-claro)', bgTo: 'var(--color-coelhinho-claro)',
        name1: 'Ursinho', name2: 'Coelhinho', emoji1: '🐻', emoji2: '🐰',
      },
    }
    return pairs[state.selectedPair] || pairs['lua-sol']
  }

  return {
    state,
    navigateTo,
    selectPair,
    toggleFavorite,
    addName,
    removeName,
    addDiaryEntry,
    getPairColors,
  }
}
