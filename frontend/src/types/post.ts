/**
 * 作者信息
 */
export interface Author {
  id: string
  username: string
}

/**
 * 文章状态
 */
export type PostStatus = 'draft' | 'published'

/**
 * 文章数据结构
 */
export interface Post {
  id: string
  author: Author
  title: string
  slug: string
  content: string
  excerpt?: string // 文章摘要，可选
  status: PostStatus
  published_at: string
  created_at: string
  updated_at: string
}
