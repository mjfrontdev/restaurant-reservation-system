<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <!-- Animation Side -->
        <div class="col-lg-6 d-none d-lg-block" data-aos="fade-right">
          <div class="animation-container text-center">
            <LottieAnimation 
              :animation-data="loginAnimation"
              width="500px"
              height="500px"
              :loop="true"
              :speed="0.5"
            />
            <h3 class="animation-title mt-4">به رستوران دیجی‌مارک خوش آمدید</h3>
            <p class="animation-subtitle text-secondary">
              تجربه‌ای بی‌نظیر از طعم‌های اصیل
            </p>
          </div>
        </div>
        
        <!-- Form Side -->
        <div class="col-lg-6 col-md-8" data-aos="fade-left">
          <div class="login-card card-custom p-5">
            <div class="text-center mb-4">
              <div class="login-icon mb-3">
                🔐
              </div>
              <h2 class="login-title mb-2">ورود به حساب کاربری</h2>
              <p class="login-subtitle text-secondary">
                برای ادامه، وارد حساب کاربری خود شوید
              </p>
            </div>

            <form @submit.prevent="handleLogin" class="login-form">
              <div class="mb-3">
                <label for="email" class="form-label">ایمیل</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  class="form-control input-custom"
                  placeholder="ایمیل خود را وارد کنید"
                  required
                  :disabled="isLoading"
                />
              </div>

              <div class="mb-4">
                <label for="password" class="form-label">رمز عبور</label>
                <div class="password-input">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="form.password"
                    class="form-control input-custom"
                    placeholder="رمز عبور خود را وارد کنید"
                    required
                    :disabled="isLoading"
                  />
                  <button
                    type="button"
                    class="password-toggle"
                    @click="togglePassword"
                    :disabled="isLoading"
                  >
                    {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                  </button>
                </div>
              </div>

              <div class="mb-4">
                <div class="form-check">
                  <input
                    type="checkbox"
                    id="remember"
                    v-model="form.remember"
                    class="form-check-input"
                    :disabled="isLoading"
                  />
                  <label for="remember" class="form-check-label">
                    مرا به خاطر بسپار
                  </label>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-brand w-100 mb-3"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                {{ isLoading ? 'در حال ورود...' : 'ورود' }}
              </button>

              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>

              <div class="text-center">
                <p class="mb-0 text-secondary">
                  حساب کاربری ندارید؟
                  <router-link to="/register" class="text-brand text-decoration-none">
                    ثبت نام کنید
                  </router-link>
                </p>
              </div>
            </form>
          </div>

          <!-- Demo Credentials -->
          <div class="demo-info card-custom p-3 mt-3" data-aos="fade-up" data-aos-delay="200">
            <h6 class="text-center mb-2">اطلاعات تست</h6>
            <p class="mb-1 text-secondary small">
              <strong>ایمیل:</strong> test@example.com
            </p>
            <p class="mb-0 text-secondary small">
              <strong>رمز عبور:</strong> password
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import type { LoginCredentials } from '../../stores/auth'
import LottieAnimation from '../../components/LottieAnimation.vue'
import loginAnimationData from '../../assets/json/Login.json'

const router = useRouter()
const authStore = useAuthStore()

// انیمیشن لاگین
const loginAnimation = loginAnimationData

// Form data
const form = reactive<LoginCredentials & { remember: boolean }>({
  email: '',
  password: '',
  remember: false
})

// UI state
const isLoading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  if (!form.email || !form.password) {
    errorMessage.value = 'لطفاً تمام فیلدها را پر کنید'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.login({
      email: form.email,
      password: form.password
    })

    if (result.success) {
      // هدایت به صفحه خوش‌آمدگویی
      router.push('/welcome')
    } else {
      errorMessage.value = result.error || 'خطا در ورود به سیستم'
    }
  } catch (error) {
    errorMessage.value = 'خطا در ارتباط با سرور'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--nav-bg) 100%);
  min-height: 100vh;
  padding: 40px 0;
}

.animation-container {
  padding: 40px 20px;
}

.animation-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.animation-subtitle {
  font-size: 1.1rem;
  margin-top: 10px;
}

.login-card {
  border: none;
  box-shadow: 0 20px 40px var(--shadow);
  background-color: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

.login-icon {
  font-size: 3rem;
  opacity: 0.8;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.login-subtitle {
  font-size: 1rem;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-control {
  padding-left: 45px;
}

.demo-info {
  background-color: var(--input-bg);
  border: 1px dashed var(--border-color);
}

.demo-info h6 {
  color: var(--brand-primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  .login-title {
    font-size: 1.5rem;
  }
  
  .login-icon {
    font-size: 2rem;
  }
}
</style>
