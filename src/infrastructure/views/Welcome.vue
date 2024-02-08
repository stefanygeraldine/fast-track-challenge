<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Parallax from '@/infrastructure/components/Parallax.vue'
import ParallaxStars from '@/infrastructure/components/ParallaxStars.vue'
import Banner from '@/infrastructure/assets/images/banner.png'
import { ref } from 'vue'
import FooterSvg from '@/infrastructure/assets/parallax/footer.svg'
const startSection = ref<HTMLElement | null>(null)
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
    <ParallaxStars :startSection="startSection" />
    <img class="banner__image--footer" :src="FooterSvg" alt="Footer Svg" />
  </section>
</template>

<style scoped lang="scss">
.banner {
  background-size: cover;
  background-position: bottom;
  position: relative;
  height: 100vh;

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
