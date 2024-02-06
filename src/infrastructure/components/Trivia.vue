<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IPokemonFull, IPokemon } from '@/domain/models/pokemon.model'

const props = defineProps<{
  pokemonFull: IPokemonFull | undefined
  pokemons: IPokemon[]
}>()

const optionSelected = ref('')

function seleccionarPokemonsAleatorios(exceptoNombre: string, cantidad: number): IPokemon[] {
  return props.pokemons
    .filter((pokemon) => pokemon.name !== exceptoNombre)
    .sort(() => 0.5 - Math.random())
    .slice(0, cantidad)
}

const options = computed(() => {
  if (props.pokemonFull) {
    const incorrectas = seleccionarPokemonsAleatorios(props.pokemonFull?.name ?? '', 2)
    return [...incorrectas, props.pokemonFull].sort(() => 0.5 - Math.random())
  } else {
    return []
  }
})

function checkAnswer(nameSelected: string) {
  if (props.pokemonFull && nameSelected === props.pokemonFull.name) {
    alert('¡Right!')
  } else {
    alert('Try again.')
  }
}
</script>

<template>
  <div>
    <h2>Who is that Pokemon?</h2>
    <form @submit.prevent="checkAnswer(optionSelected)">
      <div v-for="option in options" :key="option.name">
        <label>
          <input type="radio" v-model="optionSelected" :value="option.name" :id="option.name" />
          {{ option.name }}
        </label>
      </div>
      <button type="submit">Enviar Respuesta</button>
    </form>
  </div>
</template>

<style scoped></style>
