<script setup lang="ts">
import Confetti from '@/infrastructure/assets/images/confettigif.gif'
</script>
<template>
  <div class="confetti" :style="{ backgroundImage: `url(${Confetti})` }"></div>
</template>
<style scoped lang="scss">
.confetti {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
