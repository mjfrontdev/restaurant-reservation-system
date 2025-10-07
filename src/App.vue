<template>
  <div id="app">
    <!-- Splash Screen -->
    <SplashScreen />
    
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: var(--nav-bg);">
      <div class="container">
        <router-link to="/" class="navbar-brand text-brand fw-bold">
          🍽️ رستوران دیجی‌مارک
        </router-link>
        
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">خانه</router-link>
            </li>
            <li class="nav-item" v-if="authStore.isAuthenticated">
              <router-link to="/reservation" class="nav-link">رزرو میز</router-link>
            </li>
            <li class="nav-item" v-if="authStore.isAuthenticated">
              <router-link to="/dashboard" class="nav-link">پنل کاربری</router-link>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            <li class="nav-item">
              <ThemeToggle />
            </li>
            <li class="nav-item" v-if="!authStore.isAuthenticated">
              <router-link to="/login" class="nav-link">ورود</router-link>
            </li>
            <li class="nav-item" v-if="!authStore.isAuthenticated">
              <router-link to="/register" class="nav-link">ثبت نام</router-link>
            </li>
            <li class="nav-item dropdown" v-if="authStore.isAuthenticated">
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                {{ authStore.user?.name }}
              </a>
              <ul class="dropdown-menu">
                <li>
                  <button class="dropdown-item" @click="logout">
                    خروج
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer mt-5 py-4" style="background-color: var(--nav-bg);">
      <div class="container text-center">
        <p class="mb-0 text-secondary">
          © ۱۴۰۳ رستوران دیجی‌مارک - تمامی حقوق محفوظ است
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.main-content {
  min-height: calc(100vh - 200px);
}

.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  color: var(--text-primary) !important;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--brand-primary) !important;
}

.nav-link.router-link-active {
  color: var(--brand-primary) !important;
  font-weight: 600;
}

.footer {
  border-top: 1px solid var(--border-color);
}
</style>
