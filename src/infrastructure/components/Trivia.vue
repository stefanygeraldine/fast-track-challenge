<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IPokemonFull, IPokemon } from '@/domain/models/pokemon.model'
import RadioButtons from '@/infrastructure/components/RadioButtons.vue'

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

const handleSelected = (value: string) => {
  optionSelected.value = value
}
</script>

<template>
  <div class="form">
    <h5>Who is that Pokemon?</h5>
    <form @submit.prevent="checkAnswer(optionSelected)">
      <RadioButtons @handle-selected="handleSelected" :options="options" :disabled="disabled" />
      <button class="button" type="submit" :disabled="disabled">Check</button>
    </form>
  </div>
</template>

<style scoped>
.form {
  background-color: #132939;
  padding: 2rem 3rem;
  border-radius: 2rem;
}
</style>
