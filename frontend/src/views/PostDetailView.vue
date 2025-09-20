<script setup lang="ts">
// import { ref, onMounted } from 'vue'
// import { useRoute } from 'vue-router'
// import postService from '@/services/postService'
// import type { Post } from '@/types/post'

// const route = useRoute()
// const post = ref<Post | null>(null)

// onMounted(async () => {
//   const slug = route.params.slug as string
//   try {
//     post.value = await postService.getPostBySlug(slug)
//   } catch (error) {
//     console.error('Failed to fetch post:', error)
//   }
// })

// 模拟数据用于展示
const post = {
  title: 'Hello, World!',
  author: { name: 'Admin' },
  published_at: '2025-09-20T12:00:00Z',
  content: `
    <p>这是我的第一篇博客文章。欢迎来到我的新博客！</p>
    <p>我将在这里分享关于技术、编程和生活的想法。</p>
    <p>下面是一个代码示例：</p>
    <pre><code class="language-rust">fn main() {
    println!("Hello from Vust!");
}</code></pre>
    <p>希望你喜欢这里！</p>
  `,
}
</script>

<template>
  <div class="post-detail-view">
    <article v-if="post" class="post-content">
      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-meta">
        作者：{{ post.author.name }} | 发布于
        {{ new Date(post.published_at).toLocaleDateString() }}
      </p>
      <div class="prose" v-html="post.content"></div>
    </article>
    <div v-else>
      <p>正在加载文章...</p>
    </div>
  </div>
</template>

<style scoped>
.post-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #111827;
  line-height: 1.2;
}

.post-meta {
  color: #6b7280;
  margin-bottom: 2rem;
}
</style>
