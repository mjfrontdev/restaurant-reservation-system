<template>
  <div class="welcome-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-8 col-lg-6">
          <div class="welcome-card card-custom p-5 text-center" data-aos="zoom-in">
            <!-- Success Animation -->
            <div class="success-animation mb-4">
              <LottieAnimation 
                :animation-data="successAnimation"
                width="150px"
                height="150px"
                :loop="false"
              />
            </div>

            <!-- Welcome Message -->
            <h1 class="welcome-title mb-3">
              خوش آمدید! 🎉
            </h1>
            
            <p class="welcome-subtitle mb-4 text-secondary">
              ثبت نام شما با موفقیت انجام شد. حالا می‌توانید از خدمات رستوران دیجی‌مارک استفاده کنید.
            </p>

            <!-- Steps Info -->
            <div class="steps-info mb-4">
              <h3 class="steps-title mb-3">مراحل رزرو میز</h3>
              <div class="steps-list">
                <div class="step-item" data-aos="fade-up" data-aos-delay="100">
                  <div class="step-icon">📅</div>
                  <div class="step-content">
                    <h4>انتخاب تاریخ و زمان</h4>
                    <p>تاریخ و زمان مورد نظر خود را انتخاب کنید</p>
                  </div>
                </div>
                
                <div class="step-item" data-aos="fade-up" data-aos-delay="200">
                  <div class="step-icon">👥</div>
                  <div class="step-content">
                    <h4>تعداد مهمان و ترجیحات</h4>
                    <p>تعداد مهمان و ترجیحات میز خود را مشخص کنید</p>
                  </div>
                </div>
                
                <div class="step-item" data-aos="fade-up" data-aos-delay="300">
                  <div class="step-icon">✅</div>
                  <div class="step-content">
                    <h4>تایید و ثبت</h4>
                    <p>اطلاعات را بررسی کرده و رزرو خود را تایید کنید</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="welcome-actions">
              <router-link to="/reservation" class="btn btn-brand btn-lg me-3">
                شروع رزرو میز
              </router-link>
              <router-link to="/dashboard" class="btn btn-outline-brand btn-lg">
                پنل کاربری
              </router-link>
            </div>

            <!-- Additional Info -->
            <div class="additional-info mt-4">
              <p class="info-text text-secondary small">
                💡 <strong>نکته:</strong> می‌توانید در هر زمان از پنل کاربری خود، رزروهایتان را مدیریت کنید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LottieAnimation from '../components/LottieAnimation.vue'
import successAnimationData from '../assets/json/Success.json'

const successAnimation = successAnimationData
</script>

<style scoped>
.welcome-page {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--nav-bg) 100%);
  min-height: 100vh;
  padding: 40px 0;
}

.welcome-card {
  border: none;
  box-shadow: 0 20px 40px var(--shadow);
  background-color: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

.success-animation {
  margin-bottom: 30px;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.welcome-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.steps-info {
  background-color: var(--input-bg);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid var(--border-color);
  margin: 30px 0;
}

.steps-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--brand-primary);
  margin-bottom: 25px;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.step-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px var(--shadow);
}

.step-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.step-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.step-content p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
}

.welcome-actions {
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
  background-color: var(--input-bg);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.info-text {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
  
  .steps-list {
    gap: 15px;
  }
  
  .step-item {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .step-icon {
    font-size: 2rem;
  }
  
  .welcome-actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .welcome-actions .btn {
    width: 100%;
  }
}
</style>
