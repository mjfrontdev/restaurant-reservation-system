<template>
  <div class="home-page">
    <!-- Floating Particles Background -->
    <div class="particles-background">
      <div class="particle" v-for="n in 20" :key="n" :style="getParticleStyle(n)"></div>
    </div>
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="hero-content">
              <div class="hero-badge mb-3">
                <span class="badge-text">🍽️ رستوران لوکس</span>
              </div>
              <h1 class="hero-title mb-4">
                به رستوران دیجی‌مارک خوش آمدید
              </h1>
              <p class="hero-subtitle mb-4 text-secondary">
                تجربه‌ای بی‌نظیر از طعم‌های اصیل ایرانی و بین‌المللی در محیطی لوکس و دلنشین
              </p>
              
              <!-- Stats -->
              <div class="hero-stats mb-4">
                <div class="stat-item">
                  <div class="stat-number">500+</div>
                  <div class="stat-label">مشتری راضی</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">غذای متنوع</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">5⭐</div>
                  <div class="stat-label">امتیاز عالی</div>
                </div>
              </div>
              
              <div class="hero-buttons">
                <router-link 
                  to="/reservation" 
                  class="btn btn-brand btn-lg me-3"
                  v-if="authStore.isAuthenticated"
                >
                  رزرو میز
                </router-link>
                <router-link 
                  to="/register" 
                  class="btn btn-outline-brand btn-lg me-3"
                  v-else
                >
                  ثبت نام
                </router-link>
                <router-link 
                  to="/login" 
                  class="btn btn-outline-secondary btn-lg"
                  v-if="!authStore.isAuthenticated"
                >
                  ورود
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left">
            <div class="hero-animation">
              <div class="animation-container">
                <LottieAnimation 
                  :animation-data="foodAnimation"
                  width="100%"
                  height="500px"
                  :loop="true"
                />
              </div>
              
              <!-- Floating Elements -->
              <div class="floating-elements">
                <div class="floating-item item-1">🍕</div>
                <div class="floating-item item-2">🍝</div>
                <div class="floating-item item-3">🥗</div>
                <div class="floating-item item-4">🍰</div>
                <div class="floating-item item-5">☕</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="row text-center mb-5">
          <div class="col-12" data-aos="fade-up">
            <h2 class="section-title mb-3">چرا رستوران دیجی‌مارک؟</h2>
            <p class="section-subtitle text-secondary">
              ما بهترین خدمات را برای شما فراهم می‌کنیم
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-card card-custom h-100 text-center p-4">
              <div class="feature-icon mb-3">
                🍴
              </div>
              <h4 class="feature-title mb-3">غذای باکیفیت</h4>
              <p class="feature-description text-secondary">
                استفاده از بهترین مواد اولیه و دستورپخت‌های اصیل
              </p>
            </div>
          </div>
          
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-card card-custom h-100 text-center p-4">
              <div class="feature-icon mb-3">
                🎯
              </div>
              <h4 class="feature-title mb-3">رزرو آسان</h4>
              <p class="feature-description text-secondary">
                سیستم رزرو آنلاین ساده و سریع برای راحتی شما
              </p>
            </div>
          </div>
          
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-card card-custom h-100 text-center p-4">
              <div class="feature-icon mb-3">
                ⭐
              </div>
              <h4 class="feature-title mb-3">خدمات عالی</h4>
              <p class="feature-description text-secondary">
                تیم حرفه‌ای ما آماده خدمت‌رسانی به شما است
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-5" style="background-color: var(--brand-primary);">
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col-lg-8" data-aos="zoom-in">
            <h2 class="cta-title text-white mb-4">
              آماده تجربه طعم‌های بی‌نظیر هستید؟
            </h2>
            <p class="cta-subtitle text-white mb-4">
              همین حالا میز خود را رزرو کنید و از بهترین لحظات لذت ببرید
            </p>
            <router-link 
              to="/reservation" 
              class="btn btn-light btn-lg"
              v-if="authStore.isAuthenticated"
            >
              رزرو میز
            </router-link>
            <router-link 
              to="/register" 
              class="btn btn-light btn-lg"
              v-else
            >
              شروع کنید
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import LottieAnimation from '../components/LottieAnimation.vue'
import foodAnimationData from '../assets/json/Food.json'
import trailLoadingAnimationData from '../assets/json/Trail loading.json'

const authStore = useAuthStore()

// انیمیشن‌ها
const foodAnimation = foodAnimationData
const trailLoadingAnimation = trailLoadingAnimationData

// متد برای تولید استایل ذرات شناور
const getParticleStyle = (index: number) => {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const animationDelay = Math.random() * 20
  const animationDuration = Math.random() * 10 + 10
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--nav-bg) 100%);
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.hero-badge {
  display: inline-block;
}

.badge-text {
  background: linear-gradient(45deg, var(--brand-primary), var(--accent-color));
  color: white;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(192, 57, 43, 0.3);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1.2;
  background: linear-gradient(45deg, var(--text-primary), var(--brand-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  gap: 30px;
  margin: 30px 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--brand-primary);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.hero-animation {
  position: relative;
  text-align: center;
}

.animation-container {
  position: relative;
  z-index: 2;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-item {
  position: absolute;
  font-size: 2rem;
  animation: floatAround 6s ease-in-out infinite;
}

.item-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.item-2 {
  top: 20%;
  right: 15%;
  animation-delay: 1s;
}

.item-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 2s;
}

.item-4 {
  bottom: 20%;
  right: 10%;
  animation-delay: 3s;
}

.item-5 {
  top: 50%;
  left: 5%;
  animation-delay: 4s;
}

@keyframes floatAround {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0.7;
  }
  25% { 
    transform: translateY(-20px) rotate(5deg); 
    opacity: 1;
  }
  50% { 
    transform: translateY(-10px) rotate(-5deg); 
    opacity: 0.8;
  }
  75% { 
    transform: translateY(-15px) rotate(3deg); 
    opacity: 0.9;
  }
}

.features-section {
  background-color: var(--bg-primary);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.section-subtitle {
  font-size: 1.1rem;
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow);
}

.feature-icon {
  font-size: 3rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.feature-description {
  font-size: 1rem;
  line-height: 1.6;
}

.cta-section {
  background: linear-gradient(135deg, var(--brand-primary) 0%, var(--btn-primary-hover) 100%);
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
}

.cta-subtitle {
  font-size: 1.2rem;
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

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .image-placeholder {
    font-size: 8rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>
