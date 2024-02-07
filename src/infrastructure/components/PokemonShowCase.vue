<script setup lang="ts">
import Loading from '@/infrastructure/components/Loading.vue'
import type { IPokemonFull } from '@/domain/models/pokemon.model'
import PokePower from '@/infrastructure/components/PokePower.vue'
import ErrorShaker from '@/infrastructure/components/ErrorShaker.vue'

const props = defineProps<{
  pokemonFull: IPokemonFull | undefined
  isFetchingPokemonFull: boolean
  statusError: boolean
}>()
</script>

<template>
  <template v-if="props.isFetchingPokemonFull">
    <Loading />
  </template>
  <template v-else-if="pokemonFull">
    <h1>Who is that Pokemon?</h1>
    <ErrorShaker :active="statusError">
      <img
        :src="props.pokemonFull?.sprites?.other?.dream_world?.front_default"
        alt="front-picture"
        style="width: 18rem"
      />
    </ErrorShaker>
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
  border-color: #4776fa !important;
  border: solid 3px #4776fa;
  overflow-x: auto;
}
</style>
