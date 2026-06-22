<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="logo-icon">B</div>
            <span class="logo-text">Blog</span>
          </div>
          <p class="footer-desc">
            一个专注于分享前端技术文章的个人博客，记录学习与成长。
          </p>
          <div class="footer-social">
            <a href="#" class="social-item" title="GitHub">
              <span>G</span>
            </a>
            <a href="#" class="social-item" title="微博">
              <span>W</span>
            </a>
            <a href="#" class="social-item" title="知乎">
              <span>Z</span>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h4 class="footer-title">快速链接</h4>
            <ul class="footer-list">
              <li><router-link to="/" class="footer-link">首页</router-link></li>
              <li><router-link to="/category" class="footer-link">分类</router-link></li>
              <li><router-link to="/about" class="footer-link">关于</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-title">技术分类</h4>
            <ul class="footer-list">
              <li><router-link to="/category?tag=vue" class="footer-link">Vue.js</router-link></li>
              <li><router-link to="/category?tag=html" class="footer-link">HTML</router-link></li>
              <li><router-link to="/category?tag=css" class="footer-link">CSS</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-title">联系方式</h4>
            <ul class="footer-list">
              <li class="footer-contact">
                <span class="contact-icon">E</span>
                <span>blog@example.com</span>
              </li>
              <li class="footer-contact">
                <span class="contact-icon">G</span>
                <span>github.com/myblog</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          Copyright 2024 Blog. All rights reserved.
        </p>
        <div class="footer-meta">
          <router-link to="/about" class="meta-link">关于本站</router-link>
          <span class="divider">|</span>
          <a href="#" class="meta-link">隐私政策</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style>
.site-footer {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: #fff;
  margin-top: 60px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-top {
  padding: 50px 0;
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.footer-logo .logo-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 22px;
}

.footer-logo .logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.footer-desc {
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 25px;
}

.footer-social {
  display: flex;
  gap: 12px;
}

.social-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  transition: all 0.3s ease;
}

.social-item:hover {
  background: #3b82f6;
  transform: translateY(-3px);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: #9ca3af;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #3b82f6;
}

.footer-contact {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #9ca3af;
  font-size: 14px;
}

.contact-icon {
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-weight: 600;
  font-size: 12px;
}

.footer-bottom {
  padding: 25px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: #6b7280;
  font-size: 14px;
}

.footer-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.meta-link {
  color: #6b7280;
  font-size: 14px;
  transition: color 0.3s ease;
}

.meta-link:hover {
  color: #3b82f6;
}

.divider {
  color: #4b5563;
}

@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-links {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .footer-social {
    justify-content: center;
  }
}
</style>
