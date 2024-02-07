<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import Trivia from '@/infrastructure/components/Trivia.vue'
import PokemonShowCase from '@/infrastructure/components/PokemonShowCase.vue'
import Summary from '@/infrastructure/components/Summary.vue'
import Header from '@/infrastructure/components/Header.vue'

import { usePokemon } from '@/infrastructure/composables/usePokemon.composable'
import { useUsers } from '@/infrastructure/composables/useUser.composable'
import { useUserStore } from '@/infrastructure/stores/user'

import type { IUser } from '@/domain/models/users.model'
import type { IStep, StepStatus } from '@/domain/models/steps.model'
import { RouterLink } from 'vue-router'

import Fondo from '@/infrastructure/assets/fondo.svg'

const { addUser } = useUsers()
const { user } = useUserStore()
const { fetchPokemonFull, fetchPokemons, isFetchingPokemonFull, pokemonFull, pokemons } =
  usePokemon()

const challengeSteps = ref<IStep[]>([])
const usedPokemonIds = ref<number[]>([])

const stepStatus = ref<StepStatus>('initial')
const isCompletedChallenge = ref<boolean>(false)

const fecthPokemon = () => {
  let randomId = Math.floor(Math.random() * 100) + 1
  while (usedPokemonIds.value.includes(randomId)) {
    randomId = Math.floor(Math.random() * 100) + 1
  }
  usedPokemonIds.value.push(randomId)
  fetchPokemonFull(randomId)
}

const setStepStatus = (value: StepStatus) => {
  stepStatus.value = value
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
  <section
    class="container"
    :style="{
      backgroundImage: 'url(' + Fondo + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <Header>
      <nav class="navigation">
        <RouterLink class="button" to="/sign-in">Change User</RouterLink>
        <RouterLink class="button" to="/dashboard">Dashboard</RouterLink>
      </nav>
    </Header>
    <Summary v-if="isCompletedChallenge" :challengeSteps="challengeSteps" />
    <div v-else>
      <PokemonShowCase
        :isFetchingPokemonFull="isFetchingPokemonFull"
        :pokemonFull="pokemonFull"
        :stepStatus="stepStatus"
      />
      <Trivia
        :pokemonFull="pokemonFull"
        :pokemons="pokemons"
        @add-step="addStep"
        @fecth-pokemon="fecthPokemon"
        @set-step-status="setStepStatus"
      />
    </div>
  </section>
</template>

<style scoped>
.navigation {
  background-color: #132939;
}
</style>
