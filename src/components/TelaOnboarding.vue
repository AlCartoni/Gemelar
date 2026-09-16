<template>
  <div class="onboarding-container" :style="bgStyle">
    <!-- Partículas decorativas dinâmicas -->
    <div class="particulas">
      <span v-for="i in 8" :key="i" class="particula" :style="particulaStyle(i)"></span>
    </div>

    <!-- Navegação / Voltar -->
    <button
      v-if="passo > 1"
      class="btn-voltar glass"
      @click="passo--"
      aria-label="Voltar para o passo anterior"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <BotaoOuvir class="btn-ouvir-onb" :texto-para-ler="textoFala" />

    <Transition name="fade-slide" mode="out-in">
      <!-- PASSO 1: DUALIDADE -->
      <div v-if="passo === 1" key="passo1" class="passo">
        <h1 class="passo-titulo">Como você sente seus bebês?</h1>
        <p class="passo-sub">Escolha o par que mais combina com eles.</p>

        <div class="pares-grid">
          <motion.button
            v-for="par in listaPares"
            :key="par.id"
            class="par-card glass"
            :class="{ 'par-card-ativo': state.selectedPair === par.id }"
            @click="escolherPar(par.id)"
            :whileTap="{ scale: 0.95 }"
          >
            <div class="par-emojis">
              <span>{{ par.emoji1 }}</span>
              <span class="par-conexao">+</span>
              <span>{{ par.emoji2 }}</span>
            </div>
            <div class="par-textos">
              <strong>{{ par.nome1 }} e {{ par.nome2 }}</strong>
              <small>{{ par.frase }}</small>
            </div>
          </motion.button>
        </div>
      </div>

      <!-- PASSO 2: NOME DA MÃE -->
      <div v-else-if="passo === 2" key="passo2" class="passo passo-centralizado">
        <h1 class="passo-titulo">Como podemos chamar você?</h1>
        
        <div class="input-area glass">
          <span class="input-icone">🌸</span>
          <input
            v-model="nomeMaeTemp"
            class="nome-input"
            placeholder="Seu nome, mamãe"
            maxlength="20"
            @keyup.enter="avancarNomeMae"
          />
        </div>

        <motion.button
          class="btn-avancar"
          :class="{ disabled: !nomeMaeTemp.trim() }"
          :disabled="!nomeMaeTemp.trim()"
          @click="avancarNomeMae"
          :whileTap="{ scale: 0.95 }"
        >
          Continuar
        </motion.button>
      </div>

      <!-- PASSO 3: GÊNEROS -->
      <div v-else-if="passo === 3" key="passo3" class="passo passo-centralizado">
        <h1 class="passo-titulo">Quem está chegando?</h1>
        
        <div class="generos-grid">
          <motion.button
            v-for="gen in opcoesGenero"
            :key="gen.id"
            class="genero-card glass"
            :class="{ 'genero-card-ativo': generoTemp === gen.id }"
            @click="escolherGenero(gen.id)"
            :whileTap="{ scale: 0.95 }"
          >
            <div class="genero-icone">{{ gen.icone }}</div>
            <div class="genero-label">{{ gen.label }}</div>
          </motion.button>
        </div>
      </div>

      <!-- PASSO 4: NOMES -->
      <div v-else-if="passo === 4" key="passo4" class="passo">
        <div class="nomes-header">
          <h1 class="passo-titulo">Quais os nomes?</h1>
          <p class="passo-sub">Escolha 2 nomes para os bebês.</p>
        </div>

        <!-- Destaque dos nomes escolhidos -->
        <div class="nomes-escolhidos glass" :class="{ 'escolhidos-prontos': nomesEscolhidosTemp.length === 2 }">
          <div class="nome-slot" :class="{ preenchido: nomesEscolhidosTemp[0] }">
            {{ nomesEscolhidosTemp[0] || '1º Nome' }}
          </div>
          <div class="nome-slot-coracao">💖</div>
          <div class="nome-slot" :class="{ preenchido: nomesEscolhidosTemp[1] }">
            {{ nomesEscolhidosTemp[1] || '2º Nome' }}
          </div>
        </div>

        <div class="nomes-lista">
          <motion.button
            v-for="nome in listaNomesFiltrada"
            :key="nome"
            class="nome-pill glass"
            :class="{ 'nome-pill-ativo': nomesEscolhidosTemp.includes(nome) }"
            @click="toggleNome(nome)"
            :whileTap="{ scale: 0.95 }"
          >
            {{ nome }}
          </motion.button>
        </div>

        <div class="novo-nome-area">
          <input
            v-model="novoNomeInput"
            class="novo-nome-input glass"
            placeholder="Ou digite outro nome..."
            maxlength="15"
            @keyup.enter="adicionarNomePersonalizado"
          />
          <button class="btn-add-nome" @click="adicionarNomePersonalizado">+</button>
        </div>

        <Transition name="slide-up">
          <motion.button
            v-if="nomesEscolhidosTemp.length === 2"
            class="btn-concluir"
            @click="concluirOnboarding"
            :initial="{ scale: 0.8, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            :whileTap="{ scale: 0.95 }"
          >
            Tudo Pronto! ✨
          </motion.button>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { useGemelar } from '../composables/useGemelar.js'
