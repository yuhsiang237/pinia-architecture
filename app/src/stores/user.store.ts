import { defineStore } from 'pinia'

export interface User {
  id: string
  name: string
  email: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as User | null,
  }),

  actions: {
    setUser(user: User) {
      this.profile = user
    },

    clearUser() {
      this.profile = null
    },
  },
})
