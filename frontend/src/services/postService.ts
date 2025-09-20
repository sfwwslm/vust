import apiClient from './apiClient'
import type { Post } from '@/types/post'

/**
 * 获取文章列表
 * @returns 文章数组
 */
async function getPosts(): Promise<Post[]> {
  const response = await apiClient.get('/posts')
  return response.data
}

/**
 * 根据 slug 获取单篇文章详情
 * @param slug - 文章的 slug
 * @returns 单个文章对象
 */
async function getPostBySlug(slug: string): Promise<Post> {
  const response = await apiClient.get(`/posts/${slug}`)
  return response.data
}

export default {
  getPosts,
  getPostBySlug,
}
