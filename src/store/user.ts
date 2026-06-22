import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  avatar: string
  title: string
}

interface UserState {
  user: User | null
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    token: null
  }),

  getters: {
    isLoggedIn(): boolean {
      return !!this.user && !!this.token
    },
    userName(): string {
      return this.user?.name || '游客'
    },
    userAvatar(): string {
      return this.user?.avatar || ''
    }
  },

  actions: {
    setUser(user: User) {
      this.user = user
    },

    setToken(token: string) {
      this.token = token
    },

    logout() {
      this.user = null
      this.token = null
    },

    // 模拟登录
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async login(email: string, _password: string) {
      // 模拟API调用
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this.user = {
            id: 1,
            name: '技术博主',
            email: email,
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=200',
            title: '前端开发工程师'
          }
          this.token = 'mock_token_' + Date.now()
          resolve()
        }, 1000)
      })
    },

    // 模拟注册
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async register(username: string, email: string, _password: string) {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this.user = {
            id: Date.now(),
            name: username,
            email: email,
            avatar: '',
            title: '新用户'
          }
          this.token = 'mock_token_' + Date.now()
          resolve()
        }, 1000)
      })
    }
  }
})
