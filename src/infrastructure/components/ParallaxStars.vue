<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import Background from '@/infrastructure/assets/parallax/stars.svg'

const props = defineProps<{
  startSection: HTMLElement | null
}>()
const sectionHeight = ref('100vh')

const adjustSectionHeight = () => {
  if (props.startSection) {
    sectionHeight.value = `${props.startSection.offsetHeight}px`
  }
}

const parallaxEffect = () => {
  const images = document.querySelectorAll('.effect-up')
  images.forEach((img) => {
    const speed = 0.2
    const movement = -(window.scrollY * speed) + 'px'
    if (img instanceof HTMLElement) {
      img.style.transform = `translateY(${movement})`
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', parallaxEffect)
  window.addEventListener('load', adjustSectionHeight)
  window.addEventListener('resize', adjustSectionHeight)
})

onUnmounted(() => {
  window.removeEventListener('scroll', parallaxEffect)
  window.removeEventListener('load', adjustSectionHeight)
  window.removeEventListener('resize', adjustSectionHeight)
})
</script>

<template>
  <div class="stars" :style="{ height: sectionHeight }">
    <img class="stars__image effect-up" loading="lazy" :src="Background" alt="stars" />
  </div>
</template>

<style scoped lang="scss">
.stars {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 4;
  width: 100%;
  height: 100vh;
  &__image {
    width: 100%;
  }
}
</style>
