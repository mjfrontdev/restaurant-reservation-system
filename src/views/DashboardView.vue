<template>
  <div class="dashboard-page">
    <div class="container">
      <!-- Header -->
      <div class="dashboard-header mb-5" data-aos="fade-up">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h1 class="dashboard-title mb-2">
              خوش آمدید، {{ authStore.user?.name }}! 👋
            </h1>
            <p class="dashboard-subtitle text-secondary">
              به پنل کاربری رستوران دیجی‌مارک خوش آمدید
            </p>
          </div>
          <div class="col-md-4 text-end">
            <router-link to="/reservation" class="btn btn-brand btn-lg">
              رزرو میز جدید
            </router-link>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row mb-5">
        <div class="col-md-4 mb-3" data-aos="fade-up" data-aos-delay="100">
          <div class="stat-card card-custom p-4 text-center">
            <div class="stat-icon mb-3">📅</div>
            <h3 class="stat-number text-brand">{{ totalReservations }}</h3>
            <p class="stat-label text-secondary">کل رزروها</p>
          </div>
        </div>
        
        <div class="col-md-4 mb-3" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-card card-custom p-4 text-center">
            <div class="stat-icon mb-3">✅</div>
            <h3 class="stat-number text-success">{{ confirmedReservations }}</h3>
            <p class="stat-label text-secondary">رزروهای تایید شده</p>
          </div>
        </div>
        
        <div class="col-md-4 mb-3" data-aos="fade-up" data-aos-delay="300">
          <div class="stat-card card-custom p-4 text-center">
            <div class="stat-icon mb-3">⏰</div>
            <h3 class="stat-number text-warning">{{ pendingReservations }}</h3>
            <p class="stat-label text-secondary">در انتظار تایید</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="row mb-5">
        <div class="col-12" data-aos="fade-up" data-aos-delay="400">
          <div class="quick-actions card-custom p-4">
            <h3 class="section-title mb-4">دسترسی سریع</h3>
            <div class="row g-3">
              <div class="col-md-3 col-sm-6">
                <router-link to="/reservation" class="quick-action-btn">
                  <div class="action-icon">🍽️</div>
                  <div class="action-text">رزرو میز</div>
                </router-link>
              </div>
              
              <div class="col-md-3 col-sm-6">
                <button class="quick-action-btn" @click="showProfile = true">
                  <div class="action-icon">👤</div>
                  <div class="action-text">پروفایل</div>
                </button>
              </div>
              
              <div class="col-md-3 col-sm-6">
                <button class="quick-action-btn" @click="showHistory = true">
                  <div class="action-icon">📋</div>
                  <div class="action-text">تاریخچه</div>
                </button>
              </div>
              
              <div class="col-md-3 col-sm-6">
                <button class="quick-action-btn" @click="showSettings = true">
                  <div class="action-icon">⚙️</div>
                  <div class="action-text">تنظیمات</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Reservations -->
      <div class="row">
        <div class="col-12" data-aos="fade-up" data-aos-delay="500">
          <div class="recent-reservations card-custom p-4">
            <h3 class="section-title mb-4">رزروهای اخیر</h3>
            
            <div v-if="userReservations.length === 0" class="empty-state text-center py-5">
              <div class="empty-icon mb-3">📝</div>
              <h4 class="empty-title mb-2">هنوز رزروی ندارید</h4>
              <p class="empty-subtitle text-secondary mb-4">
                اولین رزرو خود را انجام دهید
              </p>
              <router-link to="/reservation" class="btn btn-brand">
                رزرو میز
              </router-link>
            </div>
            
            <div v-else class="reservations-list">
              <div 
                v-for="reservation in userReservations.slice(0, 5)" 
                :key="reservation.id"
                class="reservation-item"
              >
                <div class="reservation-info">
                  <div class="reservation-date-card">
                    <PersianDateDisplay 
                      :date="reservation.date" 
                      :time="reservation.time"
                    />
                  </div>
                  <div class="reservation-details">
                    <span class="guests-count">{{ reservation.guests }} نفر</span>
                    <span 
                      class="reservation-status"
                      :class="getStatusClass(reservation.status)"
                    >
                      {{ getStatusText(reservation.status) }}
                    </span>
                  </div>
                </div>
                <div class="reservation-actions">
                  <button 
                    v-if="reservation.status === 'confirmed'"
                    class="btn btn-sm btn-outline-danger"
                    @click="cancelReservation(reservation.id)"
                  >
                    لغو
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Modal -->
    <div v-if="showProfile" class="modal-overlay" @click="showProfile = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h4>پروفایل کاربری</h4>
          <button class="modal-close" @click="showProfile = false">×</button>
        </div>
        <div class="modal-body">
          <div class="profile-info">
            <div class="profile-item">
              <strong>نام:</strong> {{ authStore.user?.name }}
            </div>
            <div class="profile-item">
              <strong>ایمیل:</strong> {{ authStore.user?.email }}
            </div>
            <div class="profile-item">
              <strong>تلفن:</strong> {{ authStore.user?.phone }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- History Modal -->
    <div v-if="showHistory" class="modal-overlay" @click="showHistory = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h4>تاریخچه رزروها</h4>
          <button class="modal-close" @click="showHistory = false">×</button>
        </div>
        <div class="modal-body">
          <div v-if="userReservations.length === 0" class="text-center py-4">
            <p class="text-secondary">هیچ رزروی یافت نشد</p>
          </div>
          <div v-else class="history-list">
            <div 
              v-for="reservation in userReservations" 
              :key="reservation.id"
              class="history-item"
            >
              <div class="history-date">{{ formatDate(reservation.date) }} - {{ reservation.time }}</div>
              <div class="history-details">{{ reservation.guests }} نفر - {{ getStatusText(reservation.status) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Settings Modal -->
    <div v-if="showSettings" class="modal-overlay" @click="showSettings = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h4>تنظیمات</h4>
          <button class="modal-close" @click="showSettings = false">×</button>
        </div>
        <div class="modal-body">
          <div class="settings-options">
            <div class="setting-item">
              <label class="form-label">تم</label>
              <select class="form-select">
                <option value="light">روشن</option>
                <option value="dark">تاریک</option>
              </select>
            </div>
            <div class="setting-item">
              <label class="form-label">زبان</label>
              <select class="form-select">
                <option value="fa">فارسی</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useReservationStore } from '../stores/reservation'
import PersianDateDisplay from '../components/PersianDateDisplay.vue'

const authStore = useAuthStore()
const reservationStore = useReservationStore()

// UI state
const showProfile = ref(false)
const showHistory = ref(false)
const showSettings = ref(false)

// Computed properties
const userReservations = computed(() => {
  if (!authStore.user) return []
  return reservationStore.getReservationsByUser(authStore.user.id)
})

const totalReservations = computed(() => userReservations.value.length)
const confirmedReservations = computed(() => 
  userReservations.value.filter(r => r.status === 'confirmed').length
)
const pendingReservations = computed(() => 
  userReservations.value.filter(r => r.status === 'pending').length
)

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fa-IR')
}

const getStatusText = (status: string) => {
  const statusMap = {
    'pending': 'در انتظار',
    'confirmed': 'تایید شده',
    'cancelled': 'لغو شده'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const getStatusClass = (status: string) => {
  const classMap = {
    'pending': 'text-warning',
    'confirmed': 'text-success',
    'cancelled': 'text-danger'
  }
  return classMap[status as keyof typeof classMap] || ''
}

const cancelReservation = (reservationId: string) => {
  if (confirm('آیا مطمئن هستید که می‌خواهید این رزرو را لغو کنید؟')) {
    reservationStore.cancelReservation(reservationId)
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
.dashboard-page {
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 40px 0;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.dashboard-subtitle {
  font-size: 1.1rem;
}

.stat-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow);
}

.stat-icon {
  font-size: 2.5rem;
  opacity: 0.8;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.quick-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
}

.quick-action-btn:hover {
  background-color: var(--brand-primary);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px var(--shadow);
}

.action-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.action-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.empty-state {
  padding: 60px 20px;
}

.empty-icon {
  font-size: 4rem;
  opacity: 0.5;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.empty-subtitle {
  font-size: 1rem;
}

.reservation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid var(--border-color);
}

.reservation-item:last-child {
  border-bottom: none;
}

.reservation-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.reservation-date-card {
  flex-shrink: 0;
}

.reservation-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.guests-count {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.reservation-status {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--input-bg);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--bg-card);
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h4 {
  margin: 0;
  font-weight: 600;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 20px;
}

.profile-item {
  margin-bottom: 15px;
  font-size: 1rem;
  color: var(--text-primary);
}

.history-item {
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
}

.history-item:last-child {
  border-bottom: none;
}

.history-date {
  font-weight: 600;
  color: var(--text-primary);
}

.history-details {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.setting-item {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .dashboard-title {
    font-size: 2rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .reservation-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .reservation-details {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
  }
}
</style>
