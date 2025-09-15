// @ts-ignore
import { defineEventHandler } from 'h3'
import { createBackendFetch } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const backendFetch = createBackendFetch(event)
  const res = await backendFetch('/api/admin/me')
  return res
})
