<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-content">
        <div class="hero-logo">B</div>
        <h1 class="hero-title">关于博客</h1>
        <p class="hero-subtitle">记录技术成长，分享学习心得</p>
      </div>
    </section>

    <!-- 博主介绍 -->
    <section class="about-author">
      <div class="author-container">
        <div class="author-image">
          <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400" alt="author" />
        </div>
        <div class="author-info">
          <h2 class="author-name">技术博主</h2>
          <p class="author-title">前端开发工程师</p>
          <p class="author-desc">
            我是一名热爱前端技术的开发者，专注于 Vue.js、React 等现代前端框架的学习与实践。
            创建这个博客的初衷是记录自己的学习历程，同时希望能够帮助到更多的开发者。
          </p>
          <p class="author-desc">
            在这里，我会分享关于前端开发的各种知识，包括 HTML、CSS、JavaScript 以及各类框架和工具的使用技巧。
            希望能够与大家一起进步，共同探索前端技术的魅力。
          </p>
          <div class="author-skills">
            <span class="skill-tag">Vue.js</span>
            <span class="skill-tag">React</span>
            <span class="skill-tag">TypeScript</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">CSS3</span>
            <span class="skill-tag">HTML5</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 博客特色 -->
    <section class="about-features">
      <h2 class="section-title">博客特色</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">&#128218;</div>
          <h3 class="feature-title">原创内容</h3>
          <p class="feature-desc">
            所有文章均为原创，基于实际开发经验总结，注重实践与理论结合。
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#128640;</div>
          <h3 class="feature-title">技术前沿</h3>
          <p class="feature-desc">
            紧跟前端技术发展趋势，分享最新框架、工具和最佳实践。
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#128172;</div>
          <h3 class="feature-title">互动交流</h3>
          <p class="feature-desc">
            欢迎读者留言交流，一起探讨技术问题，共同进步。
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#127919;</div>
          <h3 class="feature-title">持续更新</h3>
          <p class="feature-desc">
            定期更新文章内容，确保知识的时效性和准确性。
          </p>
        </div>
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="about-stats">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-num">128+</div>
          <div class="stat-text">原创文章</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">50k+</div>
          <div class="stat-text">阅读量</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">1k+</div>
          <div class="stat-text">评论互动</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">365</div>
          <div class="stat-text">持续更新天数</div>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="about-contact">
      <h2 class="section-title">联系方式</h2>
      <p class="contact-desc">
        如果您有任何问题或建议，欢迎通过以下方式与我联系
      </p>
      <div class="contact-methods">
        <div class="contact-card">
          <div class="contact-icon">&#9993;</div>
          <span class="contact-label">邮箱</span>
          <span class="contact-value">blog@example.com</span>
        </div>
        <div class="contact-card">
          <div class="contact-icon">G</div>
          <span class="contact-label">GitHub</span>
          <span class="contact-value">github.com/myblog</span>
        </div>
        <div class="contact-card">
          <div class="contact-icon">W</div>
          <span class="contact-label">微博</span>
          <span class="contact-value">@技术博主</span>
        </div>
      </div>
    </section>

    <!-- 技术支持 -->
    <section class="about-tech">
      <h2 class="section-title">技术支持</h2>
      <p class="tech-desc">
        本博客使用以下技术构建
      </p>
      <div class="tech-stack">
        <div class="tech-item">
          <div class="tech-logo">V</div>
          <span class="tech-name">Vue 3</span>
        </div>
        <div class="tech-item">
          <div class="tech-logo">R</div>
          <span class="tech-name">Vue Router</span>
        </div>
        <div class="tech-item">
          <div class="tech-logo">P</div>
          <span class="tech-name">Pinia</span>
        </div>
        <div class="tech-item">
          <div class="tech-logo">T</div>
          <span class="tech-name">TypeScript</span>
        </div>
        <div class="tech-item">
          <div class="tech-logo">V</div>
          <span class="tech-name">Vite</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import '../assets/css/link.css'
</script>

<style>
.about-page {
  min-height: 100vh;
}

/* Hero Section */
.about-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 100px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.about-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-logo {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
}

/* Author Section */
.about-author {
  padding: 80px 20px;
  background: #fff;
}

.author-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  gap: 60px;
  align-items: center;
}

.author-image {
  flex-shrink: 0;
}

.author-image img {
  width: 280px;
  height: 280px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
}

.author-title {
  font-size: 18px;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 20px;
}

.author-desc {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.8;
  margin-bottom: 15px;
}

.author-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 25px;
}

.skill-tag {
  padding: 8px 18px;
  background: #f0f9ff;
  color: #3b82f6;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.skill-tag:hover {
  background: #3b82f6;
  color: #fff;
}

/* Features Section */
.about-features {
  padding: 80px 20px;
  background: #f9fafb;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 50px;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.feature-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 15px;
}

.feature-desc {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.7;
}

/* Stats Section */
.about-stats {
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stats-container {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-num {
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}

.stat-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

/* Contact Section */
.about-contact {
  padding: 80px 20px;
  background: #fff;
}

.contact-desc {
  text-align: center;
  font-size: 16px;
  color: #6b7280;
  margin-top: -30px;
  margin-bottom: 50px;
}

.contact-methods {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.contact-card {
  background: #f9fafb;
  border-radius: 16px;
  padding: 35px 25px;
  text-align: center;
  transition: all 0.3s;
}

.contact-card:hover {
  background: #f0f9ff;
  transform: translateY(-5px);
}

.contact-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 24px;
  color: #fff;
  font-weight: 600;
}

.contact-label {
  display: block;
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 8px;
}

.contact-value {
  font-size: 16px;
  color: #1f2937;
  font-weight: 500;
}

/* Tech Section */
.about-tech {
  padding: 80px 20px;
  background: #f9fafb;
}

.tech-desc {
  text-align: center;
  font-size: 16px;
  color: #6b7280;
  margin-top: -30px;
  margin-bottom: 50px;
}

.tech-stack {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s;
}

.tech-item:hover {
  transform: scale(1.1);
}

.tech-logo {
  width: 70px;
  height: 70px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.tech-name {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-hero {
    padding: 60px 20px;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .author-container {
    flex-direction: column;
    text-align: center;
  }

  .author-image img {
    width: 200px;
    height: 200px;
  }

  .author-skills {
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-methods {
    grid-template-columns: 1fr;
  }

  .stat-num {
    font-size: 36px;
  }
}
</style>
