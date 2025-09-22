<script setup lang="ts">

  import {useFetchPageData} from "../.nuxt/imports";

  const { pageData } = await useFetchPageData()
</script>

<template>
<div>
  <h1>Page1</h1>
    --------<br>
    {{ pageData }}
</div>
</template>