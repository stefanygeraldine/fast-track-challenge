<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IPokemon, IPokemonFull } from '@/domain/models/pokemon.model'

const props = defineProps<{
  options: (IPokemon | IPokemonFull)[]
  disabled: boolean
}>()

const emit = defineEmits(['handleSelected'])

const optionSelected = ref('')

watch(optionSelected, (newValue) => {
  emit('handleSelected', newValue)
})
</script>

<template>
  <div class="radio-buttons-container">
    <div class="radio-button" v-for="option in props.options" :key="option.name">
      <input
        class="radio-button__input"
        type="radio"
        :disabled="props.disabled"
        v-model="optionSelected"
        :value="option.name"
        :id="option.name"
      />
      <label :for="option.name" class="radio-button__label">
        <span class="radio-button__custom"></span>

        {{ option.name }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.radio-buttons-container {
  display: flex;
  align-items: center;
  gap: 24px;
}

.radio-button {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.radio-button__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-button__label {
  display: inline-block;
  padding-left: 30px;
  margin-bottom: 10px;
  position: relative;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.radio-button__custom {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #555;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.radio-button__input:checked + .radio-button__label .radio-button__custom {
  transform: translateY(-50%) scale(0.9);
  border: 5px solid #4c8bf5;
  color: #4c8bf5;
}

.radio-button__input:checked + .radio-button__label {
  color: #4c8bf5;
}

.radio-button__label:hover .radio-button__custom {
  transform: translateY(-50%) scale(1.2);
  border-color: #4c8bf5;
  box-shadow: 0 0 10px #4c8bf580;
}
</style>
