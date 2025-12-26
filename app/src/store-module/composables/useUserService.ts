import { UserService } from '../store-services/user.store.service'

let instance: UserService | undefined

export function useUserService(): UserService {
  if (!instance) {
    instance = new UserService()
  }
  return instance
}
