<template>
  <header class="site-header">
    <div class="header-inner">

      <!-- 左：Logo -->
      <router-link to="/" class="header-logo">
        <div class="header-logo-icon">B</div>
        <span class="header-logo-text">Blog</span>
      </router-link>

      <!-- 中左：快捷导航（非首页可见）-->
      <nav class="header-quick-nav">
        <router-link to="/" class="header-quick-link" active-class="hql-active" exact>首页</router-link>
        <router-link to="/category" class="header-quick-link" active-class="hql-active">分类</router-link>
        <router-link to="/about" class="header-quick-link" active-class="hql-active">关于</router-link>
      </nav>

      <!-- 中：搜索栏 -->
      <div class="header-search-wrap">
        <input
          type="text"
          class="header-search-input"
          placeholder="搜索文章、教程、开源项目..."
          v-model="searchKeyword"
          @keyup.enter="handleSearch"
        />
        <button class="header-search-btn" @click="handleSearch">
          &#128269; 搜索
        </button>
        <button class="header-ai-btn" @click="handleSearch">
          AI 搜索
        </button>
      </div>

      <!-- 右：操作区 -->
      <div class="header-actions">
        <template v-if="!isLoggedIn">
          <router-link to="/" class="header-login-link">登录</router-link>
          <router-link to="/register" class="header-register-link">注册</router-link>
        </template>
        <template v-else>
          <router-link to="/user" class="header-user-avatar">
            <img v-if="userAvatar" :src="userAvatar" alt="avatar" />
            <span v-else class="header-avatar-placeholder">U</span>
          </router-link>
        </template>

        <button class="header-notify-btn" title="消息">
          <span class="notify-icon">&#128276;</span>
        </button>

        <button class="header-create-btn" @click="goToRegister">
          <span class="create-plus">+</span> 创作
          <span class="create-arrow">&#9660;</span>
        </button>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

const router = useRouter()
const userStore = useUserStore()

const searchKeyword = ref('')

const isLoggedIn = computed(() => userStore.isLoggedIn)
const userAvatar = computed(() => userStore.userAvatar)

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({ path: '/category', query: { search: searchKeyword.value.trim() } })
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style>
/* Header 全局样式 */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #fff;
  border-bottom: 1px solid #edeef0;
  height: 50px;
}

.header-inner {
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1600px;
  margin: 0 auto;
}

/* Logo */
.header-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;
  margin-right: 8px;
}

.header-logo-icon {
  width: 32px;
  height: 32px;
  background: #fc5531;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
}

.header-logo-text {
  font-size: 18px;
  font-weight: 700;
  color: #1d2129;
  letter-spacing: -0.5px;
}

.header-logo:hover .header-logo-text {
  color: #fc5531;
}

/* 快捷导航 */
.header-quick-nav {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.header-quick-link {
  font-size: 14px;
  color: #4e5969;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
  white-space: nowrap;
}

.header-quick-link:hover {
  color: #fc5531;
  background: #fff5f3;
}

.hql-active {
  color: #fc5531;
  font-weight: 600;
}

/* 搜索栏 */
.header-search-wrap {
  flex: 1;
  max-width: 580px;
  display: flex;
  align-items: center;
  height: 34px;
  border: 1.5px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.header-search-wrap:focus-within {
  border-color: #fc5531;
}

.header-search-input {
  flex: 1;
  height: 100%;
  border: none;
  padding: 0 12px;
  font-size: 13px;
  color: #1d2129;
  background: transparent;
  outline: none;
}

.header-search-input::placeholder {
  color: #c9cdd4;
}

.header-search-btn {
  height: 100%;
  padding: 0 14px;
  background: #fc5531;
  color: #fff;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-search-btn:hover {
  background: #e04428;
}

.header-ai-btn {
  height: 100%;
  padding: 0 12px;
  background: linear-gradient(90deg, #1a6dff, #7c3aed);
  color: #fff;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-ai-btn:hover {
  opacity: 0.9;
}

/* 右侧操作区 */
.header-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.header-login-link {
  font-size: 14px;
  color: #1d2129;
  text-decoration: none;
  transition: color 0.2s;
}

.header-login-link:hover {
  color: #fc5531;
}

.header-register-link {
  font-size: 13px;
  color: #4e5969;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  transition: all 0.2s;
}

.header-register-link:hover {
  border-color: #fc5531;
  color: #fc5531;
}

.header-user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fc5531;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.header-user-avatar:hover {
  transform: scale(1.08);
}

.header-user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-avatar-placeholder {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.header-notify-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #4e5969;
  transition: background 0.2s, color 0.2s;
}

.header-notify-btn:hover {
  background: #f2f3f5;
  color: #fc5531;
}

.header-create-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 14px;
  height: 32px;
  background: #fc5531;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.header-create-btn:hover {
  background: #e04428;
}

.create-plus {
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
}

.create-arrow {
  font-size: 9px;
  opacity: 0.8;
}

/* 响应式 */
@media (max-width: 900px) {
  .header-ai-btn {
    display: none;
  }

  .header-search-wrap {
    max-width: 340px;
  }
}

@media (max-width: 640px) {
  .header-inner {
    padding: 0 12px;
    gap: 10px;
  }

  .header-logo-text {
    display: none;
  }

  .header-search-wrap {
    max-width: 220px;
  }

  .header-notify-btn,
  .header-register-link {
    display: none;
  }
}
</style>
