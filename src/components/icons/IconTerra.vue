<template>
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="icon-terra">
    <!-- Montanha -->
    <path d="M15 100 L50 35 L65 60 L80 40 L105 100 Z" fill="url(#terra-grad)" opacity="0.85"/>
    <!-- Montanha atrás -->
    <path d="M30 100 L60 50 L90 100 Z" fill="url(#terra-grad2)" opacity="0.4"/>
    <!-- Folhinha -->
    <path d="M58 28 Q68 18 72 28 Q68 30 62 32 Q58 30 58 28Z" fill="#8FBF7F" opacity="0.8"/>
    <line x1="65" y1="28" x2="65" y2="36" stroke="#8FBF7F" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    <!-- Grama suave -->
    <ellipse cx="60" cy="102" rx="50" ry="6" fill="#D2E8C8" opacity="0.5"/>
    <defs>
      <linearGradient id="terra-grad" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#AED49A"/>
        <stop offset="100%" stop-color="#8FBF7F"/>
      </linearGradient>
      <linearGradient id="terra-grad2" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#D2E8C8"/>
        <stop offset="100%" stop-color="#AED49A"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
.icon-terra {
  filter: drop-shadow(0 4px 12px rgba(143, 191, 127, 0.4));
}
</style>
