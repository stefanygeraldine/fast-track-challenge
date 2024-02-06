<script setup lang="ts">
import Loading from '@/infrastructure/components/Loading.vue'
import type { IPokemonFull } from '@/domain/models/pokemon.model'

const props = defineProps<{
  pokemonFull: IPokemonFull | undefined
  isFetchingPokemonFull: boolean
}>()
</script>

<template>
  <template v-if="props.isFetchingPokemonFull">
    <Loading />
  </template>
  <template v-else-if="pokemonFull">
    <img
      :src="props.pokemonFull?.sprites?.other?.dream_world?.front_default"
      alt="front-picture"
      style="width: 18rem"
    />
    <h1>{{ pokemonFull.name }}</h1>
  </template>
</template>

<style scoped></style>
