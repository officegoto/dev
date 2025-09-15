// @ts-ignore
import { defineNuxtRouteMiddleware, useFetch, useRequestHeaders, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(async (to: any) => {
  const path: string = to.path
  if (!path.startsWith('/admin')) return
  if (path === '/admin/login') return

  const { data } = await useFetch('/api/auth/me', { headers: useRequestHeaders(['cookie']) as any })
  if (!data.value?.id) {
    return navigateTo('/admin/login')
  }
})


