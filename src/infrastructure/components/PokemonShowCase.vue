<script setup lang="ts">
import Loading from '@/infrastructure/components/Loading.vue'
import type { IPokemonFull } from '@/domain/models/pokemon.model'
import StatusNotification from '@/infrastructure/components/StatusNotification.vue'
import type { StepStatus } from '@/domain/models/steps.model'
import { ref } from 'vue'
import { getPalette } from '@/infrastructure/utilities/vibrant.util'

const props = defineProps<{
  pokemonFull: IPokemonFull | undefined
  isFetchingPokemonFull: boolean
  stepStatus: StepStatus
}>()

const emit = defineEmits(['updateBgColor'])

const lightColor = ref<string>('#132939')
const colorVibrant = ref<string>('#132939')
const setColor = async (): Promise<void> => {
  const img = props.pokemonFull?.sprites?.other?.dream_world?.front_default ?? ''
  const { vibrant, light } = await getPalette(img)
  lightColor.value = light
  colorVibrant.value = vibrant
  emit('updateBgColor', vibrant)
}
</script>

<template>
  <template v-if="props.isFetchingPokemonFull">
    <Loading />
  </template>
  <div id="showcase" class="container" v-else-if="pokemonFull">
    <StatusNotification :status="stepStatus">
      <div
        class="fondo"
        :style="{
          background: `radial-gradient(circle, rgba(255,255,255,0) 20%, ${colorVibrant} 80%,  ${colorVibrant} 100%), linear-gradient(to right, ${lightColor}, ${lightColor})`
        }"
      ></div>
      <img
        class="showcase__image"
        :src="props.pokemonFull?.sprites?.other?.dream_world?.front_default"
        alt="front-picture"
        style="width: 18rem"
        @load="setColor"
        id="target-image"
      />
    </StatusNotification>
  </div>
</template>

<style scoped lang="scss">
.fondo {
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  position: absolute;
  z-index: -1;
}
.showcase {
  &__image {
    min-height: 300px;
    height: 300px;
  }
}
</style>
