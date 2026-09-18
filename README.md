# 👶👶 Gemelar

> App para acompanhamento de gestação — gemelar ou única — feito com carinho para mães, pais e parceiros.

![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-8-119eff?logo=capacitor&logoColor=white)
![Android](https://img.shields.io/badge/Android-nativo-3ddc84?logo=android&logoColor=white)

---

## ✨ Sobre o Projeto

O **Gemelar** nasceu como o oposto do que existe no mercado: um app de gestação **leve, acolhedor e sem ansiedade**. Enquanto outros apps jogam toneladas de informação médica na tela e focam exclusivamente na mãe, o Gemelar é:

- **Simples** — uma coisa por vez, sem sobrecarga
- **Inclusivo** — suporta gestação **gemelar** e **gestação única**, com parceiro **opcional**
- **Gentil** — linguagem afetiva, sem alertas assustadores
- **Bonito** — design moderno com glassmorphism, animações suaves e gradientes

---

## 📱 Funcionalidades

### 🔀 Onboarding Personalizado
- Escolha do tipo de gestação: **Gêmeos** ou **Gestação Única**
- Para gêmeos: escolha entre idênticos, fraternos ou "ainda não sei"
- Slider de semana adaptado (4–38 para gêmeos, 4–40 para gestação única)
- Data provável do parto (DPP) — opcional
- **Parceiro/a opcional** — campo discreto no último passo

### 📅 Tela de Semanas
- Tamanho dos bebês comparado a frutas/objetos
- Medidas: comprimento e peso por semana
- Marco de desenvolvimento da semana
- Frase afetiva e texto de carinho
- Cuidados semanais leves (2–3 itens)
- Sistema de conquistas por semana
- Barra de progresso da gestação com trimestres
- Navegação entre semanas (anterior/próxima)
- Textos adaptativos: "seu bebê" vs "seus bebês"

### 📖 Diário / Nossa História
- Área livre para escrever sentimentos e memórias
- Seletor de autor (Mamãe / nome do parceiro) — só aparece se parceiro cadastrado
- Frases de incentivo diárias adaptadas ao tipo de gestação
- Histórico de entradas com visualização expansível
- Entradas coloridas por autor (roxo = mãe, azul = parceiro)

### 🩺 Acompanhamento (Saúde)
- **IMC Visual:** Cálculo silencioso do Índice de Massa Corporal através de uma barra em degradê (sem exposição de números frios), exibindo apenas a zona de peso adequado.
- **Alerta de Fator Rh:** Checagem cruzada automática. Caso a mãe seja Rh Negativo e o parceiro Rh Positivo, o app sugere proativamente orientação médica sobre a imunoglobulina anti-D.
- Registro contínuo de Peso, Altura e Tipos Sanguíneos.

### 🎮 Sistema de XP e Níveis
- Ganhe XP ao completar o onboarding (+50 XP)
- Ganhe XP ao escrever no diário (+15 XP)
- Ganhe XP ao ler cuidados da semana (+10 XP)
- Títulos de nível neutros: "Família Nascendo" → "Família Lendária"

---

## 🛠️ Stack Tecnológica

| Categoria | Tecnologia |
|---|---|
| Framework | Vue 3 + Composition API + `<script setup>` |
| Build | Vite 6 |
| Linguagem | JavaScript (ESM) |
| Animações | Motion-V |
| App Nativo | Capacitor 8 |
| Android Build | Gradle + Android Studio |
| Persistência | localStorage (via composable reativo) |
| Deploy Web | Netlify |

---

## 📁 Estrutura do Projeto

```
gemelar/
├── src/
│   ├── App.vue                   # Raiz — roteamento entre telas
│   ├── main.js                   # Ponto de entrada Vue
│   ├── assets/                   # Fontes, imagens, estilos globais
│   ├── components/
│   │   ├── TelaOnboarding.vue    # Onboarding personalizado
│   │   ├── TelaSemanas.vue       # Tela principal — semana atual
│   │   ├── TelaDiario.vue        # Diário / Nossa História
│   │   ├── TelaAcompanhamento.vue# Saúde e indicadores (IMC, Rh)
│   │   ├── TelaDuvidas.vue       # Perguntas frequentes
│   │   ├── NavBar.vue            # Navegação inferior
│   │   └── BotaoOuvir.vue        # Leitura em voz alta (TTS)
│   └── composables/
│       ├── useGemelar.js         # Estado global + persistência
│       ├── useSemanaData.js      # Dataset gemelar (4–38) + único (4–40)
│       └── useSpeech.js          # Web Speech API
├── android/                      # Projeto Android (Capacitor)
│   └── local.properties          # Caminho do SDK (não versionado)
├── docs/
│   └── MOBILE.md                 # Guia de build Android
├── capacitor.config.json         # Configuração do Capacitor
├── vite.config.js
├── index.html
└── package.json
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- npm

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/gemelar.git
cd gemelar

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

O app abrirá em `http://localhost:5173`.

---

## 📲 Build para Android

### Pré-requisitos
- Android Studio instalado
- Android SDK configurado
- JDK 21 (Temurin recomendado — versões superiores podem causar erro de compatibilidade)

### Configurar o SDK

Crie ou edite o arquivo `android/local.properties`:

```properties
sdk.dir=C\:\\Users\\seu-usuario\\AppData\\Local\\Android\\Sdk
```

### Fluxo de Build

```bash
# 1. Gerar build de produção
npm run build:cap

# 2. Sincronizar com Android
npx cap sync android

# 3. Abrir no Android Studio
npx cap open android
```

No Android Studio, clique em **▶ Run** para instalar no emulador ou dispositivo.

### Emulador com Pouco Espaço em C:

Se o emulador reclamar de falta de espaço, mude o diretório dos AVDs:

1. Crie a pasta `E:\AndroidAVD` (ou outro disco com espaço livre)
2. Adicione nas variáveis de ambiente do Windows:
   - **Nome:** `ANDROID_AVD_HOME`
   - **Valor:** `E:\AndroidAVD`
3. Reinicie o Android Studio e recrie o emulador

---

## 🎨 Filosofia de Design

| Evitamos | Fazemos |
|---|---|
| Toneladas de informação médica | Uma coisa importante por semana |
| Alertas e riscos assustadores | Linguagem afetiva e encorajadora |
| Foco exclusivo na mãe | Inclusão do parceiro (opcional) |
| Interface lotada | Espaço para respirar + glassmorphism |
| App genérico | Personalizado: gemelar ou única |

---

## 🗂️ Dados por Semana

Dois datasets completos:

| Dataset | Semanas | Uso |
|---|---|---|
| `semanas` (gemelar) | 4 → 38 | Gestação de gêmeos |
| `semanasUnica` | 4 → 40 | Gestação única |

Cada semana contém: `emoji`, `tamanho`, `peso`, `comprimento`, `marco`, `frase`, `carinho`, `cuidados[]`.

---

## 🔐 Privacidade

O Gemelar **não coleta nenhum dado externo**. Tudo (nome, semana, diário) fica salvo apenas no `localStorage` do dispositivo. Nenhuma informação é enviada para servidores.

---

## 🛣️ Roadmap

- [ ] Notificações semanais (Capacitor Local Notifications)
- [ ] Galeria de fotos da gestação
- [ ] Compartilhamento de marcos com parceiro
- [ ] Suporte a iOS
- [ ] Modo offline completo (PWA)
- [ ] Temas de cores personalizáveis

---

Feito com 💜 para famílias que estão começando.
