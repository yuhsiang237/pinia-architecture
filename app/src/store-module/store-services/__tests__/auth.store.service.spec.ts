import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AuthService } from '../auth.store.service'
import type { AuthStoreType } from '../../interfaces/auth-store.interface'

describe('AuthService', () => {
  let mockAuthStore: AuthStoreType
  let authService: AuthService

  beforeEach(() => {
    // Simple mock store that tracks state
    mockAuthStore = {
      token: '',
      roles: [],
      isLoggedIn: false,
      login: vi.fn((token, roles) => {
        mockAuthStore.token = token
        mockAuthStore.roles = roles
        mockAuthStore.isLoggedIn = true
      }),
      logout: vi.fn(() => {
        mockAuthStore.token = ''
        mockAuthStore.roles = []
        mockAuthStore.isLoggedIn = false
      }),
    } as any

    authService = new AuthService(mockAuthStore)
  })

  it('logs in user with token and roles', () => {
    authService.login('my-token', ['admin'])

    expect(mockAuthStore.isLoggedIn).toBe(true)
    expect(mockAuthStore.token).toBe('my-token')
    expect(mockAuthStore.roles).toEqual(['admin'])
  })

  it('logs out user', () => {
    authService.login('my-token', ['admin'])
    authService.logout()

    expect(mockAuthStore.isLoggedIn).toBe(false)
  })

  it('checks if user is authenticated', () => {
    expect(authService.isAuthenticated()).toBe(false)

    mockAuthStore.isLoggedIn = true
    expect(authService.isAuthenticated()).toBe(true)
  })

  it('checks if user has specific role', () => {
    mockAuthStore.roles = ['admin', 'user']

    expect(authService.hasRole('admin')).toBe(true)
    expect(authService.hasRole('guest')).toBe(false)
  })

  it('gets user token and roles', () => {
    mockAuthStore.token = 'my-token'
    mockAuthStore.roles = ['admin']

    expect(authService.getToken()).toBe('my-token')
    expect(authService.getRoles()).toEqual(['admin'])
  })
})
