<template>
  <section>
    <h1>記事一覧（管理）</h1>
    <div class="actions">
      <NuxtLink to="/admin/articles/new" class="btn">新規作成</NuxtLink>
    </div>
    <ul class="list">
      <li v-for="a in articles" :key="a.slug" class="item">
        <span class="title">{{ a.title }}</span>
        <span class="meta">{{ formatDate(a.createdAt) }}</span>
        <NuxtLink :to="`/articles/${a.slug}`" class="preview">公開ページ</NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
definePageMeta({ layout: 'admin', middleware: 'admin' })
import type { Article } from '~/types/article'

const { data: articles } = await useFetch<Article[]>('/api/articles')

function formatDate(s: string): string {
  return new Date(s).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
h1 { margin: 0 0 1rem 0; }
.actions { margin: 0 0 1rem 0; }
.btn { background: #4f46e5; color: #fff; padding: 0.5rem 0.75rem; border-radius: 6px; }
.list { list-style: none; padding: 0; margin: 0; }
.item { display: grid; grid-template-columns: 1fr auto auto; gap: 0.75rem; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; }
.title { font-weight: 600; }
.meta { color: #6b7280; font-size: 0.875rem; }
.preview { color: #4f46e5; }
</style>


