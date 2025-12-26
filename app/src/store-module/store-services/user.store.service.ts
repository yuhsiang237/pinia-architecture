import { useUserStore } from '../stores/user.store'
import type { User } from '../interfaces/user.interface'
import type { UserStoreType } from '../interfaces/user-store.interface'

export class UserService {
  private userStore: UserStoreType

  constructor(userStore?: UserStoreType) {
    this.userStore = userStore ?? useUserStore()
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

