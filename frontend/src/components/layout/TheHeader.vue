<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <div class="header-content">
      <RouterLink to="/" class="logo">Vust Blog</RouterLink>
      <nav class="navigation">
        <RouterLink to="/" class="nav-link">首页</RouterLink>
        <RouterLink to="/archives" class="nav-link">归档</RouterLink>
        <RouterLink to="/about" class="nav-link">关于</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  width: 100%;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  text-decoration: none;
}

.navigation {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease-in-out;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #007bff;
}
</style>
