<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from '@/infrastructure/assets/images/logo.png'
</script>

<template>
  <header class="header">
    <RouterLink class="link" to="/">
      <img :src="Logo" alt="Logo" class="header__logo" />
    </RouterLink>
    <slot></slot>
  </header>
</template>

<style scoped lang="scss">
.header {
  background: #132939;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  &__logo {
    width: 10rem;
  }
}
</style>