import BotaoOuvir from './BotaoOuvir.vue'

const { state, getPairColors } = useGemelar()

// ── Estado Local do Onboarding ──
const passo = ref(1)

const listaPares = [
  { id: 'lua-sol', nome1: 'Lua', nome2: 'Sol', emoji1: '🌙', emoji2: '☀️', frase: 'A calma e a energia' },
  { id: 'agua-fogo', nome1: 'Água', nome2: 'Fogo', emoji1: '💧', emoji2: '🔥', frase: 'A fluidez e a paixão' },
  { id: 'terra-ar', nome1: 'Terra', nome2: 'Ar', emoji1: '🌿', emoji2: '☁️', frase: 'A raiz e a liberdade' },
  { id: 'dia-noite', nome1: 'Dia', nome2: 'Noite', emoji1: '🌅', emoji2: '🌌', frase: 'A luz e o sonho' },
  { id: 'flor-folha', nome1: 'Flor', nome2: 'Folha', emoji1: '🌸', emoji2: '🍃', frase: 'A delicadeza e a força' },
  { id: 'rio-montanha', nome1: 'Rio', nome2: 'Montanha', emoji1: '🏞️', emoji2: '⛰️', frase: 'O caminho e a solidez' },
  { id: 'estrela-cometa', nome1: 'Estrela', nome2: 'Cometa', emoji1: '⭐', emoji2: '☄️', frase: 'O brilho e a aventura' },
  { id: 'nuvem-arco', nome1: 'Nuvem', nome2: 'Arco-íris', emoji1: '💭', emoji2: '🌈', frase: 'A suavidade e a cor' },
  { id: 'gato-cachorro', nome1: 'Gatinho', nome2: 'Cachorrinho', emoji1: '🐱', emoji2: '🐶', frase: 'O carinho e a alegria' },
  { id: 'urso-coelho', nome1: 'Ursinho', nome2: 'Coelhinho', emoji1: '🐻', emoji2: '🐰', frase: 'O aconchego e a doçura' }
]

function escolherPar(id) {
  state.selectedPair = id
  setTimeout(() => passo.value++, 400)
}

// ── Passo 2: Nome ──
const nomeMaeTemp = ref(state.motherName || '')
function avancarNomeMae() {
  if (nomeMaeTemp.value.trim()) {
    state.motherName = nomeMaeTemp.value.trim()
    passo.value++
  }
}

// ── Passo 3: Gênero ──
const opcoesGenero = [
  { id: 'boys', label: 'Dois Meninos', icone: '👦👦' },
  { id: 'girls', label: 'Duas Meninas', icone: '👧👧' },
  { id: 'boy-girl', label: 'Um Casal', icone: '👧👦' },
]
const generoTemp = ref(state.babyGenders)
function escolherGenero(id) {
  generoTemp.value = id
  state.babyGenders = id
  setTimeout(() => passo.value++, 400)
}

