// Export all interfaces
export type { User } from './interfaces/user.interface'
export type { AuthStoreType } from './interfaces/auth-store.interface'
export type { UserStoreType } from './interfaces/user-store.interface'

// Export all services
export { AuthService } from './store-services/auth.store.service'
export { UserService } from './store-services/user.store.service'

// Export composables (recommended for singleton pattern)
export { useAuthService } from './composables/useAuthService'
export { useUserService } from './composables/useUserService'


