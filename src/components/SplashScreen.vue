<template>
  <div class="splash-screen" v-if="isVisible">
    <div class="splash-content">
      <!-- Logo -->
      <div class="logo-container mb-4">
        <div class="logo-icon">🍽️</div>
        <h1 class="logo-text">رستوران دیجی‌مارک</h1>
      </div>
      
      <!-- Loading Animation -->
      <div class="loading-container mb-4">
        <LottieAnimation 
          :animation-data="loadingAnimation"
          width="200px"
          height="200px"
          :loop="true"
        />
      </div>
      
      <!-- Loading Text -->
      <div class="loading-text">
        <h3 class="loading-title">در حال بارگذاری...</h3>
        <p class="loading-subtitle text-secondary">
          آماده کردن بهترین تجربه برای شما
        </p>
      </div>
      
      <!-- Progress Bar -->
      <div class="progress-container mt-4">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="progress-text">{{ Math.round(progress) }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LottieAnimation from '../components/LottieAnimation.vue'
import loadingAnimationData from '../assets/json/loading.json'

const isVisible = ref(true)
const progress = ref(0)
const loadingAnimation = loadingAnimationData

onMounted(() => {
  // شبیه‌سازی بارگذاری
  const interval = setInterval(() => {
    progress.value += Math.random() * 15
    
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval)
      
      // مخفی کردن اسپلش بعد از 500ms
      setTimeout(() => {
        isVisible.value = false
      }, 500)
    }
  }, 200)
})
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--brand-primary) 0%, var(--btn-primary-hover) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: white;
}

.splash-content {
  text-align: center;
  max-width: 500px;
  padding: 40px;
}

.logo-container {
  animation: fadeInDown 1s ease-out;
}

.logo-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: bounce 2s infinite;
}

.logo-text {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.loading-container {
  animation: fadeInUp 1s ease-out 0.5s both;
}

.loading-text {
  animation: fadeInUp 1s ease-out 1s both;
}

.loading-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.loading-subtitle {
  font-size: 1rem;
  opacity: 0.8;
}

.progress-container {
  animation: fadeInUp 1s ease-out 1.5s both;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background-color: white;
  border-radius: 3px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.progress-text {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .logo-icon {
    font-size: 3rem;
  }
  
  .logo-text {
    font-size: 2rem;
  }
  
  .loading-title {
    font-size: 1.3rem;
  }
  
  .splash-content {
    padding: 20px;
  }
}
</style>
