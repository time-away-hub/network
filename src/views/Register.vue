<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <!-- 头部 -->
        <div class="register-header">
          <div class="register-logo">B</div>
          <h1 class="register-title">创建账户</h1>
          <p class="register-subtitle">开启您的技术博客之旅</p>
        </div>

        <!-- 表单 -->
        <form class="register-form" @submit.prevent="handleSubmit">
          <!-- 用户名 -->
          <div class="form-group">
            <label class="form-label form-label-required">用户名</label>
            <div class="input-wrapper">
              <span class="input-icon">&#128100;</span>
              <input
                v-model="form.username"
                type="text"
                class="form-input"
                :class="{
                  error: errors.username,
                  success: form.username && !errors.username
                }"
                placeholder="请输入用户名"
                @blur="validateUsername"
              />
              <span v-if="form.username" class="validation-icon" :class="errors.username ? 'error' : 'success'">
                {{ errors.username ? '&#10007;' : '&#10003;' }}
              </span>
            </div>
            <div v-if="errors.username" class="error-message">
              <span class="error-icon">&#9888;</span>
              {{ errors.username }}
            </div>
          </div>

          <!-- 邮箱 -->
          <div class="form-group">
            <label class="form-label form-label-required">邮箱</label>
            <div class="input-wrapper">
              <span class="input-icon">&#9993;</span>
              <input
                v-model="form.email"
                type="email"
                class="form-input"
                :class="{
                  error: errors.email,
                  success: form.email && !errors.email
                }"
                placeholder="请输入邮箱地址"
                @blur="validateEmail"
              />
              <span v-if="form.email" class="validation-icon" :class="errors.email ? 'error' : 'success'">
                {{ errors.email ? '&#10007;' : '&#10003;' }}
              </span>
            </div>
            <div v-if="errors.email" class="error-message">
              <span class="error-icon">&#9888;</span>
              {{ errors.email }}
            </div>
          </div>

          <!-- 密码 -->
          <div class="form-group">
            <label class="form-label form-label-required">密码</label>
            <div class="input-wrapper">
              <span class="input-icon">&#128274;</span>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                :class="{
                  error: errors.password,
                  success: form.password && !errors.password
                }"
                placeholder="请输入密码"
                @blur="validatePassword"
                @input="checkPasswordStrength"
              />
              <span class="password-toggle" @click="showPassword = !showPassword">
                {{ showPassword ? '&#128065;' : '&#128064;' }}
              </span>
            </div>
            <div v-if="errors.password" class="error-message">
              <span class="error-icon">&#9888;</span>
              {{ errors.password }}
            </div>
            <!-- 密码强度 -->
            <div v-if="form.password" class="password-strength">
              <div class="strength-bar">
                <span class="strength-item" :class="strengthLevel >= 1 ? 'weak' : ''"></span>
                <span class="strength-item" :class="strengthLevel >= 2 ? 'medium' : ''"></span>
                <span class="strength-item" :class="strengthLevel >= 3 ? 'strong' : ''"></span>
              </div>
              <span class="strength-text">密码强度：{{ strengthText }}</span>
            </div>
          </div>

          <!-- 确认密码 -->
          <div class="form-group">
            <label class="form-label form-label-required">确认密码</label>
            <div class="input-wrapper">
              <span class="input-icon">&#128274;</span>
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-input"
                :class="{
                  error: errors.confirmPassword,
                  success: form.confirmPassword && !errors.confirmPassword
                }"
                placeholder="请再次输入密码"
                @blur="validateConfirmPassword"
              />
              <span class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                {{ showConfirmPassword ? '&#128065;' : '&#128064;' }}
              </span>
            </div>
            <div v-if="errors.confirmPassword" class="error-message">
              <span class="error-icon">&#9888;</span>
              {{ errors.confirmPassword }}
            </div>
          </div>

          <!-- 用户协议 -->
          <div class="form-group">
            <label class="checkbox-wrapper">
              <input v-model="form.agree" type="checkbox" class="checkbox-input" />
              <span class="checkbox-label">
                我已阅读并同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a>
              </span>
            </label>
          </div>

          <!-- 成功提示 -->
          <div v-if="successMessage" class="success-message">
            <span class="success-message-icon">&#10003;</span>
            <span class="success-message-text">{{ successMessage }}</span>
          </div>

          <!-- 注册按钮 -->
          <button
            type="submit"
            class="register-button"
            :disabled="!isFormValid || isLoading"
          >
            {{ isLoading ? '注册中...' : '立即注册' }}
          </button>

          <!-- 分隔线 -->
          <div class="divider">
            <span class="divider-line"></span>
            <span class="divider-text">或</span>
            <span class="divider-line"></span>
          </div>

          <!-- 第三方登录 -->
          <div class="social-login">
            <a href="#" class="social-btn github" title="GitHub">G</a>
            <a href="#" class="social-btn weixin" title="微信">W</a>
            <a href="#" class="social-btn qq" title="QQ">Q</a>
          </div>
        </form>

        <!-- 登录链接 -->
        <div class="login-link">
          <p class="login-link-text">
            已有账户？ <router-link to="/">立即登录</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/css/zhuce.css'
import '../assets/css/link.css'

const router = useRouter()

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const strengthLevel = ref(0)
const isLoading = ref(false)
const successMessage = ref('')

const strengthText = computed(() => {
  const texts = ['弱', '中', '强']
  return texts[strengthLevel.value - 1] || ''
})

const isFormValid = computed(() => {
  return (
    form.value.username &&
    form.value.email &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.agree &&
    !errors.value.username &&
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.confirmPassword
  )
})

const validateUsername = () => {
  if (!form.value.username) {
    errors.value.username = '请输入用户名'
  } else if (form.value.username.length < 3) {
    errors.value.username = '用户名至少需要3个字符'
  } else if (form.value.username.length > 20) {
    errors.value.username = '用户名不能超过20个字符'
  } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(form.value.username)) {
    errors.value.username = '用户名只能包含字母、数字、下划线和中文'
  } else {
    errors.value.username = ''
  }
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email) {
    errors.value.email = '请输入邮箱地址'
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = '请输入有效的邮箱地址'
  } else {
    errors.value.email = ''
  }
}

const validatePassword = () => {
  if (!form.value.password) {
    errors.value.password = '请输入密码'
  } else if (form.value.password.length < 6) {
    errors.value.password = '密码至少需要6个字符'
  } else if (form.value.password.length > 20) {
    errors.value.password = '密码不能超过20个字符'
  } else {
    errors.value.password = ''
  }

  if (form.value.confirmPassword) {
    validateConfirmPassword()
  }
}

const validateConfirmPassword = () => {
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = '请再次输入密码'
  } else if (form.value.confirmPassword !== form.value.password) {
    errors.value.confirmPassword = '两次输入的密码不一致'
  } else {
    errors.value.confirmPassword = ''
  }
}

const checkPasswordStrength = () => {
  let level = 0
  const password = form.value.password

  if (password.length >= 6) level++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) level++
  if (/[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) level++

  strengthLevel.value = level
}

const handleSubmit = async () => {
  validateUsername()
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  if (!isFormValid.value) return

  isLoading.value = true

  // 模拟注册请求
  setTimeout(() => {
    isLoading.value = false
    successMessage.value = '注册成功！即将跳转到首页...'

    setTimeout(() => {
      router.push('/')
    }, 2000)
  }, 1500)
}
</script>
