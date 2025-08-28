<template>
  <article v-if="article">
    <h1>{{ article.title }}</h1>
    <div class="meta">
      <time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time>
      <span v-if="article.tags?.length">・{{ article.tags?.join(', ') }}</span>
    </div>
    <div class="content" v-html="article.content" />
  </article>
  <div v-else>
    <h1>Not Found</h1>
    <p>指定された記事は見つかりませんでした。</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useArticles } from '~/composables/useArticles'
import type { Article } from '~/types/article'

const route = useRoute()
const { getBySlug } = useArticles()

const slug = String(route.params.slug)
const article: Article | undefined = getBySlug(slug)

useHead({
  title: article ? `${article.title} | My Blog` : '記事が見つかりません | My Blog',
  meta: [
    { name: 'description', content: article?.summary || 'Static article' }
  ]
})

function formatDate(s: string): string {
  return new Date(s).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
h1 { margin: 0 0 0.5rem 0; }
.meta { color: #6b7280; font-size: 0.875rem; margin: 0 0 1rem 0; }
.content :deep(h2) { margin-top: 1rem; }
.content :deep(p) { margin: 0.5rem 0; }
.content :deep(code) { background: #f3f4f6; padding: 0 0.25rem; border-radius: 3px; }
</style>


