import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UserService } from '../user.store.service'
import type { UserStoreType } from '../../interfaces/user-store.interface'

describe('UserService', () => {
  let mockUserStore: UserStoreType
  let userService: UserService

  beforeEach(() => {
    // Simple mock store that tracks user profile
    mockUserStore = {
      profile: null,
      setUser: vi.fn((user) => {
        mockUserStore.profile = user
      }),
      clearUser: vi.fn(() => {
        mockUserStore.profile = null
      }),
    } as any

    userService = new UserService(mockUserStore)
  })

  it('sets user profile', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' }

    userService.setUser(user)

    expect(mockUserStore.profile).toEqual(user)
  })

  it('updates user name', () => {
    mockUserStore.profile = { id: '1', name: 'John', email: 'john@example.com' }

    userService.updateUserName('Jane')

    expect(mockUserStore.profile?.name).toBe('Jane')
  })

  it('does not update when no user', () => {
    userService.updateUserName('Jane')

    expect(mockUserStore.setUser).not.toHaveBeenCalled()
  })

  it('updates user email', () => {
    mockUserStore.profile = { id: '1', name: 'John', email: 'john@example.com' }

    userService.updateUserEmail('jane@example.com')

    expect(mockUserStore.profile?.email).toBe('jane@example.com')
  })

  it('clears user profile', () => {
    mockUserStore.profile = { id: '1', name: 'John', email: 'john@example.com' }

    userService.clearUser()

    expect(mockUserStore.profile).toBeNull()
  })

  it('gets current user', () => {
    expect(userService.getCurrentUser()).toBeNull()

    mockUserStore.profile = { id: '1', name: 'John', email: 'john@example.com' }
    expect(userService.getCurrentUser()?.name).toBe('John')
  })
})
