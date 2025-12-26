import { useAuthStore } from '../stores/auth.store'
import type { AuthStoreType } from '../interfaces/auth-store.interface'

export class AuthService {
  private authStore: AuthStoreType

  constructor(authStore?: AuthStoreType) {
    this.authStore = authStore ?? useAuthStore()
  }

  // Login
  login(token: string, roles: string[]) {
    this.authStore.login(token, roles)
  }

  // Logout
  logout() {
    this.authStore.logout()
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.authStore.isLoggedIn
  }

  // Check if user has a specific role
  hasRole(role: string): boolean {
    return this.authStore.roles.includes(role)
  }

  // Get current token
  getToken(): string {
    return this.authStore.token
  }

  // Get current roles
  getRoles(): string[] {
    return this.authStore.roles
  }
}

