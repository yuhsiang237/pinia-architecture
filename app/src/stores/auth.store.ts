import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    roles: [] as string[],
    isLoggedIn: false,
  }),

  actions: {
    login(token: string, roles: string[]) {
      this.token = token
      this.roles = roles
      this.isLoggedIn = true
    },

    logout() {
      this.token = ''
      this.roles = []
      this.isLoggedIn = false
    },
  },
})