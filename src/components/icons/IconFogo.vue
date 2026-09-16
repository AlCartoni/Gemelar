<template>
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="icon-fogo">
    <!-- Chama externa -->
    <path d="M60 15 Q45 45 38 60 Q30 78 42 95 Q52 108 60 108 Q68 108 78 95 Q90 78 82 60 Q75 45 60 15Z"
          fill="url(#fogo-grad)" opacity="0.9"/>
    <!-- Chama interna -->
    <path d="M60 40 Q52 58 48 70 Q44 82 52 92 Q56 98 60 98 Q64 98 68 92 Q76 82 72 70 Q68 58 60 40Z"
          fill="url(#fogo-grad2)" opacity="0.8"/>
    <!-- Brilho central -->
    <ellipse cx="58" cy="78" rx="6" ry="10" fill="rgba(255,255,255,0.3)"/>
    <defs>
      <linearGradient id="fogo-grad" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#FFD9BE"/>
        <stop offset="50%" stop-color="#FFB88A"/>
        <stop offset="100%" stop-color="#FFA066"/>
      </linearGradient>
      <linearGradient id="fogo-grad2" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#FFF0C8"/>
        <stop offset="100%" stop-color="#FFD9BE"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
.icon-fogo {
  filter: drop-shadow(0 4px 12px rgba(255, 160, 102, 0.4));
}
</style>
