<template>
  <div class="layout">
    <AppHeader />
    <div class="content">
      <AppSidebar class="sidebar" />
      <main class="main">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppSidebar from '~/components/AppSidebar.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 0;
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  flex: 1 1 auto;
}
.sidebar {
  min-height: 100%;
}
.main {
  padding: 1rem;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
  .sidebar {
    order: 2;
  }
  .main {
    order: 1;
  }
}
</style>