// ── Passo 4: Nomes ──
const nomesEscolhidosTemp = ref([...(state.chosenBabyNames || [])])
const novoNomeInput = ref('')

const nomesSugeridos = {
  boys: ['Miguel', 'Theo', 'João', 'Pedro', 'Rafael', 'Davi', 'Noah', 'Ian', 'Benício', 'Samuel'],
  girls: ['Alice', 'Sofia', 'Eva', 'Lia', 'Maia', 'Beatriz', 'Nina', 'Laura', 'Heloísa', 'Cecília'],
}

const listaNomesFiltrada = computed(() => {
  const custom = state.babyNames.map(n => n.nome) // Nomes que a mãe já tenha adicionado antes
  if (generoTemp.value === 'boys') return [...new Set([...nomesSugeridos.boys, ...custom])]
  if (generoTemp.value === 'girls') return [...new Set([...nomesSugeridos.girls, ...custom])]
  // Casal mistura
  return [...new Set([...nomesSugeridos.boys.slice(0,5), ...nomesSugeridos.girls.slice(0,5), ...custom])]
})

function toggleNome(nome) {
  const index = nomesEscolhidosTemp.value.indexOf(nome)
  if (index > -1) {
    nomesEscolhidosTemp.value.splice(index, 1)
  } else if (nomesEscolhidosTemp.value.length < 2) {
    nomesEscolhidosTemp.value.push(nome)
  }
}

function adicionarNomePersonalizado() {
  const nome = novoNomeInput.value.trim()
  if (nome && !listaNomesFiltrada.value.includes(nome)) {
    // Adiciona na store local de nomes extras se quiser
    const maxId = Math.max(...state.babyNames.map(n => n.id), 0)
    state.babyNames.push({ id: maxId + 1, nome, favoritado: false })
    toggleNome(nome)
    novoNomeInput.value = ''
  }
}

function concluirOnboarding() {
  state.chosenBabyNames = [...nomesEscolhidosTemp.value]
  state.onboardingCompleted = true
  state.currentScreen = 'semanas'
}

// ── Estética ──
const colors = computed(() => getPairColors())
const bgStyle = computed(() => ({
  background: `linear-gradient(160deg, var(--color-fundo) 0%, ${colors.value.bgFrom} 50%, ${colors.value.bgTo} 100%)`
}))

function particulaStyle(i) {
  const tops = [10, 20, 15, 75, 80, 30, 65, 85]
  const lefts = [10, 80, 45, 15, 70, 90, 5, 55]
  const sizes = [6, 8, 5, 7, 6, 5, 8, 4]
  const delays = [0, 2, 4, 1, 3, 5, 2, 4]
  const idx = i - 1
  return {
    top: tops[idx] + '%',
    left: lefts[idx] + '%',
    width: sizes[idx] + 'px',
    height: sizes[idx] + 'px',
    animationDelay: delays[idx] + 's',
    background: i % 2 === 0 ? colors.value.primary : colors.value.secondary
  }
}

const textoFala = computed(() => {
  if (passo.value === 1) return 'Como você sente seus bebês? Escolha o par que mais combina com eles.'
  if (passo.value === 2) return 'Como podemos chamar você? Digite seu nome.'
  if (passo.value === 3) return 'Quem está chegando? Dois meninos, duas meninas, ou um casal?'
  if (passo.value === 4) return 'Quais os nomes? Escolha dois nomes para os bebês.'
  return ''
})
</script>

<style scoped>
.onboarding-container {
  min-height: 100dvh;
  padding: 60px 20px 40px;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  transition: background 0.8s ease;
}

.particulas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.particula {
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
  animation: flutuar 6s ease-in-out infinite;
}

