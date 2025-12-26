import { useAuthStore } from '../stores/auth.store'

export class AuthService {
  // Use getter for lazy initialization to avoid calling before Pinia is initialized
  private get authStore() {
    return useAuthStore()
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

// Export singleton instance
export const authService = new AuthService()
