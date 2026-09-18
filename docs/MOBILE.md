# Gemelar Mobile — Guia Capacitor

Este documento descreve como compilar e testar o app Gemelar como aplicação nativa Android usando [Capacitor](https://capacitorjs.com).

---

## Pré-requisitos

| Ferramenta        | Versão mínima | Verificar com               |
| ----------------- | ------------- | --------------------------- |
| Node.js           | 18+           | `node -v`                   |
| npm               | 9+            | `npm -v`                    |
| Android Studio    | Hedgehog+     | Menu → About                |
| JDK               | 17+           | `java -version`             |
| Android SDK       | API 34+       | Android Studio SDK Manager  |

> [!NOTE]
> O Android Studio é necessário para compilar e rodar o APK. Baixe em [developer.android.com/studio](https://developer.android.com/studio).

---

## Configuração do Capacitor

O arquivo `capacitor.config.json` na raiz contém:

```json
{
  "appId": "com.gemelar.app",
  "appName": "Gemelar",
  "webDir": "dist"
}
```

- **appId** — Identificador único do app (formato reverse-domain).
- **appName** — Nome exibido no dispositivo.
- **webDir** — Pasta com os assets compilados pelo Vite.

---

## Comandos essenciais

### 1. Instalar dependências

```bash
npm install
```

### 2. Build para mobile

```bash
npm run build:cap
```

Executa `vite build --mode capacitor`, usando as variáveis de `.env.capacitor`.

### 3. Sincronizar com o projeto nativo

```bash
npx cap sync android
```

Copia os assets de `dist/` para o projeto Android e atualiza plugins nativos.

### 4. Abrir no Android Studio

```bash
npx cap open android
```

Abre o projeto Android no Android Studio para compilar, debugar e gerar APK/AAB.

### 5. Live Reload durante desenvolvimento

```bash
# Terminal 1 — servidor Vite
npm run dev

# Terminal 2 — (opcional) sincronizar mudanças
npx cap sync android
```

Para Live Reload no dispositivo, adicione ao `capacitor.config.json`:

```json
{
  "server": {
    "url": "http://SEU_IP_LOCAL:5173",
    "cleartext": true
  }
}
```

> [!WARNING]
> Remova a seção `server` antes de gerar builds de produção/release.

---

## Fluxo completo (resumo)

```
npm run build:cap  →  npx cap sync android  →  npx cap open android  →  ▶ Run no Android Studio
```

---

## Estrutura de pastas (adições do Capacitor)

```
Gemelar/
├── android/                  ← Projeto nativo Android (gerado)
│   ├── app/
│   │   └── src/main/
│   │       ├── assets/public/ ← Cópia do dist/
│   │       └── ...
│   └── ...
├── capacitor.config.json     ← Configuração do Capacitor
├── .env.capacitor            ← Variáveis de ambiente para build mobile
└── ...
```

---

## Gerando APK de Release

1. Abra o projeto no Android Studio: `npx cap open android`
2. Menu: **Build → Generate Signed Bundle / APK**
3. Siga o wizard para criar ou selecionar uma keystore
4. O APK/AAB será gerado em `android/app/build/outputs/`

---

## Solução de problemas

| Problema | Solução |
| -------- | ------- |
| `capacitor.config.json not found` | Execute `npx cap init` na raiz do projeto |
| Tela branca no WebView | Verifique se `dist/` foi gerado (`npm run build:cap`) |
| Assets desatualizados no device | Execute `npx cap sync android` novamente |
| Erro de rede / API | Confira `VITE_API_URL` em `.env.capacitor` |
