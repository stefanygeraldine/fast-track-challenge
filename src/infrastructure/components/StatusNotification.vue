<script setup lang="ts">
import { watch, ref } from 'vue'
import ErrorSound from '@/infrastructure/assets/error.mp3'
import SuccessSound from '@/infrastructure/assets/success.mp3'
import type { StepStatus } from '@/domain/models/steps.model'

const props = defineProps<{
  status: StepStatus
}>()

const audio = ref(new Audio())

const playAudio = (src: string) => {
  audio.value.src = src
  audio.value.load() // Asegúrate de cargar el nuevo src
  audio.value.addEventListener(
    'loadeddata',
    () => {
      audio.value.play().catch((error) => console.error('Error al reproducir el sonido:', error))
    },
    { once: true }
  ) // Asegúrate de que el evento se elimine después de usarlo
}

watch(
  () => props.status,
  (newStatus) => {
    switch (newStatus) {
      case 'error':
        playAudio(ErrorSound)
        break
      case 'success':
        playAudio(SuccessSound)
        break
      case 'initial':
        break
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
    :class="{
      'shake-animation': props.status === 'error',
      'success-animation': props.status === 'success'
    }"
  >
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

@keyframes grow {
  0% {
    transform: scale(1); /* Estado inicial: escala normal */
  }
  50% {
    transform: scale(1.1); /* Escala un 10% más grande en la mitad de la animación */
  }
  100% {
    transform: scale(1); /* Vuelve a la escala normal */
  }
}

.shake-animation {
  animation: shake 0.5s ease-in-out forwards;
}
.success-animation {
  animation: grow 1s ease-in-out forwards;
}
</style>
