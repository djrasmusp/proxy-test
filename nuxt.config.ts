import { defineNuxtConfig} from "nuxt/config";
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({

  routeRules: {
    '/content/**': {
      proxy:
        (process.env.NUXT_UMBRACO_URL || '#{UMBRACO_URL}') + '/**'
    },
  },

  runtimeConfig: {
    umbracoUrl: '#{UMBRACO_URL}',
    public: {
      baseUrl: process.env.NUXT_UMBRACO_URL || '#{UMBRACO_URL}',
    }
  },

  devtools: {
    enabled: false
  },

  // Add gzip to nuxt server
  compatibilityDate: '2024-08-13',
  $production: {
    nitro: {
      compressPublicAssets: true,
      publicAssets: [
        {
          baseURL: 'images',
          dir: 'public/images',
          maxAge: 60 * 60 * 24 * 7
        }
      ]
    }
  }
})
