// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defineEventHandler, getRouterParam, createError, setResponseHeader } from 'h3'
import { createBackendFetch, mapBackendArticle } from '../../utils/bff'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'slug is required' })

  try {
    const backendFetch = createBackendFetch(event)
    const a = await backendFetch(`/api/articles/${slug}`)
    setResponseHeader(event, 'Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')
    return mapBackendArticle(a as any)
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: 'Upstream fetch failed', data: { message: err?.message } })
  }
})


