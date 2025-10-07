<template>
  <div 
    ref="animationContainer" 
    class="lottie-animation"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import lottie from 'lottie-web'

interface Props {
  animationData: any
  width?: string
  height?: string
  loop?: boolean
  autoplay?: boolean
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  loop: true,
  autoplay: true,
  speed: 1
})

const animationContainer = ref<HTMLElement>()
let animationInstance: any = null

onMounted(() => {
  if (animationContainer.value && props.animationData) {
    animationInstance = lottie.loadAnimation({
      container: animationContainer.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: props.animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    })

    if (props.speed !== 1) {
      animationInstance.setSpeed(props.speed)
    }
  }
})

onUnmounted(() => {
  if (animationInstance) {
    animationInstance.destroy()
  }
})

watch(() => props.animationData, () => {
  if (animationInstance) {
    animationInstance.destroy()
  }
  
  if (animationContainer.value && props.animationData) {
    animationInstance = lottie.loadAnimation({
      container: animationContainer.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: props.animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    })

    if (props.speed !== 1) {
      animationInstance.setSpeed(props.speed)
    }
  }
})

// متدهای عمومی برای کنترل انیمیشن
const play = () => {
  if (animationInstance) {
    animationInstance.play()
  }
}

const pause = () => {
  if (animationInstance) {
    animationInstance.pause()
  }
}

const stop = () => {
  if (animationInstance) {
    animationInstance.stop()
  }
}

const goToAndStop = (value: number) => {
  if (animationInstance) {
    animationInstance.goToAndStop(value, true)
  }
}

const goToAndPlay = (value: number) => {
  if (animationInstance) {
    animationInstance.goToAndPlay(value, true)
  }
}

// در معرض قرار دادن متدها
defineExpose({
  play,
  pause,
  stop,
  goToAndStop,
  goToAndPlay
})
</script>

<style scoped>
.lottie-animation {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lottie-animation svg {
  max-width: 100%;
  max-height: 100%;
}
</style>
