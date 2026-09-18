<template>
  <div class="saude-container fade-slide-enter-active">
    <header class="saude-header">
      <BotaoOuvir class="btn-ouvir-saude" texto-para-ler="Acompanhamento e saúde. Aqui você pode registrar seus dados e ver dicas de uma dieta balanceada." />
      <h1 class="titulo">Acompanhamento</h1>
      <p class="subtitulo">Seus dados e dicas para uma gestação saudável.</p>
    </header>

    <div class="saude-content">
      <!-- Seção: Meus Dados -->
      <section class="secao-dados glass">
        <h2 class="secao-titulo">
          <span class="emoji-titulo">📊</span> Meus Dados
        </h2>
        <p class="dica-dados">Registre aqui para ter sempre à mão nas consultas.</p>

        <div class="grid-dados">
          <div class="campo-dado">
            <label>Peso (kg)</label>
            <input type="number" v-model="pesoTemp" @blur="salvarDados" placeholder="Ex: 65.5" step="0.1" />
          </div>
          <div class="campo-dado">
            <label>Altura (m)</label>
            <input type="number" v-model="alturaTemp" @blur="salvarDados" placeholder="Ex: 1.65" step="0.01" />
          </div>
          
          <div class="campo-dado">
            <label>Tipo Sang. {{ state.motherName ? '(' + state.motherName + ')' : '(Mamãe)' }}</label>
            <select v-model="sangueMaeTemp" @change="salvarDados">
              <option value="">Selecione...</option>
              <option v-for="tipo in tiposSanguineos" :key="tipo" :value="tipo">{{ tipo }}</option>
            </select>
          </div>

          <div v-if="state.partnerName" class="campo-dado">
            <label>Tipo Sang. ({{ state.partnerName }})</label>
            <select v-model="sanguePaiTemp" @change="salvarDados">
              <option value="">Selecione...</option>
              <option v-for="tipo in tiposSanguineos" :key="tipo" :value="tipo">{{ tipo }}</option>
            </select>
          </div>
        </div>

        <!-- Feedback de Salvamento -->
        <Transition name="fade">
          <div v-if="salvo" class="msg-salvo">Dados salvos com sucesso! ✨</div>
        </Transition>
      </section>

      <!-- Seção: Meus Indicadores -->
      <section class="secao-indicadores" v-if="imc || rhIncompativel">
        <h2 class="secao-titulo">
          <span class="emoji-titulo">🩺</span> Meus Indicadores
        </h2>
        
        <div v-if="rhIncompativel" class="card-alerta glass-alerta">
          <div class="nutri-header">
            <span class="nutri-emoji">⚠️</span>
            <h3>Atenção ao Fator Rh</h3>
          </div>
          <p>Como você é Rh negativo (-) e o parceiro é Rh positivo (+), existe risco de incompatibilidade sanguínea. Converse com seu médico sobre a injeção de imunoglobulina anti-D.</p>
        </div>

        <div v-if="imc" class="card-indicador glass">
          <div class="nutri-header">
            <span class="nutri-emoji">⚖️</span>
            <h3>Índice de Massa Corporal (IMC)</h3>
          </div>
          <p class="imc-desc">A barra indica de baixo peso a obesidade, sendo o centro a zona de peso adequado.</p>
          <div class="imc-bar-container">
            <div class="imc-bar"></div>
            <div class="imc-pin" :style="{ left: imcPosicao + '%' }">
              <span>📍</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Seção: Nutrição e Dieta -->
      <section class="secao-nutricao">
        <h2 class="secao-titulo">
          <span class="emoji-titulo">🥗</span> Dieta Balanceada
        </h2>
        <p class="dica-dados">Baseado em recomendações da OMS e Ministério da Saúde.</p>

        <div class="cards-nutricao">
          <div class="card-nutri glass">
            <div class="nutri-header">
              <span class="nutri-emoji">💧</span>
              <h3>Hidratação é tudo</h3>
            </div>
            <p>Beba pelo menos 2 a 3 litros de água por dia. O volume do seu sangue aumenta muito na gravidez, e a água forma o líquido amniótico.</p>
          </div>

          <div class="card-nutri glass">
            <div class="nutri-header">
              <span class="nutri-emoji">💊</span>
              <h3>Os Essenciais</h3>
            </div>
            <p><strong>Ácido Fólico:</strong> Vital no início para o tubo neural.<br>
               <strong>Ferro:</strong> Previne anemia (carnes, feijão, folhas escuras). Consuma com Vitamina C (limão, laranja) para absorver melhor.<br>
               <strong>Cálcio:</strong> Para os ossinhos do bebê (leite, iogurte, queijos pasteurizados).</p>
          </div>

          <div class="card-nutri glass">
            <div class="nutri-header">
              <span class="nutri-emoji">🥑</span>
              <h3>Comida de verdade</h3>
            </div>
            <p>Descasque mais, desembale menos. Prefira frutas, legumes, grãos integrais e proteínas magras. Evite ultraprocessados, excesso de sal e açúcar.</p>
          </div>

          <div class="card-nutri glass-alerta">
            <div class="nutri-header">
              <span class="nutri-emoji">⚠️</span>
              <h3>O que evitar</h3>
            </div>
            <ul class="lista-evitar">
              <li>Carnes cruas ou mal passadas (risco de toxoplasmose).</li>
              <li>Peixes crus (sushi) e frutos do mar mal cozidos.</li>
              <li>Leite e queijos não pasteurizados.</li>
              <li>Álcool (não existe dose segura na gestação).</li>
              <li>Excesso de cafeína (limite a 1-2 xícaras de café por dia).</li>
            </ul>
          </div>
        </div>
      </section>
      
      <div class="espaco-bottom"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGemelar } from '../composables/useGemelar.js'
