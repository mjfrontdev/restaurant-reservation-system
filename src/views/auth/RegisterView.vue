<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <!-- Animation Side -->
        <div class="col-lg-6 d-none d-lg-block" data-aos="fade-right">
          <div class="animation-container text-center">
            <LottieAnimation 
              :animation-data="signupAnimation"
              width="500px"
              height="500px"
              :loop="true"
              :speed="0.3"
            />
            <h3 class="animation-title mt-4">ثبت نام در رستوران دیجی‌مارک</h3>
            <p class="animation-subtitle text-secondary">
              عضو خانواده ما شوید و از مزایای ویژه بهره‌مند شوید
            </p>
          </div>
        </div>
        
        <!-- Form Side -->
        <div class="col-lg-6 col-md-10" data-aos="fade-left">
          <div class="register-card card-custom p-5">
            <div class="text-center mb-4">
              <div class="register-icon mb-3">
                ✨
              </div>
              <h2 class="register-title mb-2">ایجاد حساب کاربری</h2>
              <p class="register-subtitle text-secondary">
                برای شروع، اطلاعات خود را وارد کنید
              </p>
            </div>

            <form @submit.prevent="handleRegister" class="register-form">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    class="form-control input-custom"
                    placeholder="نام کامل خود را وارد کنید"
                    required
                    :disabled="isLoading"
                  />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="phone" class="form-label">شماره تلفن</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="form.phone"
                    class="form-control input-custom"
                    placeholder="شماره تلفن خود را وارد کنید"
                    required
                    :disabled="isLoading"
                  />
                </div>
              </div>

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

              <div class="row">
                <div class="col-md-6 mb-3">
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

                <div class="col-md-6 mb-3">
                  <label for="confirmPassword" class="form-label">تکرار رمز عبور</label>
                  <div class="password-input">
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      id="confirmPassword"
                      v-model="form.confirmPassword"
                      class="form-control input-custom"
                      placeholder="رمز عبور را مجدداً وارد کنید"
                      required
                      :disabled="isLoading"
                    />
                    <button
                      type="button"
                      class="password-toggle"
                      @click="toggleConfirmPassword"
                      :disabled="isLoading"
                    >
                      {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <div class="form-check">
                  <input
                    type="checkbox"
                    id="terms"
                    v-model="form.acceptTerms"
                    class="form-check-input"
                    required
                    :disabled="isLoading"
                  />
                  <label for="terms" class="form-check-label">
                    با 
                    <a href="#" class="text-brand">قوانین و مقررات</a>
                    موافقم
                  </label>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-brand w-100 mb-3"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                {{ isLoading ? 'در حال ثبت نام...' : 'ثبت نام' }}
              </button>

              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>

              <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
              </div>

              <div class="text-center">
                <p class="mb-0 text-secondary">
                  قبلاً حساب کاربری دارید؟
                  <router-link to="/login" class="text-brand text-decoration-none">
                    وارد شوید
                  </router-link>
                </p>
              </div>
            </form>
          </div>

          <!-- Registration Steps Info -->
          <div class="steps-info card-custom p-3 mt-3" data-aos="fade-up" data-aos-delay="200">
            <h6 class="text-center mb-3 text-brand">مراحل بعد از ثبت نام</h6>
            <div class="steps-list">
              <div class="step-item d-flex align-items-center mb-2">
                <span class="step-number me-2">1️⃣</span>
                <span class="step-text small">تایید ایمیل</span>
              </div>
              <div class="step-item d-flex align-items-center mb-2">
                <span class="step-number me-2">2️⃣</span>
                <span class="step-text small">رزرو میز</span>
              </div>
              <div class="step-item d-flex align-items-center">
                <span class="step-number me-2">3️⃣</span>
                <span class="step-text small">پنل کاربری</span>
              </div>
            </div>
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
import type { RegisterData } from '../../stores/auth'
import LottieAnimation from '../../components/LottieAnimation.vue'
import signupAnimationData from '../../assets/json/Sign up.json'

const router = useRouter()
const authStore = useAuthStore()

// انیمیشن ثبت نام
const signupAnimation = signupAnimationData

// Form data
const form = reactive<RegisterData & { acceptTerms: boolean }>({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

// UI state
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const validateForm = () => {
  if (!form.name.trim()) {
    errorMessage.value = 'لطفاً نام خود را وارد کنید'
    return false
  }

  if (!form.email.trim()) {
    errorMessage.value = 'لطفاً ایمیل خود را وارد کنید'
    return false
  }

  if (!form.phone.trim()) {
    errorMessage.value = 'لطفاً شماره تلفن خود را وارد کنید'
    return false
  }

  if (form.password.length < 6) {
    errorMessage.value = 'رمز عبور باید حداقل ۶ کاراکتر باشد'
    return false
  }

  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'رمز عبور و تکرار آن مطابقت ندارند'
    return false
  }

  if (!form.acceptTerms) {
    errorMessage.value = 'لطفاً با قوانین و مقررات موافقت کنید'
    return false
  }

  return true
}

const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const result = await authStore.register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      confirmPassword: form.confirmPassword
    })

    if (result.success) {
      successMessage.value = 'ثبت نام با موفقیت انجام شد! در حال هدایت...'
      
      // هدایت به صفحه خوش‌آمدگویی بعد از 2 ثانیه
      setTimeout(() => {
        router.push('/welcome')
      }, 2000)
    } else {
      errorMessage.value = result.error || 'خطا در ثبت نام'
    }
  } catch (error) {
    errorMessage.value = 'خطا در ارتباط با سرور'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-page {
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

.register-card {
  border: none;
  box-shadow: 0 20px 40px var(--shadow);
  background-color: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

.register-icon {
  font-size: 3rem;
  opacity: 0.8;
  animation: sparkle 2s infinite;
}

@keyframes sparkle {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(5deg); }
  75% { transform: scale(1.1) rotate(-5deg); }
}

.register-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.register-subtitle {
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

.steps-info {
  background-color: var(--input-bg);
  border: 1px dashed var(--border-color);
}

.steps-info h6 {
  font-weight: 600;
}

.step-item {
  padding: 5px 0;
}

.step-number {
  font-size: 1.2rem;
}

.step-text {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .register-title {
    font-size: 1.5rem;
  }
  
  .register-icon {
    font-size: 2rem;
  }
  
  .password-input .form-control {
    padding-left: 40px;
  }
}
</style>
