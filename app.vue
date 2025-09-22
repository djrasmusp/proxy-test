<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
.nuxt-loading-indicator {
  top: 0 !important;
  bottom: 0;
  height: auto !important;
  width: 100vw !important;
  transition: none !important;
  transform: none !important;
  background: rgba(255, 255, 255, 0.5) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10 !important;
}
</style>
