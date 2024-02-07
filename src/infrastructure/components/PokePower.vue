<script setup lang="ts">
const props = defineProps<{
  type: string
}>()
</script>
<template>
  <div class="wrapper-poke-power">
    <div class="sprite" :class="type"></div>
  </div>
</template>
<style>
.sprite {
  background: url('@/infrastructure/assets/sprite.png') no-repeat;
  background-size: 280px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 10px 5px;
}

.wrapper-poke-power {
  max-width: -webkit-fill-available;
  display: flex;
}
.active {
  box-shadow: rgb(255 255 255) 1px 1px 14px !important;
  cursor: pointer;
}
.poke-power-active {
  box-shadow: rgb(21 123 255) 1px 1px 14px;
  cursor: pointer;
}

.poke-power {
  transform: scale(1.5);
  box-shadow: rgb(0 12 107) 1px 1px 14px;
  cursor: pointer;
}

.poke-power:hover {
  box-shadow: rgb(21 123 255) 1px 1px 14px;
}
.power-item {
  padding: 24px;
  float: left;
}
/* icons Powers */
.water {
  background-position: -17px -19px;
}

.fire {
  background-position: -58px -19px;
}

.grass {
  background-position: -100px -19px;
}

.ground {
  background-position: -140px -19px;
}

.rock {
  background-position: -185px -19px;
}

.steel {
  background-position: -228px -19px;
}

.ice {
  background-position: -17px -76px;
}

.electric {
  background-position: -57px -76px;
}

.dragon {
  background-position: -100px -76px;
}

.ghost {
  background-position: -140px -76px;
}

.psychic {
  background-position: -185px -76px;
}

.normal {
  background-position: -228px -76px;
}

.fighting {
  background-position: -17px -133px;
}

.poison {
  background-position: -57px -133px;
}

.bug {
  background-position: -100px -133px;
}

.flying {
  background-position: -140px -133px;
}

.dark {
  background-position: -185px -133px;
}

.fairy {
  background-position: -228px -133px;
}
</style>
