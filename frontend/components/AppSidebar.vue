<template>
  <aside class="sidebar">
    <div class="inner">
      <h2 class="title">Articles</h2>
      <ul class="list">
        <li v-for="item in articles" :key="item.slug" class="item">
          <NuxtLink :to="`/articles/${item.slug}`" class="item-link">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'

const { data: articles, status, error } = await useFetch<Article[]>('/api/articles')
</script>

<style scoped>
.sidebar {
  background: #f9fafb; /* gray-50 */
  border-right: 1px solid #e5e7eb; /* gray-200 */
}
.inner {
  padding: 1rem;
}
.title {
  font-size: 0.9rem;
  color: #6b7280;
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.item {
  margin: 0;
}
.item + .item {
  margin-top: 0.25rem;
}
.item-link {
  display: block;
  color: #111827;
  padding: 0.375rem 0.25rem;
  border-radius: 0.25rem;
}
.item-link:hover,
.item-link.router-link-active {
  background: #eef2ff; /* indigo-50 */
  color: #4338ca; /* indigo-700 */
}
</style>


