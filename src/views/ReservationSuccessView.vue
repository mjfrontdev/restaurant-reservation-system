<template>
  <div class="success-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-8 col-lg-6">
          <div class="success-card card-custom p-5 text-center" data-aos="zoom-in">
            <!-- Success Icon -->
            <div class="success-icon mb-4">
              <LottieAnimation 
                :animation-data="successAnimation"
                width="150px"
                height="150px"
                :loop="false"
              />
            </div>

            <!-- Success Message -->
            <h1 class="success-title mb-3">
              رزرو شما با موفقیت ثبت شد!
            </h1>
            
            <p class="success-subtitle mb-4 text-secondary">
              اطلاعات رزرو شما تایید شده و آماده خدمت‌رسانی هستیم
            </p>

            <!-- Persian Date Display -->
            <div class="date-display-container mb-4" v-if="reservationData.date">
              <PersianDateDisplay 
                :date="reservationData.date" 
                :time="reservationData.time"
              />
            </div>
            
            <!-- Fallback if no data -->
            <div v-else class="no-data-message mb-4">
              <p class="text-muted">اطلاعات رزرو در دسترس نیست</p>
            </div>
            
            <!-- Reservation Details -->
            <div class="reservation-summary mb-4">
              <div class="summary-item">
                <span class="summary-label">تعداد مهمان:</span>
                <span class="summary-value">{{ reservationData.guests }} نفر</span>
              </div>
              <div class="summary-item" v-if="reservationData.tablePreference !== 'any'">
                <span class="summary-label">ترجیح میز:</span>
                <span class="summary-value">{{ getTablePreferenceText(reservationData.tablePreference) }}</span>
              </div>
            </div>

            <!-- Confirmation Message -->
            <div class="confirmation-message mb-4">
              <div class="message-box">
                <p class="mb-2">
                  <strong>شماره رزرو شما:</strong> 
                  <span class="reservation-id">{{ reservationId || 'در حال تولید...' }}</span>
                </p>
                <p class="mb-0 text-secondary small">
                  این شماره را برای مراجعه به رستوران همراه داشته باشید
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="success-actions">
              <router-link to="/dashboard" class="btn btn-brand btn-lg me-3">
                پنل کاربری
              </router-link>
              <router-link to="/reservation" class="btn btn-outline-brand btn-lg">
                رزرو جدید
              </router-link>
            </div>

            <!-- Additional Info -->
            <div class="additional-info mt-4">
              <div class="info-box">
                <h6 class="info-title mb-2">نکات مهم:</h6>
                <ul class="info-list text-start">
                  <li>لطفاً ۱۵ دقیقه قبل از زمان رزرو در رستوران حضور داشته باشید</li>
                  <li>در صورت تاخیر بیش از ۳۰ دقیقه، رزرو لغو خواهد شد</li>
                  <li>برای تغییر یا لغو رزرو، از پنل کاربری اقدام کنید</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="contact-info card-custom p-4 mt-4" data-aos="fade-up" data-aos-delay="200">
            <h6 class="text-center mb-3">اطلاعات تماس</h6>
            <div class="row text-center">
              <div class="col-md-4 mb-2">
                <div class="contact-item">
                  <span class="contact-icon">📞</span>
                  <div class="contact-text">
                    <strong>تلفن:</strong><br>
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <div class="contact-item">
                  <span class="contact-icon">📍</span>
                  <div class="contact-text">
                    <strong>آدرس:</strong><br>
                    تهران، خیابان ولیعصر
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <div class="contact-item">
                  <span class="contact-icon">🕒</span>
                  <div class="contact-text">
                    <strong>ساعات کاری:</strong><br>
                    ۱۲:۰۰ - ۲۳:۰۰
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReservationStore } from '../stores/reservation'
import LottieAnimation from '../components/LottieAnimation.vue'
import PersianDateDisplay from '../components/PersianDateDisplay.vue'
import successAnimationData from '../assets/json/Success.json'

const route = useRoute()
const router = useRouter()
const reservationStore = useReservationStore()

// انیمیشن موفقیت
const successAnimation = successAnimationData

// Get reservation ID from route params or store
const reservationId = computed(() => {
  const routeId = route.params.id as string
  if (routeId) return routeId
  
  // اگر از route نیامد، از آخرین رزرو بگیر
  const lastReservation = reservationStore.reservations[reservationStore.reservations.length - 1]
  return lastReservation?.id || 'نامشخص'
})

// Get reservation data from store
const reservationData = computed(() => reservationStore.currentReservation)

// Debug: Check if data exists
onMounted(() => {
  console.log('Reservation data:', reservationData.value)
  console.log('Success animation:', successAnimation)
  console.log('Reservation ID:', reservationId.value)
  console.log('All reservations:', reservationStore.reservations)
})

// Methods
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fa-IR')
}

const getTablePreferenceText = (preference: string) => {
  const preferences = {
    'window': 'کنار پنجره',
    'center': 'وسط رستوران',
    'quiet': 'محیط آرام',
    'any': 'بدون ترجیح'
  }
  return preferences[preference as keyof typeof preferences] || 'بدون ترجیح'
}

onMounted(() => {
  // اگر اطلاعات رزرو موجود نیست، به صفحه اصلی هدایت کن
  if (!reservationData.value) {
    router.push('/')
  }
})
</script>

<style scoped>
.success-page {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--nav-bg) 100%);
  min-height: 100vh;
  padding: 40px 0;
}

.success-card {
  border: none;
  box-shadow: 0 15px 40px var(--shadow);
}

.success-icon {
  margin-bottom: 30px;
}

.success-animation {
  font-size: 5rem;
  animation: bounceIn 1s ease-out;
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

.success-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.success-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
}

.reservation-summary {
  background-color: var(--input-bg);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-weight: 600;
  color: var(--text-primary);
}

.summary-value {
  color: var(--text-secondary);
}

.confirmation-message {
  background-color: var(--success-color);
  color: white;
  padding: 20px;
  border-radius: 12px;
}

.message-box {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
}

.reservation-id {
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 1.1rem;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 4px;
}

.success-actions {
  margin: 30px 0;
}

.btn-outline-brand {
  border: 2px solid var(--brand-primary);
  color: var(--brand-primary);
  background-color: transparent;
}

.btn-outline-brand:hover {
  background-color: var(--brand-primary);
  color: white;
}

.additional-info {
  margin-top: 30px;
}

.info-box {
  background-color: var(--input-bg);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-title {
  color: var(--brand-primary);
  font-weight: 600;
}

.info-list {
  margin: 0;
  padding-right: 20px;
}

.info-list li {
  margin-bottom: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.contact-info {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
}

.contact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.contact-text {
  font-size: 0.9rem;
  color: var(--text-primary);
}

.contact-text strong {
  color: var(--brand-primary);
}

@media (max-width: 768px) {
  .success-title {
    font-size: 2rem;
  }
  
  .success-animation {
    font-size: 4rem;
  }
  
  .success-actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .success-actions .btn {
    width: 100%;
  }
  
  .summary-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .contact-item {
    margin-bottom: 20px;
  }
}
</style>
