<template>
  <footer class="site-footer">
    <p>&copy; {{ new Date().getFullYear() }} Vust Blog. All rights reserved.</p>
    <p>
      Powered by <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js</a> &
      <a href="https://www.rust-lang.org/" target="_blank" rel="noopener">Rust</a>.
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  padding: 2rem 1rem;
  text-align: center;
  color: #6b7280;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
}

.site-footer a {
  color: #3b82f6;
  text-decoration: none;
}

.site-footer a:hover {
  text-decoration: underline;
}
</style>
