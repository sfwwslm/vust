
# 架构方案

## 1. 项目整体架构 (High-Level Architecture)

* **前端 (Frontend)**: 基于 `Vue 3` + `TypeScript` 的单页面应用 (SPA)，负责用户界面的展示和交互。它将通过 RESTful API 与后端通信。
* **后端 (Backend)**: 基于 `Rust` + `Salvo` 框架的 API 服务器，负责处理业务逻辑、数据持久化，并为前端提供数据接口。
* **数据库 (Database)**: 使用 `PostgreSQL`，它功能强大、稳定且与 `Rust` 生态结合良好。
* **通信 (Communication)**: 前后端之间通过 `JSON` 格式进行 HTTP 通信。

下面是架构的简要示意图：

```text
+--------------------------------+
|       用户 (User Browser)      |
+--------------------------------+
             |
             | HTTP/S (API Requests)
             |
+----------------------------------+      +------------------------+
|      后端 API 服务 (Rust/Salvo)   |----->|   数据库 (PostgreSQL)  |
| - 业务逻辑 (Business Logic)       |      | - 用户数据 (Users)     |
| - 用户认证 (Authentication)       |      | - 文章数据 (Posts)     |
| - 数据接口 (Data API)             |      | - ...                  |
+----------------------------------+      +------------------------+
             |
             | HTTP/S (Static Assets & API Data)
             |
+--------------------------------+
|      前端应用 (Vue/TypeScript)  |
| - 视图渲染 (View Rendering)     |
| - 状态管理 (State Management)   |
| - 用户交互 (User Interaction)   |
+--------------------------------+
```

-----

## 2. 前端架构 (Vue.js + TypeScript)

前端项目将专注于提供一个流畅、美观且响应式的用户体验。

### **技术选型**

* **框架**: `Vue 3`
* **构建工具**: `Vite`
* **路由**: `Vue Router`
* **状态管理**: `Pinia`
* **HTTP客户端**: `axios`
* **UI 库 (可选)**:
  * `Element Plus` / `Naive UI`
  * `Tailwind CSS`
* **代码规范**: `ESLint` + `Prettier`

### **目录结构**

一个清晰的目录结构是项目可维护性的关键。

```text
frontend/
├── public/                  # 静态资源，不会被 Vite 处理
├── src/
│   ├── assets/              # 存放图片、样式文件 (SCSS, CSS) 等
│   ├── components/          # 全局通用组件
│   │   ├── common/          # 基础组件 (如 Button.vue, Modal.vue)
│   │   └── layout/          # 布局组件 (如 TheHeader.vue, TheFooter.vue)
│   ├── views/               # 页面级组件 (路由对应)
│   │   ├── HomeView.vue     # 首页
│   │   ├── PostDetailView.vue # 文章详情页
│   │   └── Admin/           # 后台管理页面
│   │       ├── Dashboard.vue
│   │       └── PostEditor.vue
│   ├── router/              # 路由配置
│   │   └── index.ts
│   ├── store/               # Pinia 状态管理
│   │   ├── user.ts          # 用户状态模块
│   │   └── posts.ts         # 文章状态模块
│   ├── services/            # API 服务层 (封装 axios)
│   │   ├── apiClient.ts     # axios 实例和拦截器配置
│   │   └── postService.ts   # 文章相关的 API 请求
│   ├── types/               # TypeScript 类型定义
│   │   ├── index.ts         # 全局类型
│   │   └── post.ts          # 文章相关类型
│   ├── utils/               # 工具函数
│   │   └── formatDate.ts
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

-----

## 3. 后端架构 (Rust)

`Salvo` 是一个极其简单且功能强大的 `Rust Web` 后端框架。只需具备基本的 `Rust` 知识即可开发后端服务。

### **技术选型**

* **Web 框架**: `Salvo`
* **异步运行时**: `tokio`
* **数据库交互**:
  * `sqlx`: 纯异步、编译时检查 SQL 语句，类型安全。
* **序列化/反序列化**: `serde`
* **配置管理**: `config` crate 或直接使用环境变量
* **日志**: `tracing`
* **密码处理**: `argon2` 或 `bcrypt`
* **错误处理**: `anyhow` 或 `thiserror`

### **目录结构**

```text
backend/
├── migrations/              # 数据库迁移文件 (如果使用 sqlx-cli)
├── .env                     # 环境变量文件 (不提交到 git)
├── Cargo.toml
└── src/
    ├── api/                 # API 处理器 (Handlers)
    │   ├── auth_handler.rs  # 认证相关接口
    │   ├── post_handler.rs  # 文章相关接口
    │   └── mod.rs
    ├── config.rs            # 应用配置模块
    ├── db.rs                # 数据库连接池模块
    ├── error.rs             # 自定义错误类型
    ├── middleware/          # 中间件 (如认证)
    │   └── auth.rs
    ├── models/              # 数据模型 (与数据库表对应)
    │   ├── post.rs
    │   └── user.rs
    ├── repositories/        # 数据访问层 (封装数据库操作)
    │   ├── post_repo.rs
    │   └── user_repo.rs
    ├── services/            # 业务逻辑层 (可选，简单项目可省略)
    │   └── post_service.rs
    ├── routes.rs            # 路由定义模块
    └── main.rs              # 应用入口
