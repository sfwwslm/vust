<script setup lang="ts">
// 在实际应用中，这里会从 API 获取文章列表
// import { ref, onMounted } from 'vue'
// import postService from '@/services/postService'
// import type { Post } from '@/types/post'

// const posts = ref<Post[]>([])

// onMounted(async () => {
//   try {
//     posts.value = await postService.getPosts()
//   } catch (error) {
//     console.error('Failed to fetch posts:', error)
//   }
// })

// 模拟数据用于展示
const posts = [
  {
    id: '1',
    slug: 'hello-world',
    title: 'Hello, World!',
    author: { name: 'Admin' },
    published_at: '2025-09-20T12:00:00Z',
    excerpt:
      '这是我的第一篇博客文章。欢迎来到我的新博客！我将在这里分享关于技术、编程和生活的想法。',
  },
  {
    id: '2',
    slug: 'why-rust-is-awesome',
    title: '为什么 Rust 如此出色？',
    author: { name: 'Admin' },
    published_at: '2025-09-22T15:30:00Z',
    excerpt:
      'Rust 语言以其内存安全、高性能和并发性而闻名。在这篇文章中，我们将探讨它的一些核心特性。',
  },
]
</script>

<template>
  <div class="home-view">
    <h1 class="page-title">最新文章</h1>
    <div class="post-list">
      <article v-for="post in posts" :key="post.id" class="post-item">
        <h2 class="post-title">
          <router-link :to="{ name: 'post-detail', params: { slug: post.slug } }">
            {{ post.title }}
          </router-link>
        </h2>
        <p class="post-meta">发布于 {{ new Date(post.published_at).toLocaleDateString() }}</p>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <router-link :to="{ name: 'post-detail', params: { slug: post.slug } }" class="read-more">
          阅读全文 &rarr;
        </router-link>
      </article>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #111827;
}

.post-list {
  display: grid;
  gap: 2.5rem;
}

.post-item {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.post-title a {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
  transition: color 0.2s;
}

.post-title a:hover {
  color: #007bff;
}

.post-meta {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.5rem 0 1rem;
}

.post-excerpt {
  color: #4b5563;
  line-height: 1.6;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}
</style>
