<template>
  <button 
    class="theme-toggle-btn"
    @click="toggleTheme"
    :title="isDark ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'"
  >
    <div class="theme-icon">
      {{ isDark ? '☀️' : '🌙' }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const html = document.documentElement
  
  if (isDark.value) {
    html.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.removeAttribute('data-theme')
    localStorage.setItem('theme', 'light')
  }
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'b') {
    event.preventDefault()
    toggleTheme()
  }
}

onMounted(() => {
  // بارگذاری تم ذخیره شده
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
  
  // اضافه کردن event listener برای Ctrl+B
  document.addEventListener('keydown', handleKeyPress)
})

// Cleanup
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
.theme-toggle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: var(--bg-card);
  box-shadow: 0 2px 8px var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px var(--shadow);
}

.theme-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.theme-toggle-btn:hover .theme-icon {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .theme-toggle-btn {
    width: 35px;
    height: 35px;
    margin-left: 5px;
  }
  
  .theme-icon {
    font-size: 1rem;
  }
}
</style>
