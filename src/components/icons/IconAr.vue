<template>
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="icon-ar">
    <!-- Nuvem principal -->
    <ellipse cx="58" cy="60" rx="30" ry="18" fill="url(#ar-grad)" opacity="0.85"/>
    <ellipse cx="42" cy="56" rx="18" ry="14" fill="#D4F1F9" opacity="0.7"/>
    <ellipse cx="72" cy="58" rx="16" ry="12" fill="#D4F1F9" opacity="0.6"/>
    <!-- Nuvem superior -->
    <ellipse cx="55" cy="50" rx="14" ry="10" fill="white" opacity="0.5"/>
    <!-- Brisas -->
    <line x1="25" y1="80" x2="45" y2="80" stroke="#A8E0EE" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    <line x1="35" y1="86" x2="60" y2="86" stroke="#A8E0EE" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
    <line x1="30" y1="92" x2="50" y2="92" stroke="#D4F1F9" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
    <defs>
      <radialGradient id="ar-grad" cx="40%" cy="40%">
        <stop offset="0%" stop-color="white"/>
        <stop offset="50%" stop-color="#D4F1F9"/>
        <stop offset="100%" stop-color="#A8E0EE"/>
      </radialGradient>
    </defs>
  </svg>
</template>

<style scoped>
.icon-ar {
  filter: drop-shadow(0 4px 12px rgba(168, 224, 238, 0.4));
}
</style>
