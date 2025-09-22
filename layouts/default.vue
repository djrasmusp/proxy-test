<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader
    />
    <main class="flex-1">
      <NuxtPage />
    </main>
  </div>
</template>

<script lang="ts" setup>

</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
