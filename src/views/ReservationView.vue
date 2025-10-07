<template>
  <div class="reservation-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Header -->
          <div class="text-center mb-5" data-aos="fade-up">
            <h1 class="page-title mb-3">رزرو میز</h1>
            <p class="page-subtitle text-secondary">
              میز خود را در رستوران دیجی‌مارک رزرو کنید
            </p>
          </div>

          <!-- Progress Steps -->
          <div class="steps-container mb-5" data-aos="fade-up" data-aos-delay="100">
            <div class="steps">
              <div 
                v-for="(step, index) in steps" 
                :key="index"
                class="step"
                :class="{ 
                  'active': currentStep === index + 1,
                  'completed': currentStep > index + 1
                }"
              >
                <div class="step-circle">
                  <span v-if="currentStep > index + 1">✓</span>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div class="step-label">{{ step }}</div>
              </div>
            </div>
          </div>

          <!-- Step Content -->
          <div class="step-content" data-aos="fade-up" data-aos-delay="200">
            <!-- Step 1: Date & Time -->
            <div v-if="currentStep === 1" class="step-panel card-custom p-4">
              <h3 class="step-title mb-4">انتخاب تاریخ و زمان</h3>
              
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="date" class="form-label">تاریخ</label>
                  <input
                    type="date"
                    id="date"
                    v-model="reservationData.date"
                    class="form-control input-custom"
                    :min="minDate"
                    required
                    @change="onDateChange"
                  />
                  <div v-if="reservationData.date" class="persian-date-display mt-2">
                    <small class="text-muted">
                      تاریخ شمسی: {{ formatDate(reservationData.date) }}
                    </small>
                  </div>
                </div>
                
                <div class="col-md-6 mb-3">
                  <label for="time" class="form-label">زمان</label>
                  <select
                    id="time"
                    v-model="reservationData.time"
                    class="form-select input-custom"
                    required
                  >
                    <option value="">زمان را انتخاب کنید</option>
                    <option v-for="time in availableTimes" :key="time" :value="time">
                      {{ time }}
                    </option>
                  </select>
                </div>
              </div>
              
              <div class="step-actions">
                <button 
                  @click="nextStep" 
                  class="btn btn-brand"
                  :disabled="!reservationData.date || !reservationData.time"
                >
                  مرحله بعد
                </button>
              </div>
            </div>

            <!-- Step 2: Guests & Preferences -->
            <div v-if="currentStep === 2" class="step-panel card-custom p-4">
              <h3 class="step-title mb-4">تعداد مهمان و ترجیحات</h3>
              
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="guests" class="form-label">تعداد مهمان</label>
                  <select
                    id="guests"
                    v-model="reservationData.guests"
                    class="form-select input-custom"
                    required
                  >
                    <option value="">تعداد مهمان را انتخاب کنید</option>
                    <option v-for="num in guestNumbers" :key="num" :value="num">
                      {{ num }} نفر
                    </option>
                  </select>
                </div>
                
                <div class="col-md-6 mb-3">
                  <label for="tablePreference" class="form-label">ترجیح میز</label>
                  <select
                    id="tablePreference"
                    v-model="reservationData.tablePreference"
                    class="form-select input-custom"
                  >
                    <option value="any">بدون ترجیح</option>
                    <option value="window">کنار پنجره</option>
                    <option value="center">وسط رستوران</option>
                    <option value="quiet">محیط آرام</option>
                  </select>
                </div>
              </div>
              
              <div class="mb-3">
                <label for="specialRequests" class="form-label">درخواست‌های ویژه (اختیاری)</label>
                <textarea
                  id="specialRequests"
                  v-model="reservationData.specialRequests"
                  class="form-control input-custom"
                  rows="3"
                  placeholder="درخواست‌های خاص خود را اینجا بنویسید..."
                ></textarea>
              </div>
              
              <div class="step-actions">
                <button @click="prevStep" class="btn btn-outline-secondary me-3">
                  مرحله قبل
                </button>
                <button 
                  @click="nextStep" 
                  class="btn btn-brand"
                  :disabled="!reservationData.guests"
                >
                  مرحله بعد
                </button>
              </div>
            </div>

            <!-- Step 3: Confirmation -->
            <div v-if="currentStep === 3" class="step-panel card-custom p-4">
              <h3 class="step-title mb-4">تایید اطلاعات</h3>
              
              <!-- Persian Date Display -->
              <div class="date-display-container mb-4">
                <PersianDateDisplay 
                  :date="reservationData.date" 
                  :time="reservationData.time"
                />
              </div>
              
              <div class="confirmation-details">
                <div class="detail-item mb-3">
                  <strong>تعداد مهمان:</strong> {{ reservationData.guests }} نفر
                </div>
                <div class="detail-item mb-3" v-if="reservationData.tablePreference !== 'any'">
                  <strong>ترجیح میز:</strong> {{ getTablePreferenceText(reservationData.tablePreference) }}
                </div>
                <div class="detail-item mb-3" v-if="reservationData.specialRequests">
                  <strong>درخواست‌های ویژه:</strong> {{ reservationData.specialRequests }}
                </div>
              </div>
              
              <div class="step-actions">
                <button @click="prevStep" class="btn btn-outline-secondary me-3">
                  مرحله قبل
                </button>
                <button 
                  @click="submitReservation" 
                  class="btn btn-brand"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isSubmitting ? 'در حال ثبت...' : 'تایید و ثبت رزرو' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useReservationStore } from '../stores/reservation'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import PersianDateDisplay from '../components/PersianDateDisplay.vue'
