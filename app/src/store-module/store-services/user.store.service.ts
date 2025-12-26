import { useUserStore } from '../stores/user.store'
import type { User } from '../interfaces/user.interface'

export class UserService {
  // Use getter for lazy initialization to avoid calling before Pinia is initialized
  private get userStore() {
    return useUserStore()
  }

  // Set user data
  setUser(user: User) {
    this.userStore.setUser(user)
  }

  // Update user name
  updateUserName(name: string) {
    const currentUser = this.userStore.profile
    if (!currentUser) {
      return
    }

    const updatedUser: User = {
      ...currentUser,
      name,
    }

    this.setUser(updatedUser)
  }

  // Update user email
  updateUserEmail(email: string) {
    const currentUser = this.userStore.profile
    if (!currentUser) {
      return
    }

    const updatedUser: User = {
      ...currentUser,
      email,
    }

    this.setUser(updatedUser)
  }

  // Clear user data
  clearUser() {
    this.userStore.clearUser()
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.userStore.profile
  }
}

// Export singleton instance
export const userService = new UserService()
