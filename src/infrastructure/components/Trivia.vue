<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IPokemonFull, IPokemon } from '@/domain/models/pokemon.model'

const props = defineProps<{
  pokemonFull: IPokemonFull | undefined
  pokemons: IPokemon[]
}>()

const emit = defineEmits(['fecthPokemon', 'setStepStatus', 'addStep'])

const optionSelected = ref<string>('')
const disabled = ref<boolean>(false)

function selectRandomPokemons(exceptoName: string, quantity: number): IPokemon[] {
  return props.pokemons
    .filter((pokemon) => pokemon.name !== exceptoName)
    .sort(() => 0.5 - Math.random())
    .slice(0, quantity)
}

const options = computed(() => {
  if (props.pokemonFull) {
    const incorrectas = selectRandomPokemons(props.pokemonFull?.name ?? '', 2)
    return [...incorrectas, props.pokemonFull].sort(() => 0.5 - Math.random())
  } else {
    return []
  }
})

function checkAnswer(nameSelected: string) {
  disabled.value = true
  if (props.pokemonFull && nameSelected === props.pokemonFull.name) {
    emit('setStepStatus', 'success')
  } else {
    emit('setStepStatus', 'error')
  }
  const step = { answer: props.pokemonFull?.name, question: nameSelected }

  setTimeout(() => {
    emit('addStep', step)
    emit('setStepStatus', 'initial')
    emit('fecthPokemon')
    disabled.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <form @submit.prevent="checkAnswer(optionSelected)">
      <div v-for="option in options" :key="option.name">
        <label>
          <input
            type="radio"
            :disabled="disabled"
            v-model="optionSelected"
            :value="option.name"
            :id="option.name"
          />
          {{ option.name }}
        </label>
      </div>
      <button type="submit" :disabled="disabled">Enviar Respuesta</button>
    </form>
  </div>
</template>

<style scoped></style>
