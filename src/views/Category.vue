<template>
  <div class="category-page">
    <!-- 分类导航 -->
    <div class="category-nav">
      <h3 class="category-nav-title">文章分类</h3>
      <div class="category-tabs">
        <button
          v-for="tab in categoryTabs"
          :key="tab.value"
          class="category-tab"
          :class="{ active: currentCategory === tab.value }"
          @click="selectCategory(tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-left">
        <span
          class="filter-item"
          :class="{ active: sortType === 'latest' }"
          @click="sortType = 'latest'"
        >
          最新发布
        </span>
        <span
          class="filter-item"
          :class="{ active: sortType === 'popular' }"
          @click="sortType = 'popular'"
        >
          最多阅读
        </span>
      </div>
      <div class="filter-right">
        <input
          v-model="searchKeyword"
          type="text"
          class="filter-search"
          placeholder="搜索文章..."
          @keyup.enter="handleSearch"
        />
      </div>
    </div>

    <!-- 分类布局 -->
    <div class="category-layout">
      <!-- 文章列表 -->
      <div class="article-list-container">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="article-card"
          @click="goToDetail(article.id)"
        >
          <div class="article-card-image">
            <img :src="article.thumb" :alt="article.title" />
          </div>
          <div class="article-card-content">
            <div class="article-card-header">
              <span class="article-card-tag" :class="article.category">{{ article.categoryLabel }}</span>
            </div>
            <h4 class="article-card-title">{{ article.title }}</h4>
            <p class="article-card-desc">{{ article.desc }}</p>
            <div class="article-card-footer">
              <div class="article-card-author">
                <div class="author-avatar">
                  <img :src="article.authorAvatar" alt="author" />
                </div>
                <span class="author-name">{{ article.author }}</span>
              </div>
              <div class="article-card-stats">
                <span class="stat-item">
                  <span class="stat-icon">&#128065;</span>
                  {{ article.views }}
                </span>
                <span class="stat-item">
                  <span class="stat-icon">&#128077;</span>
                  {{ article.likes }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="filteredArticles.length === 0" class="empty-state">
          <div class="empty-icon">&#128269;</div>
          <h4 class="empty-title">暂无相关文章</h4>
          <p class="empty-desc">请尝试其他关键词或分类</p>
        </div>

        <!-- 分页 -->
        <div v-if="filteredArticles.length > 0" class="pagination">
          <button class="pagination-btn" :class="{ disabled: currentPage === 1 }" @click="prevPage">
            上一页
          </button>
          <span
            v-for="page in totalPages"
            :key="page"
            class="pagination-btn"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </span>
          <button class="pagination-btn" :class="{ disabled: currentPage === totalPages }" @click="nextPage">
            下一页
          </button>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="category-sidebar">
        <!-- 标签云 -->
        <div class="sidebar-card">
          <h4 class="sidebar-card-title">热门标签</h4>
          <div class="sidebar-tag-cloud">
            <span
              v-for="tag in hotTags"
              :key="tag"
              class="sidebar-tag"
              @click="filterByTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 推荐阅读 -->
        <div class="sidebar-card">
          <h4 class="sidebar-card-title">推荐阅读</h4>
          <div class="sidebar-article-list">
            <div
              v-for="article in recommendArticles"
              :key="article.id"
              class="sidebar-article-item"
              @click="goToDetail(article.id)"
            >
              <h5 class="sidebar-article-title">{{ article.title }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import '../assets/css/L_m.css'
import '../assets/css/link.css'

const route = useRoute()
const router = useRouter()

interface Article {
  id: number
  title: string
  desc: string
  thumb: string
  author: string
  authorAvatar: string
  category: string
  categoryLabel: string
  views: string
  likes: string
}

interface CategoryTab {
  value: string
  label: string
}

const currentCategory = ref('all')
const sortType = ref('latest')
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = 5

const categoryTabs: CategoryTab[] = [
  { value: 'all', label: '全部' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' }
]

const allArticles: Article[] = [
  {
    id: 1,
    title: 'Vue 3 Composition API 实战教程',
    desc: '本文将深入讲解 Vue 3 的 Composition API，包括 setup 函数、响应式 API、生命周期钩子等核心概念。',
    thumb: 'https://images.pexels.com/photos/110469/pexels-photo-110469.jpeg?w=400',
    author: '技术博主',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100',
    category: 'vue',
    categoryLabel: 'Vue.js',
    views: '1.2k',
    likes: '86'
  },
  {
    id: 2,
    title: 'HTML5 语义化标签详解',
    desc: '了解 HTML5 的语义化标签如何提升网页的可访问性和 SEO 表现。',
    thumb: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=400',
    author: '技术博主',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100',
    category: 'html',
    categoryLabel: 'HTML',
    views: '986',
    likes: '72'
  },
  {
    id: 3,
    title: 'CSS Flexbox 布局完全指南',
    desc: '从基础到进阶，掌握 Flexbox 布局的所有知识点，让你的布局更灵活。',
    thumb: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=400',
    author: '技术博主',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100',
    category: 'css',
    categoryLabel: 'CSS',
    views: '1.5k',
    likes: '128'
  },
  {
    id: 4,
    title: 'JavaScript ES6+ 新特性总结',
    desc: '详解 ES6 到 ES2024 的重要新特性，包括箭头函数、解构赋值、模块化等。',
    thumb: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?w=400',
    author: '技术博主',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    views: '2.1k',
    likes: '156'
  },
  {
    id: 5,
    title: 'TypeScript 类型体操进阶',
    desc: '学习 TypeScript 的高级类型技巧，掌握条件类型、映射类型等概念。',
    thumb: 'https://images.pexels.com/photos/416928/pexels-photo-416928.jpeg?w=400',
    author: '技术博主',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100',
    category: 'typescript',
    categoryLabel: 'TypeScript',
    views: '876',
    likes: '64'
  },
  {
    id: 6,
    title: 'Vue 3 响应式原理深度解析',
    desc: '深入理解 Vue 3 的响应式系统，探索 Proxy 的工作原理。',
    thumb: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=400',
    author: '技术博主',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100',
    category: 'vue',
    categoryLabel: 'Vue.js',
    views: '1.8k',
    likes: '134'
  },
  {
    id: 7,
    title: 'CSS Grid 布局实战技巧',
    desc: '掌握 CSS Grid 的强大布局能力，创建复杂的网页布局。',
    thumb: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?w=400',
    author: '技术博主',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100',
    category: 'css',
    categoryLabel: 'CSS',
    views: '1.1k',
    likes: '89'
  }
]

const hotTags = ['Vue3', 'React', 'TypeScript', 'Webpack', 'Node.js', 'CSS3', 'HTML5', 'ES6']

const recommendArticles = ref([
  { id: 1, title: 'Vue 3 组合式 API 入门指南' },
  { id: 3, title: 'CSS Flexbox 布局完全指南' },
  { id: 4, title: 'JavaScript ES6+ 新特性总结' },
  { id: 6, title: 'Vue 3 响应式原理深度解析' }
])

const filteredArticles = computed(() => {
  let articles = [...allArticles]

  if (currentCategory.value !== 'all') {
    articles = articles.filter(a => a.category === currentCategory.value)
  }

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    articles = articles.filter(a =>
      a.title.toLowerCase().includes(keyword) ||
      a.desc.toLowerCase().includes(keyword)
    )
  }

  if (sortType.value === 'popular') {
    articles.sort((a, b) => parseInt(b.views) - parseInt(a.views))
  }

  return articles
})

const totalPages = computed(() => Math.ceil(filteredArticles.value.length / pageSize) || 1)

const selectCategory = (value: string) => {
  currentCategory.value = value
  currentPage.value = 1
}

const handleSearch = () => {
  currentPage.value = 1
}

const filterByTag = (tag: string) => {
  searchKeyword.value = tag
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const goToDetail = (id: number) => {
  router.push(`/detail/${id}`)
}

const applyQuery = (q: typeof route.query) => {
  if (q.tag) currentCategory.value = q.tag as string
  if (q.search) searchKeyword.value = q.search as string
  if (q.sort) sortType.value = q.sort as string
}

onMounted(() => applyQuery(route.query))
watch(() => route.query, applyQuery)
</script>
