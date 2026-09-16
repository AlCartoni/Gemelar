import { ref, watch } from 'vue'

/**
 * useSpeech — Composable para ler textos em voz alta
 * Usa Web Speech API (SpeechSynthesis) com voz pt-BR
 * Tom calmo, velocidade reduzida
 */
export function useSpeech() {
  const isSpeaking = ref(false)
  const isSupported = ref('speechSynthesis' in window)

  let currentUtterance = null

  function speak(text) {
    if (!isSupported.value) return

    // Para qualquer fala anterior
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    utterance.rate = 0.85  // Velocidade calma
    utterance.pitch = 1.1  // Tom levemente mais alto (mais suave)
    utterance.volume = 0.9

    // Tenta encontrar uma voz pt-BR
    const voices = window.speechSynthesis.getVoices()
    const ptVoice = voices.find(v => v.lang.startsWith('pt-BR')) ||
                    voices.find(v => v.lang.startsWith('pt'))
    if (ptVoice) {
      utterance.voice = ptVoice
    }

    utterance.onstart = () => { isSpeaking.value = true }
    utterance.onend = () => { isSpeaking.value = false }
    utterance.onerror = () => { isSpeaking.value = false }

    currentUtterance = utterance
    window.speechSynthesis.speak(utterance)
  }

  function stop() {
    window.speechSynthesis.cancel()
    isSpeaking.value = false
  }

  function toggle(text) {
    if (isSpeaking.value) {
      stop()
    } else {
      speak(text)
    }
  }

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
    toggle,
  }
}
