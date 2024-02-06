<script setup lang="ts">
import { onMounted } from 'vue'
import { usePokemon } from '@/infrastructure/composables/usePokemon.composable'
import Trivia from '@/infrastructure/components/Trivia.vue'
import PokemonShowCase from '@/infrastructure/components/PokemonShowCase.vue'

const { fetchPokemonFull, fetchPokemons, isFetchingPokemonFull, pokemonFull, pokemons } =
  usePokemon()
const randomId = Math.floor(Math.random() * 100) + 1

onMounted(() => {
  fetchPokemons()
  fetchPokemonFull(randomId)
})
</script>

<template>
  <PokemonShowCase :isFetchingPokemonFull="isFetchingPokemonFull" :pokemonFull="pokemonFull" />
  <Trivia :pokemonFull="pokemonFull" :pokemons="pokemons" />
</template>

<style scoped></style>
