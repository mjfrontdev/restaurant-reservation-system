import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ReservationData {
  date: string
  time: string
  guests: number
  specialRequests?: string
  tablePreference?: 'window' | 'center' | 'quiet' | 'any'
}

export interface Reservation {
  id: string
  userId: string
  date: string
  time: string
  guests: number
  specialRequests?: string
  tablePreference?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

export const useReservationStore = defineStore('reservation', () => {
  // State
  const currentReservation = ref<ReservationData | null>(null)
  const reservations = ref<Reservation[]>([])
  const isLoading = ref(false)

  // Actions
  function setReservationData(data: Partial<ReservationData>) {
    currentReservation.value = {
      date: '',
      time: '',
      guests: 2,
      ...data
    }
  }

  async function submitReservation(userId: string): Promise<{ success: boolean; reservationId?: string; error?: string }> {
    if (!currentReservation.value) {
      return { success: false, error: 'اطلاعات رزرو موجود نیست' }
    }

    isLoading.value = true
    try {
      // شبیه‌سازی API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // تولید شماره رزرو بهتر
      const reservationNumber = 'RSV-' + Date.now().toString().slice(-6)
      
      const newReservation: Reservation = {
        id: reservationNumber,
        userId,
        ...currentReservation.value,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
      
      reservations.value.push(newReservation)
      // داده‌ها را پاک نکن تا در صفحه success نمایش داده شوند
      // currentReservation.value = null
      
      return { success: true, reservationId: newReservation.id }
    } catch (error) {
      return { success: false, error: 'خطا در ثبت رزرو' }
    } finally {
      isLoading.value = false
    }
  }

  function clearCurrentReservation() {
    currentReservation.value = null
  }

  function cancelReservation(reservationId: string) {
    const reservation = reservations.value.find(r => r.id === reservationId)
    if (reservation) {
      reservation.status = 'cancelled'
    }
  }

  function getReservationsByUser(userId: string) {
    return reservations.value.filter(r => r.userId === userId)
  }

  return {
    // State
    currentReservation,
    reservations,
    isLoading,
    
    // Actions
    setReservationData,
    submitReservation,
    clearCurrentReservation,
    cancelReservation,
    getReservationsByUser
  }
})
