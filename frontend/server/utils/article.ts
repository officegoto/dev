import type { Article } from '../../types/article'

export type BackendArticle = {
  slug: string
  title: string
  summary: string | null
  content?: string | null
  tags: string[] | null
  created_at: string
}

export function mapBackendArticle(a: BackendArticle): Article {
  return {
    slug: a.slug,
    title: a.title,
    summary: a.summary ?? '',
    content: a.content ?? '',
    tags: a.tags ?? undefined,
    createdAt: a.created_at,
  }
}

export function mapBackendArticles(list: BackendArticle[]): Article[] {
  return list.map(mapBackendArticle)
}



