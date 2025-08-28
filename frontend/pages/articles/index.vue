<template>
  <section>
    <h1>記事一覧</h1>
    <ul class="list">
      <li v-for="a in articles" :key="a.slug" class="item">
        <NuxtLink :to="`/articles/${a.slug}`" class="title">{{ a.title }}</NuxtLink>
        <div class="meta">
          <time :datetime="a.createdAt">{{ formatDate(a.createdAt) }}</time>
          <span v-if="a.tags?.length">・{{ a.tags?.join(', ') }}</span>
        </div>
        <p class="summary">{{ a.summary }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useArticles } from '~/composables/useArticles'
import type { ComputedRef } from 'vue'
import type { Article } from '~/types/article'

const articles: ComputedRef<Article[]> = useArticles().articles

function formatDate(s: string): string {
  return new Date(s).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
h1 { margin: 0 0 1rem 0; }
.list { list-style: none; padding: 0; margin: 0; }
.item { padding: 0.75rem 0; border-bottom: 1px solid #e5e7eb; }
.title { font-weight: 600; }
.meta { color: #6b7280; font-size: 0.875rem; margin-top: 0.125rem; }
.summary { margin: 0.25rem 0 0; color: #374151; }
</style>


