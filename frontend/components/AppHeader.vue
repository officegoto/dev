<template>
  <header class="app-header">
    <div class="container">
      <NuxtLink to="/" class="brand">My Blog</NuxtLink>
      <nav class="nav">
        <NuxtLink to="/" class="link">Home</NuxtLink>
        <NuxtLink to="/articles" class="link">Articles</NuxtLink>
      </nav>
    </div>
  </header>
  
</template>

<script setup lang="ts">
// Presentational header component
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #1f2937; /* gray-800 */
  color: #ffffff;
  border-bottom: 1px solid #374151; /* gray-700 */
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
}
.brand {
  font-weight: 700;
  letter-spacing: 0.2px;
}
.nav {
  display: flex;
  gap: 1rem;
}
.link {
  color: #e5e7eb;
}
.link.router-link-active {
  color: #ffffff;
  text-decoration: underline;
}
</style>


