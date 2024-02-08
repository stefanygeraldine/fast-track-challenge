<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IPokemonFull, IPokemon } from '@/domain/models/pokemon.model'
import RadioButtons from '@/infrastructure/components/RadioButtons.vue'
import PokePower from '@/infrastructure/components/PokePower.vue'

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
  <div class="form container">
    <div class="form__powers">
      <PokePower
        v-for="power in props.pokemonFull?.types"
        v-bind:key="power.type.name"
        :type="power.type.name"
      ></PokePower>
    </div>
    <h4 class="title__heavy">Who is this Pokemon?</h4>
    <p>
      <span class="caption__heavy">Clue:</span>
      <span class="caption__light"> &nbsp; {{ pokemonFull?.name?.slice(0, 3) }}...</span>
    </p>
    <form class="container" @submit.prevent="checkAnswer(optionSelected)">
      <RadioButtons @handle-selected="handleSelected" :options="options" :disabled="disabled" />
      <button class="button" type="submit" :disabled="disabled">Check</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form {
  margin-top: 3rem;
  background-color: $secondary;
  padding: 2rem 3rem;
  border-radius: 2rem;
  &__powers {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 0;
    border-radius: 10px;
    overflow-x: auto;
  }
}
</style>
