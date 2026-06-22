<template>
  <div class="home-page">

    <!-- ───── 左侧边栏 ───── -->
    <aside class="left-sidebar">
      <nav class="sidebar-nav">
        <div v-for="(item, idx) in sidebarNav" :key="item.key ?? ('divider-' + idx)">
          <div v-if="item.divider" class="sidebar-divider"></div>
          <div
            v-else
            class="sidebar-nav-item"
            :class="{ active: isNavActive(item) }"
            @click="handleSidebarClick(item)"
          >
            <span class="sidebar-nav-icon">{{ item.icon }}</span>
            <span class="sidebar-nav-label">{{ item.label }}</span>
            <span v-if="item.badge" class="sidebar-badge" :class="item.badgeType">
              {{ item.badge }}
            </span>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <span class="sidebar-footer-text">联系我们</span>
        <span class="sidebar-footer-text">工作时间 8:30 - 22:00</span>
        <span class="sidebar-footer-text">客服电话：400-660-0108</span>
        <router-link to="/about" class="sidebar-footer-link">关于我们</router-link>
        <router-link to="/category" class="sidebar-footer-link">友情链接</router-link>
      </div>
    </aside>

    <!-- ───── 中间主内容区 ───── -->
    <main class="home-main">

      <!-- ① 分类标签栏 -->
      <div class="category-tabs-bar">
        <span
          v-for="tab in categoryTabs"
          :key="tab.key"
          class="cat-tab"
          :class="{ active: activeTab === tab.key }"
          @click="handleTabClick(tab)"
        >
          {{ tab.label }}
        </span>
      </div>

      <!-- ② 焦点轮播图 -->
      <div
        class="focus-carousel"
        @mouseenter="pauseCarousel"
        @mouseleave="resumeCarousel"
      >
        <!-- 轮播轨道 -->
        <div
          class="fc-track"
          :style="{ transform: `translateX(-${carouselIndex * 100}%)` }"
        >
          <div
            v-for="slide in carouselSlides"
            :key="slide.id"
            class="fc-slide"
            @click="goToDetail(slide.id)"
          >
            <img :src="slide.image" :alt="slide.title" class="fc-img" />
            <div class="fc-overlay"></div>
            <div class="fc-content">
              <span class="fc-tag">{{ slide.tag }}</span>
              <h2 class="fc-title">{{ slide.title }}</h2>
              <p class="fc-desc">{{ slide.desc }}</p>
            </div>
          </div>
        </div>

        <!-- 左箭头 -->
        <button class="fc-arrow fc-prev" @click.stop="prevSlide" aria-label="上一张">
          &#10094;
        </button>
        <!-- 右箭头 -->
        <button class="fc-arrow fc-next" @click.stop="nextSlide" aria-label="下一张">
          &#10095;
        </button>

        <!-- 指示点 -->
        <div class="fc-dots">
          <span
            v-for="(slide, i) in carouselSlides"
            :key="slide.id"
            class="fc-dot"
            :class="{ active: carouselIndex === i }"
            @click.stop="goToSlide(i)"
          ></span>
        </div>

        <!-- 进度条 -->
        <div class="fc-progress">
          <div
            class="fc-progress-bar"
            :style="{ animationDuration: progressDuration + 'ms', animationPlayState: isPaused ? 'paused' : 'running' }"
            :key="carouselIndex + '-' + pauseKey"
          ></div>
        </div>
      </div>

      <!-- ③ 资讯头条（技术推荐）-->
      <section class="home-section">
        <div class="home-section-header">
          <h2 class="home-section-title">资讯头条</h2>
          <span class="home-section-more" @click="goToCategory('资讯')">
            更多资讯 &rsaquo;
          </span>
        </div>

        <div class="news-cards-row">
          <div
            v-for="card in newsCards"
            :key="card.id"
            class="news-card"
            @click="goToDetail(card.id)"
          >
            <img :src="card.image" :alt="card.title" class="news-card-img" />
            <div class="news-card-overlay"></div>
            <div class="news-card-title">{{ card.title }}</div>
          </div>
        </div>

        <div class="news-text-list">
          <div
            v-for="news in newsTextList"
            :key="news.id"
            class="news-text-item"
            @click="goToDetail(news.id)"
          >
            <span class="news-text-dot"></span>
            <span class="news-text-content">{{ news.title }}</span>
          </div>
        </div>
      </section>

      <!-- ④ 开源项目 -->
      <section class="home-section">
        <div class="home-section-header">
          <h2 class="home-section-title">开源项目</h2>
          <span class="home-section-more" @click="goToCategory('vue')">
            更多开源项目 &rsaquo;
          </span>
        </div>

        <div class="opensource-grid">
          <div
            v-for="proj in opensourceProjects"
            :key="proj.id"
            class="opensource-card"
            @click="goToDetail(proj.id)"
          >
            <div class="opensource-logo">
              <img :src="proj.logo" :alt="proj.name" />
            </div>
            <div class="opensource-info">
              <div class="opensource-name">{{ proj.name }}</div>
              <div class="opensource-desc">{{ proj.desc }}</div>
              <div class="opensource-footer">
                <span class="opensource-lang">
                  <span class="lang-dot" :class="proj.langClass"></span>
                  {{ proj.lang }}
                </span>
                <span class="opensource-link">查看详情 &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ⑤ 精选博客（最新文章）-->
      <section class="home-section">
        <div class="home-section-header">
          <h2 class="home-section-title">精选博客</h2>
          <span
            class="blog-rank-label"
            @click="router.push({ path: '/category', query: { sort: 'popular' } })"
          >
            &#9776; 排行榜
          </span>
        </div>

        <div class="blog-list">
          <div
            v-for="article in latestArticles"
            :key="article.id"
            class="blog-item"
            @click="goToDetail(article.id)"
          >
            <div class="blog-left">
              <div class="blog-author-row">
                <div class="blog-author-avatar">
                  <img :src="article.authorAvatar" :alt="article.author" />
                </div>
                <span class="blog-author-name">{{ article.author }}</span>
              </div>
              <h3 class="blog-title">{{ article.title }}</h3>
              <p class="blog-excerpt">{{ article.excerpt }}</p>
              <div class="blog-stats">
                <span class="blog-stat">
                  <span class="blog-stat-icon">&#128065;</span>
                  阅读 {{ article.views }}
                </span>
                <span class="blog-stat">
                  <span class="blog-stat-icon">&#128077;</span>
                  {{ article.likes }}
                </span>
                <span class="blog-stat">
                  <span class="blog-stat-icon">&#128172;</span>
                  {{ article.comments }}
                </span>
                <span class="blog-stat">
                  <span class="blog-stat-icon">&#11088;</span>
                  收藏 {{ article.collects }}
                </span>
              </div>
            </div>
            <div class="blog-thumb">
              <img :src="article.thumb" :alt="article.title" />
            </div>
          </div>
        </div>

        <!-- 查看更多 -->
        <div class="blog-load-more" @click="router.push('/category')">
          查看更多文章 &rsaquo;
        </div>
      </section>
    </main>

    <!-- ───── 右侧边栏 ───── -->
    <aside class="right-sidebar">

      <!-- 社区推荐（热门分类）-->
      <div class="right-card">
        <div class="right-card-header">
          <span class="right-card-title">社区推荐</span>
          <span class="right-card-more" @click="router.push('/category')">更多 &rsaquo;</span>
        </div>
        <div class="community-list">
          <div
            v-for="comm in communities"
            :key="comm.name"
            class="community-item"
            @click="goToCategory(comm.tag)"
          >
            <div class="community-icon" :style="{ background: comm.color }">
              {{ comm.icon }}
            </div>
            <span class="community-name">{{ comm.name }}</span>
            <span class="community-arrow">&rsaquo;</span>
          </div>
        </div>
      </div>

      <!-- 直播 -->
      <div class="right-card">
        <div class="right-card-header">
          <span class="right-card-title">直播</span>
          <span class="right-card-more" @click="router.push('/category')">更多 &rsaquo;</span>
        </div>
        <div class="live-list">
          <div
            v-for="live in liveList"
            :key="live.id"
            class="live-item"
            @click="goToDetail(live.id)"
          >
            <div class="live-play-icon"></div>
            <div class="live-info">
              <div class="live-title">{{ live.title }}</div>
              <div class="live-meta">
                <span class="live-time">{{ live.time }}</span>
                <span class="live-tag" :class="live.tagType">{{ live.tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 活动日历 -->
      <div class="right-card">
        <div class="right-card-header">
          <span class="right-card-title">活动日历</span>
          <span class="right-card-more" @click="router.push('/about')">更多 &rsaquo;</span>
        </div>
        <div class="event-list">
          <div
            v-for="event in eventList"
            :key="event.id"
            class="event-item"
            @click="router.push('/about')"
          >
            <div class="event-date-block">
              <div class="event-day">{{ event.day }}</div>
              <div class="event-month">{{ event.month }}</div>
            </div>
            <div class="event-info">
              <div class="event-title">{{ event.title }}</div>
              <span class="event-location-tag">{{ event.location }}</span>
            </div>
          </div>
        </div>
      </div>

    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import '../assets/css/index.css'
import '../assets/css/link.css'

const router = useRouter()
const route = useRoute()

/* ═══════════════════════════════
   侧边栏导航（路由联动）
═══════════════════════════════ */
interface SidebarItem {
  key?: string
  icon?: string
  label?: string
  badge?: string
  badgeType?: string
  path?: string
  exact?: boolean
  divider?: boolean
}

const sidebarNav: SidebarItem[] = [
  { key: 'home',    icon: '⌂', label: '首页',     path: '/',         exact: true },
  { key: 'blog',    icon: '✎', label: '博客',     path: '/category'  },
  { key: 'about',   icon: '◎', label: '关于',     path: '/about'     },
  { key: 'user',    icon: '◉', label: '我的主页', path: '/user'      },
  { divider: true },
  { key: 'model',   icon: '⚡', label: '模型市场', badge: '官方 5折', badgeType: 'official', path: '/category' },
  { key: 'ai',      icon: '✦', label: 'AI搜索',   path: '/category'  },
  { key: 'detail',  icon: '◈', label: '文章详情', path: '/detail/1'  },
  { key: 'conf',    icon: '♦', label: '技术会议', path: '/about'     },
  { divider: true },
  { key: 'sub',     icon: '☆', label: '订阅',     path: '/user'      },
  { key: 'fav',     icon: '♡', label: '收藏',     path: '/user'      },
  { key: 'hist',    icon: '◷', label: '历史',     path: '/user'      },
  { divider: true },
  { key: 'member',  icon: '◈', label: '会员中心', path: '/user'      },
  { key: 'create',  icon: '✐', label: '创作中心', path: '/register'  },
  { key: 'power',   icon: '⚙', label: '我的算力', badge: '超值低价',  badgeType: 'deal', path: '/user' },
]

const isNavActive = (item: SidebarItem): boolean => {
  if (!item.path) return false
  if (item.exact) return route.path === item.path
  return route.path.startsWith(item.path) && item.path !== '/'
}

const handleSidebarClick = (item: SidebarItem) => {
  if (item.path) router.push(item.path)
}

/* ═══════════════════════════════
   分类标签（带路由跳转）
═══════════════════════════════ */
interface CategoryTab {
  key: string
  label: string
}

const categoryTabs: CategoryTab[] = [
  { key: 'all',       label: '全部'          },
  { key: '资讯',      label: '资讯'          },
  { key: 'vue',       label: 'Vue.js'        },
  { key: 'javascript',label: 'JavaScript'    },
  { key: 'typescript',label: 'TypeScript'    },
  { key: 'html',      label: 'HTML5'         },
  { key: 'css',       label: 'CSS3'          },
  { key: '前端',      label: '前端'          },
  { key: '后端',      label: '后端'          },
  { key: '人工智能',  label: '人工智能'      },
  { key: 'java',      label: 'Java'          },
  { key: 'python',    label: 'Python'        },
]

const activeTab = ref('all')

const handleTabClick = (tab: CategoryTab) => {
  activeTab.value = tab.key
  if (tab.key === 'all') {
    router.push('/category')
  } else {
    router.push({ path: '/category', query: { tag: tab.key } })
  }
}

/* ═══════════════════════════════
   焦点轮播图
═══════════════════════════════ */
interface CarouselSlide {
  id: number
  image: string
  title: string
  desc: string
  tag: string
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=1200',
    title: 'Vue 3 Composition API 完全指南',
    desc: '深入理解响应式原理，掌握 setup、ref、reactive 等核心 API',
    tag: 'Vue.js'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=1200',
    title: 'CSS Grid 与 Flexbox 布局终极对比',
    desc: '系统对比两种布局方案的适用场景，告别布局选择困难',
    tag: 'CSS3'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/416928/pexels-photo-416928.jpeg?w=1200',
    title: 'TypeScript 5.0 全新特性解析',
    desc: '装饰器标准化、const 类型参数等重磅更新逐一拆解',
    tag: 'TypeScript'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?w=1200',
    title: 'JavaScript ES2024 新特性速览',
    desc: 'Object.groupBy、Promise.withResolvers 等实用新 API 全面解读',
    tag: 'JavaScript'
  },
]

const carouselIndex = ref(0)
const isPaused = ref(false)
const pauseKey = ref(0)
const progressDuration = 4000
let carouselTimer: number | undefined

const nextSlide = () => {
  carouselIndex.value = (carouselIndex.value + 1) % carouselSlides.length
  pauseKey.value++
}

const prevSlide = () => {
  carouselIndex.value = (carouselIndex.value - 1 + carouselSlides.length) % carouselSlides.length
  pauseKey.value++
}

const goToSlide = (i: number) => {
  carouselIndex.value = i
  pauseKey.value++
}

const pauseCarousel = () => {
  isPaused.value = true
  clearInterval(carouselTimer)
}

const resumeCarousel = () => {
  isPaused.value = false
  pauseKey.value++
  startCarousel()
}

const startCarousel = () => {
  clearInterval(carouselTimer)
  carouselTimer = window.setInterval(() => {
    nextSlide()
  }, progressDuration)
}

onMounted(() => startCarousel())
onUnmounted(() => clearInterval(carouselTimer))

/* ═══════════════════════════════
   资讯头条（技术推荐）
═══════════════════════════════ */
interface NewsCard { id: number; image: string; title: string }

const newsCards: NewsCard[] = [
  { id: 1, image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?w=600',
    title: 'ChatGPT 和 Claude 背后的"薪本生意"曝光，月费200美元却可能亏1.4万' },
  { id: 2, image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=600',
    title: '应届生几乎没机会，80%带着同一句话入职，Anthropic 1680位工程师揭秘' },
  { id: 3, image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=600',
    title: '曝字节每天不足百万收入；DeepSeek完成500亿元融资，梁文锋出资200亿' },
  { id: 4, image: 'https://images.pexels.com/photos/416928/pexels-photo-416928.jpeg?w=600',
    title: '突发！用 Claude 克隆AI了，Anthropic 新政策下个月生效' },
]

interface NewsText { id: number; title: string }
const newsTextList: NewsText[] = [
  { id: 5, title: 'Firefox为什么掉队？15年老员工辞职发声：本来就是小众浏览器，别再模仿Chrome' },
  { id: 6, title: '"告诉他，他就是个泥蛋！"6500名工程师被迫给AI打工，Meta内部会议突发失控' },
  { id: 7, title: '开源AI跻身全球第一梯队！第21届开源中国·开源世界高峰论坛嘉宾揭晓' },
  { id: 8, title: '王坚：AI先冲击的就是程序员，让 token 像水电一样便宜才是希望' },
  { id: 9, title: '学位重要性下降，AI制造 AI 正在发生！五位顶尖学者谈 AI 自进化与 AGI 临界点' },
  { id: 10, title: '105秒下架73个仓库！微软官方库再遭"投毒"；打开Cursor就可能丢密码？' },
]

/* ═══════════════════════════════
   开源项目
═══════════════════════════════ */
interface OpenSource { id: number; name: string; desc: string; logo: string; lang: string; langClass: string }

const opensourceProjects: OpenSource[] = [
  { id: 11, name: 'atomcode：开源轻量代码编辑器，助力高效开发',
    desc: '轻量级现代代码编辑器，支持多语言高亮、智能补全和插件系统。',
    logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?w=100',
    lang: 'Rust', langClass: 'rust' },
  { id: 12, name: 'CANN学习Hub：AI芯片技术学习资源与实践教程',
    desc: '华为昇腾 AI 芯片软件栈学习资源汇总，包含教程、案例和文档。',
    logo: 'https://images.pexels.com/photos/110469/pexels-photo-110469.jpeg?w=100',
    lang: 'Jupyter Notebook', langClass: 'jupyter' },
  { id: 13, name: '开源通用语言模型GLM-5.2，赋能高效文本处理',
    desc: '清华大学开源双语预训练语言模型，支持中英文问答、摘要生成等任务。',
    logo: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?w=100',
    lang: 'Python', langClass: 'python' },
  { id: 14, name: 'tiny-universe：轻量开源项目，助力技能学习与实践',
    desc: '专为初学者设计的迷你项目合集，涵盖机器学习基础到实战应用。',
    logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=100',
    lang: 'Jupyter Notebook', langClass: 'jupyter' },
]

/* ═══════════════════════════════
   精选博客（最新文章）
═══════════════════════════════ */
interface BlogArticle {
  id: number; title: string; excerpt: string; thumb: string
  author: string; authorAvatar: string
  views: string; likes: string; comments: string; collects: string
}

const latestArticles: BlogArticle[] = [
  { id: 1, title: '刚刚，鸿蒙SDK26重大升级！',
    excerpt: '包含Kit：Agent Framework Kit、Intents Kit、Ability Kit、Multimodal Awareness Kit、Camera Kit、Media Kit、Audio Kit、Image Kit、Scan Kit…',
    thumb: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=300',
    author: '程序员差不多先生', authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=80',
    views: '2k', likes: '15', comments: '3', collects: '5' },
  { id: 2, title: '2026三款AI办公助手实测：ToDesk AI、QClaw、Kimi到底怎么选？',
    excerpt: '一年前大家还在比"谁聊天更顺"，现在问题变成了：它能不能真的帮你把事做完？我密集体验了三款产品……',
    thumb: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=300',
    author: '稀色清风', authorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=80',
    views: '1.8k', likes: '23', comments: '7', collects: '12' },
  { id: 3, title: 'Vue 3 Composition API 实战教程与最佳实践',
    excerpt: '深入讲解 Vue 3 的 Composition API，包括 setup 函数、响应式 API、生命周期钩子等核心概念，并通过实际案例演示如何高效使用。',
    thumb: 'https://images.pexels.com/photos/416928/pexels-photo-416928.jpeg?w=300',
    author: '技术博主', authorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=80',
    views: '1.2k', likes: '86', comments: '12', collects: '34' },
  { id: 4, title: 'CSS Grid 与 Flexbox 终极对比：什么时候该用哪个？',
    excerpt: '很多开发者面对布局常困惑：该用 Grid 还是 Flexbox？本文通过大量案例，系统性对比两者的适用场景，帮你建立清晰的决策框架。',
    thumb: 'https://images.pexels.com/photos/110469/pexels-photo-110469.jpeg?w=300',
    author: '前端进阶者', authorAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=80',
    views: '3.4k', likes: '142', comments: '28', collects: '67' },
  { id: 5, title: 'TypeScript 5.0 新特性全解析与迁移指南',
    excerpt: 'TypeScript 5.0 带来装饰器标准化、const 类型参数、多个配置文件扩展等重要特性。本文逐一讲解并提供从 4.x 升级的实战指南。',
    thumb: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?w=300',
    author: 'TS深度玩家', authorAvatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?w=80',
    views: '2.1k', likes: '98', comments: '19', collects: '45' },
]

/* ═══════════════════════════════
   右侧栏数据
═══════════════════════════════ */
interface Community { name: string; icon: string; color: string; tag: string }
const communities: Community[] = [
  { name: '高通开发者中文社区',   icon: 'Q', color: '#3253dc', tag: 'qualcomm'  },
  { name: 'HarmonyOS开发者社区', icon: 'H', color: '#cf0a2c', tag: 'harmony'   },
  { name: 'NVIDIA AI技术专区',   icon: 'N', color: '#76b900', tag: 'nvidia'    },
  { name: '葡萄城开发者空间',    icon: 'G', color: '#e85d04', tag: 'vue'       },
  { name: 'DAMO开发者矩阵',      icon: 'D', color: '#0078d4', tag: 'javascript'},
  { name: 'LAVAL社区',           icon: 'L', color: '#7c3aed', tag: 'css'       },
  { name: '腾启社区',            icon: 'T', color: '#0ea5e9', tag: 'html'      },
]

interface LiveItem { id: number; title: string; time: string; tag: string; tagType: string }
const liveList: LiveItem[] = [
  { id: 1,  title: 'CANNBot算子Harness工程建设',                    time: '06/18 16:00', tag: '直播预约', tagType: 'scheduled' },
  { id: 2,  title: 'AutoOps：大规模检测、诊断和优化 Elasticsearch', time: '06/24 06:00', tag: '直播预约', tagType: 'scheduled' },
  { id: 3,  title: '【企业对话专场】xLLM大模型推理优化之路',        time: '热度 366',    tag: '热门',     tagType: 'hot'       },
  { id: 4,  title: 'CANNBot TileLang',                             time: '热度 5249',   tag: '热门',     tagType: 'hot'       },
]

interface EventItem { id: number; day: number; month: string; title: string; location: string }
const eventList: EventItem[] = [
  { id: 1, day: 23, month: '6月', title: '24h 黑客松极限赛模拟球探开发',     location: '线下' },
  { id: 2, day: 23, month: '6月', title: '亚马逊云科技中国峰会',             location: '上海' },
  { id: 3, day: 25, month: '6月', title: '第21届开源中国·开源世界高峰论坛', location: '北京' },
  { id: 4, day: 28, month: '6月', title: 'CANN算子开发大赛决赛路演',        location: '线上' },
]

/* ═══════════════════════════════
   公共跳转
═══════════════════════════════ */
const goToCategory = (tag: string) => {
  router.push({ path: '/category', query: { tag } })
}

const goToDetail = (id: number) => {
  router.push(`/detail/${id}`)
}
</script>
