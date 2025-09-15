<template>
  <section class="container">
    <h1>記事の新規作成</h1>

    <form class="form" @submit.prevent="submit">
      <div class="field">
        <label for="title">タイトル</label>
        <input id="title" v-model="form.title" type="text" required />
      </div>

      <div class="field">
        <label for="slug">スラッグ</label>
        <input id="slug" v-model="form.slug" type="text" required pattern="[a-z0-9-]+" />
        <small class="hint">英小文字・数字・ハイフンのみ</small>
      </div>

      <div class="field">
        <label for="summary">要約</label>
        <textarea id="summary" v-model="form.summary" rows="3" />
      </div>

      <div class="field">
        <label for="content">本文 (HTML可)</label>
        <textarea id="content" v-model="form.content" rows="10" />
      </div>

      <div class="field">
        <label for="tags">タグ (カンマ区切り)</label>
        <input id="tags" v-model="tagsInput" type="text" placeholder="nuxt, laravel" />
      </div>

      <div class="actions">
        <button type="submit" :disabled="submitting">登録する</button>
        <NuxtLink to="/articles" class="link">一覧に戻る</NuxtLink>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { reactive, ref, watch } from 'vue'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
definePageMeta({ layout: 'admin', middleware: 'admin' })

type NewArticleForm = {
  title: string
  slug: string
  summary: string
  content: string
  tags: string[]
}

const form = reactive<NewArticleForm>({
  title: '',
  slug: '',
  summary: '',
  content: '',
  tags: [],
})

const tagsInput = ref('')
watch(tagsInput, (val) => {
  form.tags = val
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
})

watch(() => form.title, (val) => {
  if (!form.slug) {
    form.slug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
})

const submitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function submit() {
  errorMessage.value = ''
  successMessage.value = ''
  submitting.value = true
  try {
    const payload = {
      title: form.title,
      slug: form.slug,
      summary: form.summary || null,
      content: form.content || null,
      tags: form.tags.length ? form.tags : null,
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await $fetch('/api/articles', { method: 'POST', body: payload })
    successMessage.value = '記事を登録しました'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await navigateTo(`/articles/${(res as any).slug}`)
  } catch (err: any) {
    const msg = err?.data?.message || err?.message || '登録に失敗しました'
    const details = err?.data?.errors
    if (details && typeof details === 'object') {
      const values = (Object as any).values(details) as any[]
      const first = values && values.length ? (values[0] as string[]) : undefined
      if (first && first.length) errorMessage.value = `${msg}: ${first[0]}`
      else errorMessage.value = msg
    } else {
      errorMessage.value = msg
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.container { max-width: 800px; margin: 0 auto; }
h1 { margin: 0 0 1rem 0; }
.form { display: grid; gap: 1rem; }
.field { display: grid; gap: 0.25rem; }
label { font-weight: 600; }
input, textarea { padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 6px; }
.actions { display: flex; gap: 0.75rem; align-items: center; }
button { background: #4f46e5; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }
button[disabled] { opacity: 0.6; cursor: not-allowed; }
.link { color: #4f46e5; }
.error { color: #b91c1c; }
.success { color: #065f46; }
</style>


