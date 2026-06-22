<template>
  <div class="user-page">
    <div class="user-container">
      <!-- 用户信息卡片 -->
      <div class="user-card">
        <div class="user-cover">
          <img src="https://images.pexels.com/photos/416928/pexels-photo-416928.jpeg?w=1400" alt="cover" />
        </div>
        <div class="user-info">
          <div class="user-avatar-wrapper">
            <img :src="userInfo.avatar" alt="avatar" class="user-avatar" />
            <button class="avatar-edit-btn" title="更换头像">&#128247;</button>
          </div>
          <div class="user-details">
            <h2 class="user-name">{{ userInfo.name }}</h2>
            <p class="user-title">{{ userInfo.title }}</p>
            <p class="user-bio">{{ userInfo.bio }}</p>
          </div>
          <div class="user-actions">
            <button class="edit-profile-btn" @click="isEditing = true">
              &#9998; 编辑资料
            </button>
          </div>
        </div>
      </div>

      <!-- 统计数据 -->
      <div class="user-stats">
        <div class="stat-card">
          <div class="stat-icon">&#128196;</div>
          <div class="stat-content">
            <div class="stat-value">{{ userStats.articles }}</div>
            <div class="stat-label">文章</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">&#128065;</div>
          <div class="stat-content">
            <div class="stat-value">{{ userStats.views }}</div>
            <div class="stat-label">阅读</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">&#128077;</div>
          <div class="stat-content">
            <div class="stat-value">{{ userStats.likes }}</div>
            <div class="stat-label">点赞</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">&#9733;</div>
          <div class="stat-content">
            <div class="stat-value">{{ userStats.collects }}</div>
            <div class="stat-label">收藏</div>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="user-content">
        <!-- 标签页 -->
        <div class="user-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="user-tab"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- 我的文章 -->
        <div v-if="activeTab === 'articles'" class="user-articles">
          <div
            v-for="article in myArticles"
            :key="article.id"
            class="user-article-card"
          >
            <div class="article-image">
              <img :src="article.thumb" :alt="article.title" />
            </div>
            <div class="article-content">
              <h4 class="article-title">{{ article.title }}</h4>
              <p class="article-desc">{{ article.desc }}</p>
              <div class="article-meta">
                <span class="meta-item">
                  <span>&#128197;</span>
                  {{ article.date }}
                </span>
                <span class="meta-item">
                  <span>&#128065;</span>
                  {{ article.views }}
                </span>
                <span class="meta-item">
                  <span>&#128077;</span>
                  {{ article.likes }}
                </span>
              </div>
            </div>
            <div class="article-actions">
              <button class="action-btn-small edit">&#9998;</button>
              <button class="action-btn-small delete">&#128465;</button>
            </div>
          </div>
        </div>

        <!-- 我的收藏 -->
        <div v-if="activeTab === 'collects'" class="user-collects">
          <div
            v-for="article in collectsArticles"
            :key="article.id"
            class="user-article-card"
            @click="goToDetail(article.id)"
          >
            <div class="article-image">
              <img :src="article.thumb" :alt="article.title" />
            </div>
            <div class="article-content">
              <h4 class="article-title">{{ article.title }}</h4>
              <p class="article-desc">{{ article.author }}</p>
              <div class="article-meta">
                <span class="meta-item">
                  <span>&#128197;</span>
                  {{ article.date }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 草稿箱 -->
        <div v-if="activeTab === 'drafts'" class="user-drafts">
          <div class="empty-state">
            <div class="empty-icon">&#128196;</div>
            <p class="empty-text">暂无草稿</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑弹窗 -->
    <div v-if="isEditing" class="edit-modal-overlay" @click.self="isEditing = false">
      <div class="edit-modal">
        <div class="modal-header">
          <h3>编辑个人资料</h3>
          <button class="close-btn" @click="isEditing = false">&#10007;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">昵称</label>
            <input v-model="editForm.name" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">职业</label>
            <input v-model="editForm.title" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">个人简介</label>
            <textarea v-model="editForm.bio" class="form-textarea"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="isEditing = false">取消</button>
          <button class="save-btn" @click="saveProfile">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/css/link.css'

const router = useRouter()

const isEditing = ref(false)
const activeTab = ref('articles')

const userInfo = reactive({
  name: '技术博主',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=200',
  title: '前端开发工程师',
  bio: '热爱前端技术，专注于 Vue.js、React 等现代前端框架的学习与实践。'
})

const editForm = reactive({
  name: userInfo.name,
  title: userInfo.title,
  bio: userInfo.bio
})

const userStats = reactive({
  articles: 12,
  views: '15.8k',
  likes: '326',
  collects: 48
})

const tabs = [
  { key: 'articles', label: '我的文章' },
  { key: 'collects', label: '我的收藏' },
  { key: 'drafts', label: '草稿箱' }
]

const myArticles = [
  {
    id: 1,
    title: 'Vue 3 Composition API 实战教程',
    desc: '本文将深入讲解 Vue 3 的 Composition API...',
    thumb: 'https://images.pexels.com/photos/110469/pexels-photo-110469.jpeg?w=300',
    date: '2024-01-15',
    views: '1.2k',
    likes: '86'
  },
  {
    id: 2,
    title: 'CSS Flexbox 布局完全指南',
    desc: '从基础到进阶，掌握 Flexbox 布局的所有知识点...',
    thumb: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=300',
    date: '2024-01-10',
    views: '1.5k',
    likes: '128'
  }
]

const collectsArticles = [
  {
    id: 4,
    title: 'JavaScript ES6+ 新特性总结',
    author: '其他作者',
    thumb: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?w=300',
    date: '2024-01-20'
  },
  {
    id: 5,
    title: 'TypeScript 类型体操进阶',
    author: '其他作者',
    thumb: 'https://images.pexels.com/photos/416928/pexels-photo-416928.jpeg?w=300',
    date: '2024-01-22'
  }
]

const saveProfile = () => {
  userInfo.name = editForm.name
  userInfo.title = editForm.title
  userInfo.bio = editForm.bio
  isEditing.value = false
}

const goToDetail = (id: number) => {
  router.push(`/detail/${id}`)
}
</script>

<style>
.user-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.user-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.user-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.user-cover {
  height: 200px;
  overflow: hidden;
}

.user-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  padding: 0 40px 30px;
  display: flex;
  align-items: flex-end;
  gap: 30px;
  margin-top: -60px;
}

