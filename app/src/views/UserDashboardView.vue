<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService, userService } from '../store-module'

const router = useRouter()

// Reading State from Services
const currentUser = computed(() => userService.getCurrentUser())
const authToken = computed(() => authService.getToken())
const userRoles = computed(() => authService.getRoles())
const isLoggedIn = computed(() => authService.isAuthenticated())

// Service Actions
const handleLogout = () => {
  authService.logout()
  userService.clearUser()
  router.push('/login')
}

const updateUserName = () => {
  const newName = 'Updated User - ' + Date.now()
  userService.updateUserName(newName)
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const goToProfile = () => {
  router.push('/profile')
}
</script>

<template>
  <div class="container">
    <!-- Simple Header -->
    <header class="header">
      <h1>Dashboard</h1>
      <div class="header-actions">
        <button @click="goToDashboard" class="btn-outline">Dashboard</button>
        <button @click="goToProfile" class="btn-outline">Profile</button>
        <button @click="handleLogout" class="btn-outline">Logout</button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="content">
      <div class="demo-note">
        <strong>Pinia Store Demo:</strong> This page demonstrates reading state from stores and calling actions
      </div>

      <div class="cards">
        <!-- User Store State -->
        <div class="card">
          <h2>👤 User Store (State)</h2>
          <div v-if="currentUser" class="data">
            <div class="data-row">
              <span class="label">ID:</span>
              <span class="value">{{ currentUser.id }}</span>
            </div>
            <div class="data-row">
              <span class="label">Name:</span>
              <span class="value">{{ currentUser.name }}</span>
            </div>
            <div class="data-row">
              <span class="label">Email:</span>
              <span class="value">{{ currentUser.email }}</span>
            </div>
          </div>
          <button @click="updateUserName" class="btn-action">
            Update Name (Action)
          </button>
        </div>

        <!-- Auth Store State -->
        <div class="card">
          <h2>🔐 Auth Store (State)</h2>
          <div class="data">
            <div class="data-row">
              <span class="label">Token:</span>
              <span class="value mono">{{ authToken.substring(0, 20) }}...</span>
            </div>
            <div class="data-row">
              <span class="label">Roles:</span>
              <span class="value">{{ userRoles.join(', ') }}</span>
            </div>
            <div class="data-row">
              <span class="label">Logged In:</span>
              <span class="value">{{ isLoggedIn ? 'Yes' : 'No' }}</span>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-outline {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
}

.btn-outline:hover {
  background: #f5f5f5;
  border-color: #1a73e8;
  color: #1a73e8;
}

.content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 3rem;
  flex: 1;
}

.demo-note {
  background: #e3f2fd;
  border-left: 4px solid #1a73e8;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 4px;
  color: #0d47a1;
  font-size: 0.9rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
}

.card h2 {
  margin: 0 0 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
}

.data {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.data-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.data-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #666;
  font-size: 0.875rem;
}

.value {
  color: #333;
  font-size: 0.875rem;
}

.value.mono {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

.btn-action {
  width: 100%;
  padding: 0.75rem;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
}

.btn-action:hover {
  background: #1557b0;
}

/* Tablet */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    padding: 1.25rem 1.5rem;
  }

  .content {
    padding: 1.5rem;
  }

  .cards {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .demo-note {
    font-size: 0.85rem;
    padding: 0.875rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .header {
    padding: 1rem;
  }

  .header h1 {
    font-size: 1.25rem;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .btn-outline {
    flex: 1;
    font-size: 0.8125rem;
    padding: 0.625rem 0.875rem;
  }

  .content {
    padding: 1rem;
  }

  .demo-note {
    font-size: 0.8rem;
    padding: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .cards {
    gap: 1rem;
  }

  .card {
    padding: 1.25rem;
  }

  .card h2 {
    font-size: 1rem;
  }

  .data-row {
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }

  .label,
  .value {
    font-size: 0.8125rem;
  }

  .btn-action {
    padding: 0.875rem;
    font-size: 0.8125rem;
  }

}
</style>
