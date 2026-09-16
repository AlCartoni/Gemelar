<template>
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="icon-lua">
    <!-- Lua crescente -->
    <circle cx="55" cy="60" r="32" fill="url(#lua-grad)" />
    <circle cx="70" cy="48" r="24" fill="var(--color-fundo, #FAFAFE)" />
    <!-- Estrelinhas ao redor -->
    <g opacity="0.6">
      <circle cx="88" cy="30" r="2" fill="#C5AEEA"/>
      <circle cx="95" cy="50" r="1.5" fill="#E0D4F5"/>
      <circle cx="82" cy="72" r="1.8" fill="#C5AEEA"/>
      <circle cx="100" cy="68" r="1.2" fill="#E0D4F5"/>
      <circle cx="78" cy="26" r="1.4" fill="#E0D4F5"/>
    </g>
    <!-- Brilho suave -->
    <circle cx="44" cy="50" r="6" fill="rgba(255,255,255,0.3)" />
    <defs>
      <radialGradient id="lua-grad" cx="35%" cy="35%">
        <stop offset="0%" stop-color="#E0D4F5"/>
        <stop offset="60%" stop-color="#C5AEEA"/>
        <stop offset="100%" stop-color="#A78BDB"/>
      </radialGradient>
    </defs>
  </svg>
</template>

<style scoped>
.icon-lua {
  filter: drop-shadow(0 4px 12px rgba(167, 139, 219, 0.4));
}
</style>
