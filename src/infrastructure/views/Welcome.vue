<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Parallax from '@/infrastructure/components/Parallax.vue'
import ParallaxStars from '@/infrastructure/components/ParallaxStars.vue'
import Banner from '@/infrastructure/assets/images/banner.png'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import FooterSvg from '@/infrastructure/assets/parallax/footer.svg'
const startSection = ref<HTMLElement | null>(null)

const windowWidth = ref(window.innerWidth)
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <Parallax />
  <section
    class="container banner"
    :style="{ backgroundImage: `url(${Banner})` }"
    ref="startSection"
  >
    <div class="banner__hero">
      <h1 class="banner__title display__heavy">
        Are You a <br />
        Pokemon Master?
      </h1>
      <RouterLink class="button" to="/sign-in">Prove It</RouterLink>
    </div>
    <ParallaxStars :startSection="startSection" v-if="windowWidth > 1024" />
    <img class="banner__image--footer" :src="FooterSvg" alt="Footer Svg" />
  </section>
</template>

<style scoped lang="scss">
.banner {
  @include breakpoint($tablet-landscape, 'min') {
    height: 100vh;
  }
  background-size: cover;
  background-position: bottom;
  position: relative;
  height: 60vh;

  &__title {
    text-align: center;
  }
  &__hero {
    z-index: 5;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &:before {
    content: '';
    background: $secondary;
    background: linear-gradient(180deg, rgba(19, 41, 57, 1) 35%, rgba(255, 255, 255, 0) 100%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
  }
  &__image {
    &--footer {
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  }
}
</style>
