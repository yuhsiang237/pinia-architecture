<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthService, useUserService, type User } from '../store-module'

const router = useRouter()

// Get singleton service instances
const authService = useAuthService()
const userService = useUserService()

// Reading State
const currentUser = computed(() => userService.getCurrentUser())

// Edit form state
const editForm = ref({
  name: '',
  email: '',
})

// Initialize form with current user data
watch(
  currentUser,
  (user) => {
    if (user) {
      editForm.value.name = user.name
      editForm.value.email = user.email
    }
  },
  { immediate: true }
)

// Service Actions
const saveProfile = () => {
  if (currentUser.value) {
    const updatedUser: User = {
      ...currentUser.value,
      name: editForm.value.name,
      email: editForm.value.email,
    }
    userService.setUser(updatedUser)
    alert('Profile updated successfully!')
  }
}

const handleLogout = () => {
  authService.logout()
  userService.clearUser()
  router.push('/login')
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
      <h1>Profile</h1>
      <div class="header-actions">
        <button @click="goToDashboard" class="btn-outline">Dashboard</button>
        <button @click="goToProfile" class="btn-outline">Profile</button>
        <button @click="handleLogout" class="btn-outline">Logout</button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="content">
      <div class="demo-note">
        <strong>Pinia Store Demo:</strong> Update user data and see how store state changes
      </div>

      <!-- Edit Form -->
      <div class="card">
        <h2>✏️ Edit Profile (Store Action)</h2>
        <p class="description">Modify the form below and save to update the user store</p>

        <form @submit.prevent="saveProfile" class="form">
          <div class="form-group">
            <label>User ID (Read Only)</label>
            <input
              :value="currentUser?.id"
              disabled
              class="readonly"
            />
          </div>

          <div class="form-group">
            <label>Name</label>
            <input
              v-model="editForm.name"
              type="text"
              required
              placeholder="Enter name"
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              v-model="editForm.email"
              type="email"
              required
              placeholder="Enter email"
            />
          </div>

          <button type="submit" class="btn-primary">
            Save Changes
          </button>
        </form>
      </div>

      <!-- Current Store State -->
      <div class="card">
        <h2>📊 Current User Store State</h2>
        <div class="data">
          <div class="data-row">
            <span class="label">ID:</span>
            <span class="value">{{ currentUser?.id }}</span>
          </div>
          <div class="data-row">
            <span class="label">Name:</span>
            <span class="value">{{ currentUser?.name }}</span>
          </div>
          <div class="data-row">
            <span class="label">Email:</span>
            <span class="value">{{ currentUser?.email }}</span>
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
  max-width: 800px;
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

.card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
}

.description {
  margin: 0 0 1.5rem;
  color: #666;
  font-size: 0.875rem;
}

.form {
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
}

.form-group input:focus {
  outline: none;
  border-color: #1a73e8;
}

.form-group input.readonly {
  background: #f5f5f5;
  color: #666;
  cursor: not-allowed;
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
}

.btn-primary:hover {
  background: #1557b0;
}

.data {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.data-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
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

  .demo-note {
    font-size: 0.85rem;
    padding: 0.875rem;
  }

  .card {
    padding: 1.25rem;
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

  .card {
    padding: 1.25rem;
    margin-bottom: 1.25rem;
  }

  .card h2 {
    font-size: 1rem;
  }

  .description {
    font-size: 0.8125rem;
  }

  .form-group label {
    font-size: 0.8125rem;
  }

  .form-group input {
    padding: 0.625rem;
    font-size: 16px; /* Prevent zoom on iOS */
  }

  .btn-primary {
    padding: 1rem;
    font-size: 0.9375rem;
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

}
</style>