import moment from 'moment-jalaali'

const router = useRouter()
const authStore = useAuthStore()
const reservationStore = useReservationStore()

// Steps configuration
const steps = ['تاریخ و زمان', 'مهمان و ترجیحات', 'تایید']

// State
const currentStep = ref(1)
const isSubmitting = ref(false)

// Reservation data
const reservationData = reactive({
  date: '',
  time: '',
  guests: 2,
  tablePreference: 'any' as 'window' | 'center' | 'quiet' | 'any',
  specialRequests: ''
})

// Computed properties
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const availableTimes = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
]

const guestNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Methods
const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return moment(dateString).format('jYYYY/jMM/jDD')
}

// Convert Persian date to Gregorian for form submission
const convertToGregorian = (persianDate: string) => {
  return moment(persianDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
}

// Handle date change
const onDateChange = () => {
  // تاریخ انتخاب شده در فرم به صورت میلادی است
  // ما آن را به شمسی تبدیل می‌کنیم برای نمایش
  console.log('تاریخ انتخاب شده:', reservationData.date)
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

const submitReservation = async () => {
  if (!authStore.user) {
    router.push('/login')
    return
  }

  isSubmitting.value = true

  try {
    // تبدیل تاریخ شمسی به میلادی برای ذخیره
    const gregorianDate = convertToGregorian(reservationData.date)
    
    // ذخیره اطلاعات رزرو در store
    reservationStore.setReservationData({
      ...reservationData,
      date: gregorianDate
    })
    
    // ارسال درخواست رزرو
    const result = await reservationStore.submitReservation(authStore.user.id)
    
    if (result.success) {
      // هدایت به صفحه موفقیت
      router.push({
        name: 'reservation-success',
        params: { id: result.reservationId }
      })
    } else {
      alert(result.error || 'خطا در ثبت رزرو')
    }
  } catch (error) {
    alert('خطا در ارتباط با سرور')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // بررسی احراز هویت
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
</script>

<style scoped>
.reservation-page {
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 40px 0;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.page-subtitle {
  font-size: 1.1rem;
}

.steps-container {
  margin: 40px 0;
}

.steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.steps::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--border-color);
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  background-color: var(--bg-primary);
  padding: 0 20px;
}

.step-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--border-color);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.step.active .step-circle {
  background-color: var(--brand-primary);
  color: white;
}

.step.completed .step-circle {
  background-color: var(--success-color);
  color: white;
}

.step-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
  font-weight: 500;
}

.step.active .step-label {
  color: var(--brand-primary);
  font-weight: 600;
}

.step.completed .step-label {
  color: var(--success-color);
  font-weight: 600;
}

.step-panel {
  border: none;
  box-shadow: 0 5px 20px var(--shadow);
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.step-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.confirmation-details {
  background-color: var(--input-bg);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.detail-item {
  font-size: 1rem;
  color: var(--text-primary);
}

.persian-date-display {
  background-color: var(--input-bg);
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.persian-date-display small {
  color: var(--text-primary) !important;
  font-weight: 600;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .steps {
    flex-direction: column;
    gap: 20px;
  }
  
  .steps::before {
    display: none;
  }
  
  .step-circle {
    width: 40px;
    height: 40px;
  }
  
  .step-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .step-actions .btn {
    width: 100%;
  }
}
</style>
