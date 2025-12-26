import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../store-module'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/UserDashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Use auth service to check authentication
  const isAuthenticated = authService.isAuthenticated()

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  // Check if route requires guest (not authenticated)
  else if (to.meta.requiresGuest && isAuthenticated) {
    next('/dashboard')
  }
  // Otherwise, proceed
  else {
    next()
  }
})

export default router
