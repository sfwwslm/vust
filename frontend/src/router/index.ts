import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // 使用 slug 作为文章的唯一标识符，更利于 SEO
      path: '/posts/:slug',
      name: 'post-detail',
      component: () => import('../views/PostDetailView.vue'),
    },
  ],
})

export default router
