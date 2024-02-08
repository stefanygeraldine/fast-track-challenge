<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Background from '@/infrastructure/assets/parallax/background-day.svg'
import Clouds from '@/infrastructure/assets/parallax/clouds.svg'
import Hills from '@/infrastructure/assets/parallax/hill2.svg'
import Light from '@/infrastructure/assets/parallax/light.svg'
import Forrest from '@/infrastructure/assets/parallax/forest.svg'

const parallaxSection = ref<HTMLElement | null>(null)

const adjustSectionHeight = () => {
  const images = document.querySelectorAll('.parallax__image')
  let imageHeight = images[0].getBoundingClientRect().height

  if (parallaxSection.value) {
    parallaxSection.value.style.height = `${imageHeight - 10}px`
  }
}

const parallaxEffect = () => {
  const images = document.querySelectorAll('.effect')
  const speeds = [0.2, 0.4, 0.6, 0.8, 1.0]

  images.forEach((img, index) => {
    const speed = speeds[index]
    const movement = window.scrollY * speed + 'px'
    if (img instanceof HTMLElement) {
      img.style.transform = `translateY(${movement})`
    } else {
      console.error('The img variable is not an HTMLElement')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', parallaxEffect)
  window.addEventListener('load', adjustSectionHeight)
  window.addEventListener('resize', adjustSectionHeight)
  adjustSectionHeight()
})

onUnmounted(() => {
  window.removeEventListener('scroll', parallaxEffect)
  window.removeEventListener('load', adjustSectionHeight)
  window.removeEventListener('resize', adjustSectionHeight)
})
</script>

<template>
  <section class="parallax" ref="parallaxSection">
    <h1 class="parallax__title">Parallax</h1>
    <img class="parallax__image effect" :src="Background" alt="Background" />
    <img class="parallax__image effect" :src="Clouds" alt="Clouds" />
    <img class="parallax__image effect" :src="Light" alt="Light" />
    <img class="parallax__image effect" :src="Hills" alt="Hills" />
    <img class="parallax__image" :src="Forrest" alt="Forrest" />
  </section>
</template>

<style scoped lang="scss">
.parallax {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 4;
  &__title {
    position: absolute;
  }
  &__image {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &__logo {
    z-index: 3;
    width: 37%;
  }
}
</style>
