import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  phone: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const isLoading = ref(false)
  const isNewUser = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Actions
  async function login(credentials: LoginCredentials) {
    isLoading.value = true
    try {
      // شبیه‌سازی API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // در حالت واقعی، اینجا باید با API ارتباط برقرار کنید
      if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'کاربر تست',
          email: credentials.email,
          phone: '09123456789'
        }
        
        const mockToken = 'mock_jwt_token_' + Date.now()
        
        user.value = mockUser
        token.value = mockToken
        localStorage.setItem('auth_token', mockToken)
        localStorage.setItem('user_data', JSON.stringify(mockUser))
        
        return { success: true }
      } else {
        return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' }
      }
    } catch (error) {
      return { success: false, error: 'خطا در ورود به سیستم' }
    } finally {
      isLoading.value = false
    }
  }

  async function register(data: RegisterData) {
    isLoading.value = true
    try {
      // شبیه‌سازی API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // بررسی رمز عبور
      if (data.password !== data.confirmPassword) {
        return { success: false, error: 'رمز عبور و تکرار آن مطابقت ندارند' }
      }
      
      // شبیه‌سازی ثبت نام موفق
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        phone: data.phone
      }
      
      const mockToken = 'mock_jwt_token_' + Date.now()
      
      user.value = newUser
      token.value = mockToken
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(newUser))
      
      // علامت‌گذاری کاربر جدید
      isNewUser.value = true
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'خطا در ثبت نام' }
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }

  function initializeAuth() {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user_data')
    
    if (savedToken && savedUser) {
      try {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
      } catch (error) {
        // اگر داده‌های ذخیره شده خراب باشند، آنها را پاک کنید
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
      }
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    
    // Getters
    isAuthenticated,
    
    // Actions
    login,
    register,
    logout,
    initializeAuth
  }
})
