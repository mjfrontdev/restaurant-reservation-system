<template>
  <div class="persian-date-display">
    <div class="date-info">
      <div class="day-name">{{ dayName }}</div>
      <div class="date-number">{{ dayNumber }}</div>
      <div class="month-name">{{ monthName }}</div>
      <div class="year">{{ year }}</div>
    </div>
    <div class="time-info" v-if="time">
      <div class="time">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  date: string
  time?: string
}

const props = defineProps<Props>()

// نام‌های روزهای هفته به فارسی
const dayNames = [
  'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 
  'پنج‌شنبه', 'جمعه', 'شنبه'
]

// نام‌های ماه‌های شمسی
const monthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
  'مرداد', 'شهریور', 'مهر', 'آبان',
  'آذر', 'دی', 'بهمن', 'اسفند'
]

// تبدیل تاریخ میلادی به شمسی
const toPersianDate = (date: Date) => {
  const persianDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).formatToParts(date)
  
  return {
    year: persianDate.find(part => part.type === 'year')?.value || '',
    month: persianDate.find(part => part.type === 'month')?.value || '',
    day: persianDate.find(part => part.type === 'day')?.value || '',
    weekday: persianDate.find(part => part.type === 'weekday')?.value || ''
  }
}

// محاسبه تاریخ شمسی
const persianDate = computed(() => {
  if (!props.date) return null
  
  const date = new Date(props.date)
  return toPersianDate(date)
})

// نام روز هفته
const dayName = computed(() => {
  if (!props.date) return ''
  const date = new Date(props.date)
  return dayNames[date.getDay()]
})

// شماره روز
const dayNumber = computed(() => {
  return persianDate.value?.day || ''
})

// نام ماه
const monthName = computed(() => {
  return persianDate.value?.month || ''
})

// سال
const year = computed(() => {
  return persianDate.value?.year || ''
})

// فرمت زمان
const formattedTime = computed(() => {
  if (!props.time) return ''
  
  // تبدیل زمان 24 ساعته به 12 ساعته
  const [hours, minutes] = props.time.split(':')
  const hour24 = parseInt(hours)
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
  const ampm = hour24 >= 12 ? 'بعدازظهر' : 'صبح'
  
  return `${hour12}:${minutes} ${ampm}`
})
</script>

<style scoped>
.persian-date-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, var(--brand-primary), var(--accent-color));
  color: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(192, 57, 43, 0.3);
  min-width: 200px;
}

.date-info {
  margin-bottom: 15px;
}

.day-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: 0.9;
}

.date-number {
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 5px;
}

.month-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 3px;
}

.year {
  font-size: 1rem;
  opacity: 0.8;
}

.time-info {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 15px;
  width: 100%;
}

.time {
  font-size: 1.3rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

@media (max-width: 768px) {
  .persian-date-display {
    min-width: 150px;
    padding: 15px;
  }
  
  .date-number {
    font-size: 2rem;
  }
  
  .day-name {
    font-size: 1rem;
  }
  
  .month-name {
    font-size: 1.1rem;
  }
  
  .time {
    font-size: 1.1rem;
  }
}
</style>
