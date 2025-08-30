// Nitropack runtime provides h3 under the hood; avoid direct type imports for editor
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defineEventHandler, createError, setResponseHeader } from 'h3'
import { createBackendFetch, mapBackendArticles } from '../utils/bff'

export default defineEventHandler(async (event) => {
  try {
    const backendFetch = createBackendFetch(event)
    const list = await backendFetch('/api/articles')
    setResponseHeader(event, 'Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')
    return mapBackendArticles(list as any)
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: 'Upstream fetch failed', data: { message: err?.message } })
  }
})


