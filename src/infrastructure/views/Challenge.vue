<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { usePokemon } from '@/infrastructure/composables/usePokemon.composable'
import Trivia from '@/infrastructure/components/Trivia.vue'
import PokemonShowCase from '@/infrastructure/components/PokemonShowCase.vue'
import Summary from '@/infrastructure/components/Summary.vue'
import type { IStep } from '@/domain/models/steps.model'
import { useUsers } from '@/infrastructure/composables/useUser.composable'
import { useUserStore } from '@/infrastructure/stores/user'
import type { IUser } from '@/domain/models/users.model'

const { addUser } = useUsers()
const { user } = useUserStore()
const { fetchPokemonFull, fetchPokemons, isFetchingPokemonFull, pokemonFull, pokemons } =
  usePokemon()
const challengeSteps = ref<IStep[]>([])

const statusError = ref<boolean>(false)
const isCompletedChallenge = ref<boolean>(false)

const fecthPokemon = () => {
  const randomId = Math.floor(Math.random() * 100) + 1
  fetchPokemonFull(randomId)
}

const setStatusError = (value: boolean) => {
  statusError.value = value
}

const addStep = (step: IStep): void => {
  challengeSteps.value.push(step)
}

const correctAnswers = computed(() => {
  let correctAnswers = 0
  if (challengeSteps.value.length) {
    challengeSteps.value.forEach((step) => {
      if (step.question === step.answer) {
        correctAnswers++
      }
    })
    return correctAnswers
  }

  return correctAnswers
})

const prepareData = (): IUser => {
  return {
    email: user.email,
    hasCompletedGame: true,
    correctAnswers: correctAnswers.value
  }
}

watch(
  () => challengeSteps.value,
  (newValue) => {
    if (newValue.length === 5) {
      isCompletedChallenge.value = true
      const userData = prepareData()
      addUser(userData)
    }
  },
  { deep: true }
)

onMounted(() => {
  fetchPokemons()
  fecthPokemon()
})
</script>

<template>
  <Summary v-if="isCompletedChallenge" :challengeSteps="challengeSteps" />
  <div v-else>
    <PokemonShowCase
      :isFetchingPokemonFull="isFetchingPokemonFull"
      :pokemonFull="pokemonFull"
      :statusError="statusError"
    />
    <Trivia
      :pokemonFull="pokemonFull"
      :pokemons="pokemons"
      @add-step="addStep"
      @fecth-pokemon="fecthPokemon"
      @set-status-error="setStatusError"
    />
  </div>
</template>

<style scoped></style>
