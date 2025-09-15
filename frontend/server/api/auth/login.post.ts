// @ts-ignore
import { defineEventHandler, readBody, createError, setCookie } from 'h3'
import { createBackendFetch } from '../../utils/http'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body || typeof body !== 'object') {
      throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
    }
    const { email, password } = body as { email?: string; password?: string }
    if (!email || !password) throw createError({ statusCode: 400, statusMessage: 'email and password are required' })

    const backendFetch = createBackendFetch(event)
    // Sanctum の SPA モード用: 先に CSRF クッキーを取得する
    const res = await backendFetch('/api/admin/login', {
      method: 'POST',
      body: { email, password },
    } as any)
    const token = (res as any)?.token
    if (typeof token === 'string' && token.length > 0) {
      setCookie(event, 'auth_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
      })
    }
    return res
  } catch (err: any) {
    const statusCode = err?.status || err?.response?.status || 500
    const message = err?.data?.message || err?.statusMessage || 'ログインに失敗しました'
    throw createError({ statusCode, statusMessage: message, data: { message } })
  }
})
