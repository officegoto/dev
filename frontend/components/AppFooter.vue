<template>
  <footer class="app-footer">
    <div class="container">
      <p>&copy; {{ year }} My Blog. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  border-top: 1px solid #e5e7eb; /* gray-200 */
  background: #ffffff;
}
.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 1rem;
  color: #6b7280; /* gray-500 */
  font-size: 0.875rem;
}
</style>