.user-avatar-wrapper {
  position: relative;
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.avatar-edit-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #3b82f6;
  color: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.avatar-edit-btn:hover {
  background: #2563eb;
}

.user-details {
  flex: 1;
  padding-bottom: 10px;
}

.user-name {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 5px;
}

.user-title {
  font-size: 16px;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 10px;
}

.user-bio {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
}

.user-actions {
  padding-bottom: 10px;
}

.edit-profile-btn {
  padding: 10px 25px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.edit-profile-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.user-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-icon {
  font-size: 32px;
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  color: #1f2937;
}

.stat-label {
  font-size: 14px;
  color: #9ca3af;
  margin-top: 5px;
}

.user-content {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.user-tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.user-tab {
  flex: 1;
  padding: 20px;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.user-tab:hover {
  color: #3b82f6;
}

.user-tab.active {
  color: #3b82f6;
}

.user-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: #3b82f6;
  border-radius: 3px;
}

.user-articles,
.user-collects {
  padding: 20px;
}

.user-article-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  transition: background 0.3s;
  cursor: pointer;
  margin-bottom: 10px;
}

.user-article-card:hover {
  background: #f9fafb;
}

.article-image {
  width: 160px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  flex: 1;
}

.article-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.article-desc {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 10px;
}

.article-meta {
  display: flex;
  gap: 20px;
}

.meta-item {
  font-size: 13px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 5px;
}

.article-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.action-btn-small {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.action-btn-small.edit {
  background: #dbeafe;
  color: #3b82f6;
}

.action-btn-small.edit:hover {
  background: #3b82f6;
  color: #fff;
}

.action-btn-small.delete {
  background: #fee2e2;
  color: #ef4444;
}

.action-btn-small.delete:hover {
  background: #ef4444;
  color: #fff;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 60px;
  color: #d1d5db;
  margin-bottom: 15px;
}

.empty-text {
  font-size: 16px;
  color: #9ca3af;
}

.edit-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.edit-modal {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 18px;
  color: #1f2937;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f3f4f6;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.close-btn:hover {
  background: #e5e7eb;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  box-sizing: border-box;
}

.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  padding: 10px 20px;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.cancel-btn:hover {
  background: #f3f4f6;
}

.save-btn {
  padding: 10px 20px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.save-btn:hover {
  background: #2563eb;
}

@media (max-width: 768px) {
  .user-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -80px;
    padding: 0 20px 30px;
  }

  .user-avatar {
    width: 100px;
    height: 100px;
  }

  .user-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .user-article-card {
    flex-direction: column;
  }

  .article-image {
    width: 100%;
    height: 150px;
  }

  .article-actions {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 10px;
  }
}
</style>
