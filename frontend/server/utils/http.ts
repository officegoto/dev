// @ts-ignore
import { useRuntimeConfig } from '#imports'
// @ts-ignore
import { $fetch } from 'ofetch'
// @ts-ignore
import { getCookie } from 'h3'

export function getApiBase(event: any): string {
  const config = useRuntimeConfig() as any
  const apiBase = (config.apiBase as string) || 'http://localhost'
  return apiBase
}

export function createBackendFetch(event: any) {
  const baseURL = getApiBase(event)
  const headers = (event?.node?.req?.headers || {}) as Record<string, string | string[] | undefined>
  const cookieHeader = headers['cookie'] as string | undefined
  let authorization = headers['authorization'] as string | undefined

  // Authorization が未設定の場合、クッキーの auth_token から生成する
  const token = getCookie(event, 'auth_token')
  if (!authorization && token) {
    authorization = `Bearer ${token}`
  }

  return $fetch.create({
    baseURL,
    headers: {
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
      ...(authorization ? { authorization } : {}),
    },
    timeout: 10_000,
  })
}