```

**代码组织思路**:

1. `main.rs`: 初始化配置、数据库连接池、日志系统，启动服务器。
2. `routes.rs`: 定义所有 API 路由，将路径映射到对应的 `handler` 函数。
3. `api/*.rs` (Handlers): 负责解析请求、验证输入、调用 `repository` 或 `service`，并构建响应。它们是 MVC 中的 Controller。
4. `repositories/*.rs` (Repositories): 负责所有与数据库的直接交互，执行 SQL 查询。这使得业务逻辑与数据访问解耦。
5. `models/*.rs`: 定义与数据库表结构匹配的 Rust `struct`，并使用 `serde` 和 `sqlx` 的宏进行派生。

-----

## 4. 数据库设计 (Database Schema)

* **users** (用户信息表)
  * `id` (UUID, Primary Key)
  * `username` (VARCHAR, Unique, Not Null)
  * `password_hash` (VARCHAR, Not Null)
  * `created_at` (TIMESTAMPTZ, Default NOW())
* **posts** (文章表)
  * `id` (UUID, Primary Key)
  * `author_id` (UUID, Foreign Key to `users.id`)
  * `title` (VARCHAR, Not Null)
  * `slug` (VARCHAR, Unique, Not Null) - 用于生成美观的 URL
  * `content` (TEXT)
  * `status` (VARCHAR, e.g., 'draft', 'published')
  * `published_at` (TIMESTAMPTZ)
  * `created_at` (TIMESTAMPTZ, Default NOW())
  * `updated_at` (TIMESTAMPTZ, Default NOW())
* **categories** (分类表)
  * `id` (SERIAL, Primary Key)
  * `name` (VARCHAR, Unique, Not Null)
* **tags** (标签表)
  * `id` (SERIAL, Primary Key)
  * `name` (VARCHAR, Unique, Not Null)
* **post_tags** (文章与标签的关联表, Many-to-Many)
  * `post_id` (UUID, Foreign Key to `posts.id`)
  * `tag_id` (INTEGER, Foreign Key to `tags.id`)
  * Primary Key (`post_id`, `tag_id`)

-----

## 5. API 接口设计 (RESTful API)

### **文章 (Posts)**

* `GET /api/v1/posts`: 获取文章列表 (支持分页、过滤)
* `GET /api/v1/posts/{slug}`: 根据 slug 获取单篇文章详情
* `POST /api/v1/admin/posts`: 创建新文章 (需要认证)
* `PUT /api/v1/admin/posts/{id}`: 更新文章 (需要认证)
* `DELETE /api/v1/admin/posts/{id}`: 删除文章 (需要认证)

### **认证 (Authentication)**

* `POST /api/v1/auth/login`: 用户登录，成功后返回 JWT (JSON Web Token)
* `POST /api/v1/auth/register`: 用户注册
* `GET /api/v1/auth/me`: 获取当前用户信息 (需要认证，通过 JWT)

### **分类和标签 (Categories & Tags)**

* `GET /api/v1/categories`: 获取所有分类列表
* `GET /api/v1/tags`: 获取所有标签列表

-----
