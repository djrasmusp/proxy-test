<template>
  <div>
    <NuxtLink to="/">Index</NuxtLink><br>
    <NuxtLink to="/1">Page1</NuxtLink><br>
    <NuxtLink to="/2">Page2</NuxtLink><br>
  <div>
    {{ data }}
  </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetchSiteSettings} from "../../.nuxt/imports";

const { data } = await useFetchSiteSettings()

</script>

<style lang="postcss" scoped>
.v-enter-active,
.v-leave-active {
  @apply transition-opacity;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
