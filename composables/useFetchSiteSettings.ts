import {createError, useFetch, useNuxtApp, useRoute, useRuntimeConfig} from "nuxt/app";

export default async (ssr: boolean = true) => {
  const config = useRuntimeConfig()
  const { path } = useRoute()

  const nuxtApp = useNuxtApp()
  const { data, error, refresh } = await useFetch(`/content/${path}`, {
    server: ssr,
    transform(input : unknown) {
      return {
          ...(input as Record<string, unknown>),
        fetchedAt: new Date()
      }
    },
    getCachedData(key) {
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      // If data is not fetched yet
      if (!data) {
        // Fetch the first time
        return
      }

      // Is the data too old?
      const expirationDate = new Date(data.fetchedAt)
      expirationDate.setTime(expirationDate.getTime() + 300 * 1000)
      const isExpired = expirationDate.getTime() < Date.now()
      if (isExpired) {
        // Refetch the data
        return
      }

      return data
    }
  })
  if (error.value && error.value.statusCode === 500) {
    throw createError({
      statusCode: 500,
      statusMessage: error.value?.message,
      message: error.value?.message
    })
  }

  if (!data.value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Data object is empty. Please setup site data in Umbraco',
      message: 'Data object is empty. Please setup site data in Umbraco'
    })
  }

  return {
    data,
    error,
    refresh,
  }
}
