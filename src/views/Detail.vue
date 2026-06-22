<template>
  <div class="detail-page">
    <div class="detail-container">
      <!-- 返回按钮 -->
      <router-link to="/" class="back-button">
        <span class="back-icon">&#8249;</span>
        返回首页
      </router-link>

      <!-- 文章卡片 -->
      <article class="article-detail-card">
        <!-- 头图 -->
        <div class="article-header-image">
          <img :src="article.headerImage" :alt="article.title" />
        </div>

        <!-- 文章信息 -->
        <div class="article-detail-info">
          <span class="article-detail-category" :class="article.category">
            {{ article.categoryLabel }}
          </span>
          <h1 class="article-detail-title">{{ article.title }}</h1>

          <!-- 作者信息栏 -->
          <div class="article-author-bar">
            <div class="author-info">
              <div class="author-avatar-large">
                <img :src="article.authorAvatar" alt="author" />
              </div>
              <div class="author-details">
                <span class="author-name-large">{{ article.author }}</span>
                <span class="author-title">前端开发工程师</span>
              </div>
            </div>
            <div class="article-publish-time">
              <span class="publish-label">发布时间</span>
              <span class="publish-date">{{ article.date }}</span>
            </div>
          </div>

          <!-- 统计信息 -->
          <div class="article-stats-bar">
            <div class="stat-box">
              <span class="stat-box-icon">&#128065;</span>
              <span class="stat-box-num">{{ article.views }}</span>
              <span class="stat-box-label">阅读</span>
            </div>
            <div class="stat-box">
              <span class="stat-box-icon">&#128077;</span>
              <span class="stat-box-num">{{ article.likes }}</span>
              <span class="stat-box-label">点赞</span>
            </div>
            <div class="stat-box">
              <span class="stat-box-icon">&#128172;</span>
              <span class="stat-box-num">{{ article.comments }}</span>
              <span class="stat-box-label">评论</span>
            </div>
          </div>
        </div>

        <!-- 文章正文 -->
        <div class="article-detail-content" v-html="article.content"></div>

        <!-- 操作栏 -->
        <div class="article-action-bar">
          <button
            class="action-btn"
            :class="{ liked: isLiked }"
            @click="toggleLike"
          >
            <span class="action-icon">{{ isLiked ? '&#128079;' : '&#128077;' }}</span>
            {{ isLiked ? '已点赞' : '点赞' }}
          </button>
          <button
            class="action-btn"
            :class="{ collected: isCollected }"
            @click="toggleCollect"
          >
            <span class="action-icon">{{ isCollected ? '&#9733;' : '&#9734;' }}</span>
            {{ isCollected ? '已收藏' : '收藏' }}
          </button>
          <button class="action-btn" @click="shareArticle">
            <span class="action-icon">&#8599;</span>
            分享
          </button>
        </div>
      </article>

      <!-- 相关文章推荐 -->
      <div class="related-articles">
        <h3 class="related-title">相关文章推荐</h3>
        <div class="related-list">
          <div
            v-for="item in relatedArticles"
            :key="item.id"
            class="related-card"
            @click="goToDetail(item.id)"
          >
            <div class="related-image">
              <img :src="item.thumb" :alt="item.title" />
            </div>
            <div class="related-info">
              <h4 class="related-article-title">{{ item.title }}</h4>
              <span class="related-meta">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import '../assets/css/x_q.css'
import '../assets/css/link.css'

const route = useRoute()
const router = useRouter()

const isLiked = ref(false)
const isCollected = ref(false)

interface RelatedArticle {
  id: number
  title: string
  thumb: string
  date: string
}

const article = ref({
  id: 1,
  title: 'Vue 3 Composition API 实战教程',
  headerImage: 'https://images.pexels.com/photos/110469/pexels-photo-110469.jpeg?w=1200',
  author: '技术博主',
  authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=200',
  category: 'vue',
  categoryLabel: 'Vue.js',
  date: '2024-01-15',
  views: '1,234',
  likes: '86',
  comments: '12',
  content: `
    <h2>前言</h2>
    <p>Vue 3 引入了全新的 Composition API，这是一种全新的组件逻辑组织方式。相比 Options API，Composition API 提供了更灵活的代码组织能力和更好的 TypeScript 支持。</p>

    <h2>什么是 Composition API</h2>
    <p>Composition API 是一组函数的集合，允许我们在 setup() 函数中组织组件逻辑。它的核心思想是将相关的逻辑放在一起，而不是按照选项类型分离。</p>

    <h3>基本语法</h3>
    <pre><code>import { ref, reactive, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const state = reactive({
      name: 'Vue 3'
    })

    const doubleCount = computed(() => count.value * 2)

    onMounted(() => {
      console.log('Component mounted')
    })

    return {
      count,
      state,
      doubleCount
    }
  }
}</code></pre>

    <h2>响应式 API</h2>
    <p>Vue 3 提供了两种创建响应式数据的方式：</p>

    <h3>ref</h3>
    <p>ref 用于创建基本类型的响应式数据，它在访问时需要通过 .value 获取值。</p>
    <pre><code>const count = ref(0)
count.value++ // 需要通过 .value 访问</code></pre>

    <h3>reactive</h3>
    <p>reactive 用于创建对象的响应式代理，直接访问属性即可。</p>
    <pre><code>const state = reactive({
  name: 'Vue',
  version: 3
})
state.name = 'Vue 3' // 直接访问</code></pre>

    <h2>生命周期钩子</h2>
    <p>在 Composition API 中，生命周期钩子以 on 开头的函数形式使用：</p>
    <ul>
      <li>onBeforeMount - 挂载前</li>
      <li>onMounted - 挂载后</li>
      <li>onBeforeUpdate - 更新前</li>
      <li>onUpdated - 更新后</li>
      <li>onBeforeUnmount - 卸载前</li>
      <li>onUnmounted - 卸载后</li>
    </ul>

    <blockquote>
      <p>使用 Composition API 可以更好地复用逻辑代码，提高代码的可维护性。</p>
    </blockquote>

    <h2>总结</h2>
    <p>Composition API 是 Vue 3 最重要的新特性之一，它为我们提供了更灵活、更强大的代码组织方式。掌握 Composition API 是成为一名优秀 Vue 开发者的必经之路。</p>
  `
})

const relatedArticles = ref<RelatedArticle[]>([
  {
    id: 6,
    title: 'Vue 3 响应式原理深度解析',
    thumb: 'https://images.pexels.com/photos/416928/pexels-photo-416928.jpeg?w=400',
    date: '2024-01-18'
  },
  {
    id: 4,
    title: 'JavaScript ES6+ 新特性总结',
    thumb: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?w=400',
    date: '2024-01-20'
  },
  {
    id: 5,
    title: 'TypeScript 类型体操进阶',
    thumb: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?w=400',
    date: '2024-01-22'
  }
])

const toggleLike = () => {
  isLiked.value = !isLiked.value
}

const toggleCollect = () => {
  isCollected.value = !isCollected.value
}

const shareArticle = () => {
  if (navigator.share) {
    navigator.share({
      title: article.value.title,
      url: window.location.href
    })
  } else {
    alert('已复制链接到剪贴板')
  }
}

const goToDetail = (id: number) => {
  router.push(`/detail/${id}`)
}

onMounted(() => {
  const id = route.params.id
  console.log('Article ID:', id)
})
</script>
