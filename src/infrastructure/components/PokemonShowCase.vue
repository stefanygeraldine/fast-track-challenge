<script setup lang="ts">
import Loading from '@/infrastructure/components/Loading.vue'
import type { IPokemonFull } from '@/domain/models/pokemon.model'
import PokePower from '@/infrastructure/components/PokePower.vue'
import StatusNotification from '@/infrastructure/components/StatusNotification.vue'
import type { StepStatus } from '@/domain/models/steps.model'

const props = defineProps<{
  pokemonFull: IPokemonFull | undefined
  isFetchingPokemonFull: boolean
  stepStatus: StepStatus
}>()
</script>

<template>
  <template v-if="props.isFetchingPokemonFull">
    <Loading />
  </template>
  <template v-else-if="pokemonFull">
    <h1>Who is that Pokemon?</h1>
    <StatusNotification :status="stepStatus">
      <img
        :src="props.pokemonFull?.sprites?.other?.dream_world?.front_default"
        alt="front-picture"
        style="width: 18rem"
      />
    </StatusNotification>
    <h1>{{ pokemonFull.name }}</h1>
    <div class="container-poke-power">
      <PokePower
        v-for="power in props.pokemonFull?.types"
        v-bind:key="power.type.name"
        :type="power.type.name"
      ></PokePower>
    </div>
  </template>
</template>

<style scoped>
.container-poke-power {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 68%);
  padding: 10px;
  border-radius: 10px;
  border: solid 3px #4776fa;
  overflow-x: auto;
}
</style>
