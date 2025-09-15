// @ts-ignore
import { defineEventHandler, deleteCookie } from 'h3'
import { createBackendFetch } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const backendFetch = createBackendFetch(event)
  const res = await backendFetch('/api/admin/logout', { method: 'POST' } as any)
  deleteCookie(event, 'auth_token', { path: '/' })
  return res
})