.btn-voltar, .btn-ouvir-onb {
  position: fixed;
  top: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-texto);
  z-index: 10;
}
.btn-voltar { left: 16px; }
.btn-ouvir-onb { right: 16px; }

.passo {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
}
.passo-centralizado {
  justify-content: center;
}

.passo-titulo {
  font-size: 1.6rem;
  color: var(--color-texto);
  margin-bottom: 8px;
  text-align: center;
}
.passo-sub {
  font-size: 1rem;
  color: var(--color-texto-claro);
  text-align: center;
  margin-bottom: 24px;
}

/* Passo 1: Pares */
.pares-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding-bottom: 20px;
}
.par-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: var(--radius-lg);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  text-align: left;
}
.par-card-ativo {
  border-color: var(--color-roxo);
  background: rgba(255,255,255,0.9);
  transform: scale(1.02);
}
.par-emojis {
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 4px;
}
.par-conexao { font-size: 1rem; color: var(--color-texto-claro); opacity: 0.5; }
.par-textos strong { display: block; font-size: 1.1rem; color: var(--color-texto); }
.par-textos small { color: var(--color-texto-claro); font-size: 0.9rem; }

/* Passo 2: Nome */
.input-area {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: var(--radius-xl);
  margin-bottom: 32px;
}
.input-icone { font-size: 1.8rem; }
.nome-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--font-titulo);
  font-size: 1.3rem;
  color: var(--color-texto);
  outline: none;
}
.btn-avancar {
  padding: 18px;
  border-radius: var(--radius-xl);
  background: var(--color-roxo);
  color: white;
  font-size: 1.2rem;
  font-family: var(--font-titulo);
  font-weight: 700;
  box-shadow: var(--shadow-media);
  transition: opacity 0.3s;
}
.btn-avancar.disabled { opacity: 0.5; pointer-events: none; }

/* Passo 3: Gêneros */
.generos-grid { display: flex; flex-direction: column; gap: 16px; }
.genero-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px;
  border-radius: var(--radius-xl);
  border: 2px solid transparent;
}
.genero-card-ativo { border-color: var(--color-roxo); background: rgba(255,255,255,0.9); }
.genero-icone { font-size: 3rem; }
.genero-label { font-family: var(--font-titulo); font-size: 1.2rem; font-weight: 700; color: var(--color-texto); }

/* Passo 4: Nomes */
.nomes-escolhidos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: var(--radius-xl);
  margin-bottom: 24px;
  border: 2px dashed rgba(167,139,219,0.3);
  transition: all 0.4s;
}
.escolhidos-prontos { border: 2px solid var(--color-roxo); background: rgba(255,255,255,0.9); }
.nome-slot { font-family: var(--font-titulo); font-size: 1.2rem; font-weight: 700; color: var(--color-texto-claro); opacity: 0.6; }
.nome-slot.preenchido { color: var(--color-roxo-intenso); opacity: 1; }
.nome-slot-coracao { font-size: 1.5rem; animation: pulsar-suave 2s infinite; }

.nomes-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}
.nome-pill {
  padding: 10px 20px;
  border-radius: var(--radius-full);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-texto);
  border: 2px solid transparent;
}
.nome-pill-ativo {
  background: var(--color-roxo-claro);
  border-color: var(--color-roxo);
}

.novo-nome-area { display: flex; gap: 8px; margin-bottom: 32px; }
.novo-nome-input { flex: 1; border-radius: var(--radius-full); padding: 12px 20px; border: none; font-size: 1rem; font-family: var(--font-titulo); outline: none; }
.btn-add-nome { width: 44px; height: 44px; border-radius: 50%; background: var(--color-roxo); color: white; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; }

.btn-concluir {
  width: 100%;
  padding: 18px;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, var(--color-roxo-medio) 0%, var(--color-azul) 100%);
  color: white;
  font-size: 1.3rem;
  font-family: var(--font-titulo);
  font-weight: 700;
  box-shadow: var(--shadow-forte);
}
</style>
