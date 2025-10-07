import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

// تنظیم Pinia
const pinia = createPinia()
app.use(pinia)

// تنظیم Router
app.use(router)

// راه‌اندازی AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
})

// راه‌اندازی احراز هویت
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
