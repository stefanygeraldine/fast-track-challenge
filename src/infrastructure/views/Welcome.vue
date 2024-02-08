<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Parallax from '@/infrastructure/components/Parallax.vue'
import Banner from '@/infrastructure/assets/images/banner.png'
</script>

<template>
  <Parallax />
  <section class="container banner" :style="{ backgroundImage: `url(${Banner})` }">
    <div class="banner__hero">
      <h1 class="banner__title display__heavy">
        Are You a <br />
        Pokemon Master?
      </h1>
      <RouterLink class="button" to="/sign-in">Prove It</RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner {
  background-size: cover;
  background-position: bottom;
  position: relative;
  height: 120vh;
  &__title {
    text-align: center;
  }
  &__hero {
    z-index: 1;
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
}
</style>
