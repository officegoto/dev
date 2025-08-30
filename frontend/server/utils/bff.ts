export type BackendArticle = {
  slug: string
  title: string
  summary: string | null
  content?: string | null
  tags: string[] | null
  created_at: string
}

export type Article = {
  slug: string
  title: string
  summary: string
  content?: string
  tags?: string[]
  createdAt: string
}

// Use lazy import to avoid editor type issues; Nuxt provides these at runtime
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useRuntimeConfig } from '#imports'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { $fetch } from 'ofetch'

export function getApiBase(event: any): string {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string) || 'http://localhost'
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

export function mapBackendArticle(a: BackendArticle): Article {
  return {
    slug: a.slug,
    title: a.title,
    summary: a.summary ?? '',
    content: a.content ?? undefined,
    tags: a.tags ?? undefined,
    createdAt: a.created_at,
  }
}

export function mapBackendArticles(list: BackendArticle[]): Article[] {
  return list.map(mapBackendArticle)
}


