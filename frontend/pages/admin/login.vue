<template>
  <section class="container">
    <h1>管理者ログイン</h1>
    <form class="form" @submit.prevent="submit">
      <div class="field">
        <label for="email">メールアドレス</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="field">
        <label for="password">パスワード</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <div class="actions">
        <button type="submit" :disabled="submitting">ログイン</button>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta, useRoute } from '#imports'
import { navigateTo } from '#app'
import { $fetch } from 'ofetch'

definePageMeta({ layout: false })

const route = useRoute()

const email = ref('test@example.com')
const password = ref('password')
const submitting = ref(false)
const errorMessage = ref('')

async function submit() {
  errorMessage.value = ''
  submitting.value = true
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { email: email.value, password: password.value } })
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/admin/articles/new'
    await navigateTo(redirect)
  } catch (err: any) {
    errorMessage.value = err?.data?.message || err?.statusMessage || 'ログインに失敗しました'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.container { max-width: 480px; margin: 0 auto; }
h1 { margin: 0 0 1rem 0; }
.form { display: grid; gap: 1rem; }
.field { display: grid; gap: 0.25rem; }
label { font-weight: 600; }
input { padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 6px; }
.actions { display: flex; gap: 0.75rem; align-items: center; }
button { background: #4f46e5; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }
button[disabled] { opacity: 0.6; cursor: not-allowed; }
.error { color: #b91c1c; }
</style>


