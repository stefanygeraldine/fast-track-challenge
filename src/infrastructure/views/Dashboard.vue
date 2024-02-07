<script setup lang="ts">
import { computed } from 'vue'
import { useUsers } from '@/infrastructure/composables/useUser.composable'
const { users } = useUsers()

const winners = computed(() => {
  return users.value
    .filter((user) => user.correctAnswers === 5)
    .sort((a, b) => b.correctAnswers - a.correctAnswers)
})

const losers = computed(() => {
  return users.value
    .filter((user) => user.correctAnswers < 5)
    .sort((a, b) => b.correctAnswers - a.correctAnswers)
})
</script>

<template>
  <div>
    <h2>Ganadores</h2>
    <ul>
      <li v-for="winner in winners" :key="winner.email">
        {{ winner.email }} - Right answers: {{ winner.correctAnswers }}
      </li>
    </ul>
    <h2>Perdedores</h2>
    <ul>
      <li v-for="loser in losers" :key="loser.email">
        {{ loser.email }} - Right answers: {{ loser.correctAnswers }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  color: #333;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 8px;
}
</style>
