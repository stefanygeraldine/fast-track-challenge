<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Parallax from '@/infrastructure/components/Parallax.vue'
</script>

<template>
  <Parallax />
  <section>
    <h1>Are You a Real Pokemon Master</h1>
    <nav>
      <RouterLink to="/sign-in">Prove It</RouterLink>
    </nav>
  </section>
</template>

<style scoped></style>
