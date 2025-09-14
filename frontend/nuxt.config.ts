// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    // Private (server-only). Clientは参照しない
    apiBase: process.env.NUXT_API_BASE ?? process.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost',
    public: {}
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/articles'
      ]
    }
  },
  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt 3 Static Blog Sample' }
      ]
    }
  }
})
