import {createError, useAsyncData, useNuxtApp, useRoute, useRuntimeConfig} from "nuxt/app";

export default async (ssr: boolean = true) => {
  const nuxtApp = useNuxtApp()

  const { umbracoPreviewApiKey } = useRuntimeConfig()
  const { query, path } = useRoute()

  const {
    data: pageData,
    error,
    refresh
  } = await useAsyncData(
    `pageData-${path}`,
    () =>
      $fetch(`/content/${path}`, {
      }).then(input => ({
          ...(input as Record<string, unknown>),
        fetchedAt: new Date()
      })),
    {
      server: ssr,
      dedupe: 'defer',
      getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        if (!data) return
        const expirationDate = new Date(data.fetchedAt)
        expirationDate.setTime(expirationDate.getTime() + 5 * 1000)
        if (expirationDate.getTime() < Date.now()) return
        return data
      }
    }
  )

  if (error.value?.statusCode === 404) {
    throw createError({ statusCode: 404, statusMessage: 'Side ikke fundet', message: 'Side ikke fundet', fatal: true })
  }

  if (error.value?.statusCode === 500) {
    throw createError({
      statusCode: 500,
      statusMessage: error.value?.message,
      message: error.value?.message,
      fatal: true
    })
  }

  return { pageData, error, refresh }
}