import BotaoOuvir from './BotaoOuvir.vue'

const { state } = useGemelar()

const tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

// Estados locais para inputs
const pesoTemp = ref(state.pesoAtual)
const alturaTemp = ref(state.altura)
const sangueMaeTemp = ref(state.tipoSanguineoMae)
const sanguePaiTemp = ref(state.tipoSanguineoPai)

const salvo = ref(false)

function salvarDados() {
  state.pesoAtual = pesoTemp.value
  state.altura = alturaTemp.value
  state.tipoSanguineoMae = sangueMaeTemp.value
  state.tipoSanguineoPai = sanguePaiTemp.value
  
  // Feedback visual rápido
  salvo.value = true
  setTimeout(() => {
    salvo.value = false
  }, 2000)
}

// Indicadores de Saúde
const imc = computed(() => {
  const p = parseFloat(pesoTemp.value)
  const a = parseFloat(alturaTemp.value)
  if (p > 0 && a > 0) {
    return (p / (a * a)).toFixed(1)
  }
  return null
})

const imcPosicao = computed(() => {
  if (!imc.value) return 0
  const valor = parseFloat(imc.value)
  // Mapear IMC 15 a 40 para 0% a 100%
  const min = 15
  const max = 40
  let p = ((valor - min) / (max - min)) * 100
  return Math.min(Math.max(p, 0), 100)
})

const rhIncompativel = computed(() => {
  const sMae = sangueMaeTemp.value
  const sPai = sanguePaiTemp.value
  if (sMae && sPai) {
    const maeRhNeg = sMae.includes('-')
    const paiRhPos = sPai.includes('+')
    return maeRhNeg && paiRhPos
  }
  return false
})
</script>

<style scoped>
.saude-container {
  padding: 24px 20px;
  max-height: 100vh;
  overflow-y: auto;
  padding-bottom: 120px;
}

.saude-header {
  margin-bottom: 24px;
  position: relative;
}

.btn-ouvir-saude {
  position: absolute;
  top: 0;
  right: 0;
}

.titulo {
  font-family: var(--font-titulo);
  font-size: 1.8rem;
  color: var(--color-texto-escuro);
  font-weight: 700;
  line-height: 1.2;
}

.subtitulo {
  color: var(--color-texto-claro);
  font-size: 0.95rem;
  margin-top: 6px;
  max-width: 85%;
}

.saude-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.secao-titulo {
  font-family: var(--font-titulo);
  font-size: 1.3rem;
  color: var(--color-roxo);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.emoji-titulo {
  font-size: 1.5rem;
}

.dica-dados {
  font-size: 0.85rem;
  color: var(--color-texto-claro);
  margin-bottom: 16px;
}

/* Meus Dados */
.secao-dados {
  padding: 20px;
  position: relative;
}

.grid-dados {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.campo-dado {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.campo-dado label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-roxo-escuro);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.campo-dado input,
.campo-dado select {
  width: 100%;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(167, 139, 219, 0.3);
  background: rgba(255, 255, 255, 0.6);
  font-family: var(--font-texto);
  font-size: 0.95rem;
  color: var(--color-texto-escuro);
  transition: all 0.2s ease;
}

.campo-dado input:focus,
.campo-dado select:focus {
  outline: none;
  border-color: var(--color-roxo);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(167, 139, 219, 0.15);
}

.msg-salvo {
  text-align: center;
  color: var(--color-texto);
  font-weight: 600;
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.5);
  padding: 8px;
  border-radius: 8px;
}

/* Indicadores */
.secao-indicadores {
  margin-top: 32px;
}

.card-indicador {
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
}

.card-alerta {
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
}

.imc-desc {
  font-size: 0.9rem;
  color: var(--color-texto-claro);
  margin-bottom: 16px;
  line-height: 1.4;
}

.imc-bar-container {
  position: relative;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.imc-bar {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 8px;
  transform: translateY(-50%);
  border-radius: 4px;
  background: linear-gradient(to right, #ff6b6b 0%, #ffd93d 25%, #6bcb77 50%, #ffd93d 75%, #ff6b6b 100%);
}

.imc-pin {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  z-index: 2;
}

/* Nutrição */
.cards-nutricao {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-nutri {
  padding: 16px;
}

.card-nutri p {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-texto-escuro);
}

.card-nutri strong {
  color: var(--color-roxo-escuro);
}

.nutri-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.nutri-header h3 {
  font-family: var(--font-titulo);
  font-size: 1.1rem;
  color: var(--color-roxo-escuro);
  font-weight: 600;
}

.nutri-emoji {
  font-size: 1.3rem;
}

/* Alerta */
.glass-alerta {
  background: rgba(255, 235, 238, 0.5); /* Fundo avermelhado leve */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 205, 210, 0.8);
  box-shadow: 0 4px 24px rgba(229, 115, 115, 0.08);
  border-radius: var(--radius-lg);
  padding: 16px;
}

.glass-alerta .nutri-header h3 {
  color: #c62828;
}

.lista-evitar {
  padding-left: 20px;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-texto-escuro);
}

.lista-evitar li {
  margin-bottom: 4px;
}

.espaco-bottom {
  height: 40px;
}

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
