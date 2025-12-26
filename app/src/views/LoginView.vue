<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useUserStore, type User } from '../stores/user.store'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

// Login form data
const loginForm = ref({
  email: 'demo@example.com',
  password: 'password123',
})

// Login handler - Demo Pinia Actions
const handleLogin = () => {
  // Set auth store state
  const mockToken = 'mock-jwt-token-' + Date.now()
  const mockRoles = ['user', 'admin']
  authStore.login(mockToken, mockRoles)

  // Set user store state
  const mockUser: User = {
    id: '1',
    name: 'Demo User',
    email: loginForm.value.email,
  }
  userStore.setUser(mockUser)

  router.push('/dashboard')
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Pinia Store Demo</h1>
      <p class="subtitle">Login to see store in action</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="loginForm.email"
            type="email"
            required
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            v-model="loginForm.password"
            type="password"
            required
          />
        </div>
        <button type="submit" class="btn-primary">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow: auto;
}

.login-card {
  background: white;
  padding: 3rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

h1 {
  color: #333;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  text-align: center;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 2rem;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #1a73e8;
}

.btn-primary {
  padding: 0.875rem;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;
  width: 100%;
  touch-action: manipulation;
}

.btn-primary:hover {
  background: #1557b0;
}

.btn-primary:active {
  transform: scale(0.98);
}

/* Tablet */
@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }

  .login-card {
    padding: 2rem;
    max-width: 100%;
  }

  h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.85rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .login-container {
    padding: 0.5rem;
  }

  .login-card {
    padding: 1.5rem;
    border-radius: 4px;
  }

  h1 {
    font-size: 1.25rem;
  }

  .form-group input {
    font-size: 16px; /* Prevent zoom on iOS */
  }

  .btn-primary {
    padding: 1rem;
  }
}
</style>
