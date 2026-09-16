<template>
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="icon-agua">
    <!-- Onda principal -->
    <path d="M10 65 Q30 45 50 65 Q70 85 90 65 Q100 55 110 65 L110 110 Q60 115 10 110 Z"
          fill="url(#agua-grad)" opacity="0.8"/>
    <!-- Onda secundária -->
    <path d="M10 75 Q35 55 55 75 Q75 95 95 75 Q105 65 110 75 L110 110 Q60 115 10 110 Z"
          fill="url(#agua-grad2)" opacity="0.5"/>
    <!-- Gotinhas decorativas -->
    <circle cx="40" cy="38" r="5" fill="#A0DDD6" opacity="0.6"/>
    <circle cx="55" cy="28" r="3" fill="#D0F0ED" opacity="0.5"/>
    <circle cx="70" cy="35" r="4" fill="#74C9BE" opacity="0.4"/>
    <!-- Brilho -->
    <ellipse cx="50" cy="62" rx="8" ry="4" fill="rgba(255,255,255,0.3)" transform="rotate(-10 50 62)"/>
    <defs>
      <linearGradient id="agua-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#D0F0ED"/>
        <stop offset="100%" stop-color="#74C9BE"/>
      </linearGradient>
      <linearGradient id="agua-grad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#A0DDD6"/>
        <stop offset="100%" stop-color="#55B5A8"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
.icon-agua {
  filter: drop-shadow(0 4px 12px rgba(116, 201, 190, 0.4));
}
</style>
