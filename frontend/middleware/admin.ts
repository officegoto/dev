// @ts-ignore
import { defineNuxtRouteMiddleware, useFetch, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(async (to: any) => {
  const path: string = to.path
  if (!path.startsWith('/admin')) return
  if (path === '/admin/login') return

  // /admin/** は SPA (ssr: false) のため Cookie はブラウザから自動送信される
  const { data } = await useFetch('/api/auth/me', { method: 'GET' })
  if (!data.value?.id) {
    const redirect = encodeURIComponent(path)
    return navigateTo(`/admin/login?redirect=${redirect}`)
  }
})


