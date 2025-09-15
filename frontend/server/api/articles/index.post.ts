// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defineEventHandler, readBody, createError } from 'h3'
import { createBackendFetch } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  try {
    const backendFetch = createBackendFetch(event)
    const res = await backendFetch('/api/admin/articles', {
      method: 'POST',
      body,
    } as any)
    return res
  } catch (err: any) {
    const statusCode = Number(err?.response?.status) || 502
    const statusMessage = statusCode === 422 ? 'Validation failed' : 'Upstream fetch failed'
    throw createError({ statusCode, statusMessage, data: { message: err?.message, errors: err?.response?._data?.errors } })
  }
})


