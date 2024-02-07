<script setup lang="ts">
import Loading from '@/infrastructure/components/Loading.vue'
import type { IPokemonFull } from '@/domain/models/pokemon.model'
import PokePower from '@/infrastructure/components/PokePower.vue'
import StatusNotification from '@/infrastructure/components/StatusNotification.vue'
import type { StepStatus } from '@/domain/models/steps.model'
import Vibrant from 'node-vibrant/lib/bundle'

const props = defineProps<{
  pokemonFull: IPokemonFull | undefined
  isFetchingPokemonFull: boolean
  stepStatus: StepStatus
}>()

const getPalette = (): void => {
  const img = props.pokemonFull?.sprites?.other?.dream_world?.front_default
  Vibrant.from(img ?? '')
    .getPalette()
    .then((palette) => {
      document.body.style.background = palette.Vibrant?.hex ?? '#132939'
    })
}
</script>

<template>
  <template v-if="props.isFetchingPokemonFull">
    <Loading />
  </template>
  <div id="showcase container" v-else-if="pokemonFull">
    <StatusNotification :status="stepStatus">
      <img
        class="showcase__image"
        :src="props.pokemonFull?.sprites?.other?.dream_world?.front_default"
        alt="front-picture"
        style="width: 18rem"
        @load="getPalette"
        id="target-image"
      />
    </StatusNotification>
    <div class="container-poke-power">
      <PokePower
        v-for="power in props.pokemonFull?.types"
        v-bind:key="power.type.name"
        :type="power.type.name"
      ></PokePower>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-poke-power {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  overflow-x: auto;
}
.showcase {
  &__image {
    min-height: 300px;
    height: 300px;
  }
}
</style>
