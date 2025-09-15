<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <nav class="menu">
        <NuxtLink to="/admin/articles" class="link">記事一覧</NuxtLink>
        <NuxtLink to="/admin/articles/new" class="link">記事登録</NuxtLink>
      </nav>
    </aside>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// 管理専用のシンプルなレイアウト
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 240px 1fr;
}
.sidebar {
  border-right: 1px solid #e5e7eb;
  padding: 1rem;
}
.menu { display: grid; gap: 0.5rem; }
.link { color: #111827; }
.link.router-link-active { color: #4f46e5; text-decoration: underline; }
.main { padding: 1rem; }
</style>


