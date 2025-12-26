import { defineStore } from 'pinia'
import type { User } from '../interfaces/user.interface'

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
