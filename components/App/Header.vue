<template>
  <div>
    <NuxtLink v-for="index in 10" :to="`/${index}`" :key="index">Page {{ index}}</NuxtLink><br>
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
