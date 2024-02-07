<script setup lang="ts">
import type { IStep } from '@/domain/models/steps.model'

const props = defineProps<{
  challengeSteps: IStep[]
}>()
</script>

<template>
  <h1>Summary</h1>
  <ul>
    <!-- Itera sobre challengeSteps para mostrar cada pregunta y respuesta -->
    <li v-for="(step, index) in challengeSteps" :key="index">
      <strong>Question:</strong> {{ step.question }}
      <br />
      <strong>Answer:</strong> {{ step.answer }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1em;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
}
</style>
