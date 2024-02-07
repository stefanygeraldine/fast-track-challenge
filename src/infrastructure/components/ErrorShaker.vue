<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import ErrorSound from '@/infrastructure/assets/error.mp3'

const props = defineProps<{
  active: boolean
}>()

//const isActive = computed(() => props.active)
const isActive = ref(props.active)
// Crear una instancia de Audio
const audio = ref(new Audio(ErrorSound))

watch(
  () => props.active,
  (newValue) => {
    if (newValue) {
      audio.value.play().catch((error) => console.error('Error al reproducir el sonido:', error))
      isActive.value = true
    } else {
      isActive.value = false
    }
  },
  { immediate: true }
)
</script>

<template>
  <div :class="{ 'shake-animation': isActive }">
    <slot></slot>
  </div>
</template>
<style scoped>
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.shake-animation {
  animation: shake 0.5s ease-in-out forwards;
}
</style>
