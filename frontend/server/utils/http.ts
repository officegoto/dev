// Use lazy import to avoid editor type issues; Nuxt provides these at runtime
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useRuntimeConfig } from '#imports'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { $fetch } from 'ofetch'

export function getApiBase(event: any): string {
  const config = useRuntimeConfig() as any
  const apiBase = (config.apiBase as string) || 'http://localhost'
  return apiBase
}

export function createBackendFetch(event: any) {
  const baseURL = getApiBase(event)
  const headers = (event?.node?.req?.headers || {}) as Record<string, string | string[] | undefined>
  const cookie = headers['cookie'] as string | undefined
  const authorization = headers['authorization'] as string | undefined
  return $fetch.create({
    baseURL,
    headers: {
      ...(cookie ? { cookie } : {}),
      ...(authorization ? { authorization } : {}),
    },
    timeout: 10_000,
  })
}


