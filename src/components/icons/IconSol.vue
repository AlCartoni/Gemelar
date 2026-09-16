<template>
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="icon-sol">
    <!-- Raios suaves -->
    <g opacity="0.4">
      <line x1="60" y1="8" x2="60" y2="22" stroke="#FFD166" stroke-width="3" stroke-linecap="round"/>
      <line x1="60" y1="98" x2="60" y2="112" stroke="#FFD166" stroke-width="3" stroke-linecap="round"/>
      <line x1="8" y1="60" x2="22" y2="60" stroke="#FFD166" stroke-width="3" stroke-linecap="round"/>
      <line x1="98" y1="60" x2="112" y2="60" stroke="#FFD166" stroke-width="3" stroke-linecap="round"/>
      <line x1="23" y1="23" x2="33" y2="33" stroke="#FFE08A" stroke-width="3" stroke-linecap="round"/>
      <line x1="87" y1="23" x2="97" y2="33" stroke="#FFE08A" stroke-width="3" stroke-linecap="round"/>
      <line x1="23" y1="97" x2="33" y2="87" stroke="#FFE08A" stroke-width="3" stroke-linecap="round"/>
      <line x1="87" y1="97" x2="97" y2="87" stroke="#FFE08A" stroke-width="3" stroke-linecap="round"/>
    </g>
    <!-- Círculo principal -->
    <circle cx="60" cy="60" r="28" fill="url(#sol-grad)" />
    <!-- Brilho -->
    <circle cx="52" cy="50" r="8" fill="rgba(255,255,255,0.4)" />
    <!-- Sorriso sutil -->
    <path d="M50 68 Q60 76 70 68" stroke="rgba(200,150,50,0.4)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <defs>
      <radialGradient id="sol-grad" cx="40%" cy="40%">
        <stop offset="0%" stop-color="#FFF0C8"/>
        <stop offset="60%" stop-color="#FFE08A"/>
        <stop offset="100%" stop-color="#FFD166"/>
      </radialGradient>
    </defs>
  </svg>
</template>

<style scoped>
.icon-sol {
  filter: drop-shadow(0 4px 12px rgba(255, 209, 102, 0.4));
}
</style>
