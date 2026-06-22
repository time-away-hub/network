<template>
  <nav class="site-nav">
    <ul class="nav-list">
      <li v-for="item in navItems" :key="item.path" class="nav-item">
        <router-link
          :to="item.path"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

interface NavItem {
  name: string
  path: string
}

const route = useRoute()

const navItems: NavItem[] = [
  { name: '首页', path: '/' },
  { name: '分类', path: '/category' },
  { name: '关于', path: '/about' }
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<style>
.site-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 10px;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: block;
  padding: 10px 20px;
  color: #4b5563;
  font-weight: 500;
  font-size: 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #3b82f6;
  background: #f0f9ff;
}

.nav-link.active {
  color: #3b82f6;
  background: #dbeafe;
}

@media (max-width: 768px) {
  .site-nav {
    display: none;
  }
}
</style>
