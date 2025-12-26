import { AuthService } from '../store-services/auth.store.service'

let instance: AuthService | undefined

export function useAuthService(): AuthService {
  if (!instance) {
    instance = new AuthService()
  }
  return instance
}
