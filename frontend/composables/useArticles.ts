import { computed } from 'vue'
import { articles as rawArticles } from '~/data/articles'
import type { Article } from '~/types/article'

function sortArticlesByDateDesc(list: Article[]): Article[] {
  return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function useArticles() {
  const articles = computed<Article[]>(() => sortArticlesByDateDesc(rawArticles))

  function getBySlug(slug: string): Article | undefined {
    return rawArticles.find(a => a.slug === slug)
  }

  function getAllSlugs(): string[] {
    return rawArticles.map(a => a.slug)
  }

  function getRoutes(): string[] {
    return getAllSlugs().map(slug => `/articles/${slug}`)
  }

  function getAllTags(): string[] {
    const set = new Set<string>()
    rawArticles.forEach(a => (a.tags || []).forEach(t => set.add(t)))
    return Array.from(set).sort()
  }

  return { articles, getBySlug, getAllSlugs, getRoutes, getAllTags }
}


