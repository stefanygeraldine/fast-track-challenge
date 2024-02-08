<script setup lang="ts">
import type { IStep, IStepSummary } from '@/domain/models/steps.model'
import { usePokemon } from '@/infrastructure/composables/usePokemon.composable'
import { onMounted, ref, computed } from 'vue'
import Green from '@/infrastructure/assets/icons/green.svg'
import Red from '@/infrastructure/assets/icons/red.svg'
import type { IPokemonFull } from '@/domain/models/pokemon.model'
import { getPalette } from '@/infrastructure/utilities/vibrant.util'
import Confetti from '@/infrastructure/components/Confetti.vue'
import Winner from '@/infrastructure/assets/images/winner.png'

const props = defineProps<{
  challengeSteps: IStep[]
}>()
const { fetchPokemon } = usePokemon()
const pokemonData = ref<IStepSummary[]>([])
const loadPokemonData = async () => {
  const promises = props.challengeSteps.map((step) =>
    fetchPokemon(step.question).then(async (data: IPokemonFull) => {
      const img: string = data.sprites?.other?.dream_world?.front_default ?? ''
      return {
        question: step.question,
        answer: step.answer,
        image: img,
        background: await getPalette(img).then((result) => result.vibrant)
      }
    })
  )
  pokemonData.value = await Promise.all(promises)
}

const correctAnswersCount = computed(() => {
  return props.challengeSteps.filter((step) => step.question === step.answer).length
})

onMounted(loadPokemonData)
</script>

<template>
  <Confetti v-if="correctAnswersCount === 5" />
  <div class="summary">
    <img v-if="correctAnswersCount === 5" :src="Winner" alt="Winner" class="summary__win" />
    <p v-else class="title__light">{{ correctAnswersCount }} correct answers out of 5 questions</p>
    <ul class="summary__list">
      <li class="summary__item" v-for="step in pokemonData" :key="step.question">
        <div class="summary__item--container">
          <img
            class="summary__item--image"
            :src="step.image"
            alt="pokemon"
            :style="{
              backgroundColor: step.background
            }"
          />
          <h5 class="headline__light">{{ step.question }}</h5>
        </div>
        <img
          class="summary__item--icon"
          v-if="step.question === step.answer"
          :src="Green"
          alt="right"
        />
        <img class="summary__item--icon" v-else :src="Red" alt="error" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.summary {
  width: 100%;
  padding: 0 10%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__list {
    list-style-type: none;
    padding: 0;
    width: 100%;
    min-height: 20vh;
  }
  &__item {
    margin-bottom: 1em;
    border: solid 2px #ffcc01;
    padding: 1rem 3rem;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: $secondary;

    &--icon {
      width: 3rem;
    }
    &--image {
      width: 6rem;
      height: 6rem;
      border: solid 3px #ffcc01;
      border-radius: 50%;
      margin-right: 2rem;
    }
    &--container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__win {
    width: 10rem;
  }
}
</style>
