// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { articles } from './data/articles'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/articles',
        ...articles.map(a => `/articles/${a.slug}`)
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
