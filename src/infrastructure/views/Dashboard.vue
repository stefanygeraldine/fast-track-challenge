<script setup lang="ts">
import { computed } from 'vue'
import { useUsers } from '@/infrastructure/composables/useUser.composable'
import Banner from '@/infrastructure/assets/images/banner.png'
import { RouterLink } from 'vue-router'
import Header from '@/infrastructure/components/Header.vue'
import Ranking from '@/infrastructure/components/Ranking.vue'
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
  <section class="container dashboard" :style="{ backgroundImage: `url(${Banner})` }">
    <Header>
      <nav class="navigation">
        <RouterLink class="link__light" to="/sign-in">Sign In</RouterLink>
      </nav>
    </Header>
    <div class="dashboard__section">
      <h2 class="headline__heavy">Winners</h2>
      <ul class="dashboard__list">
        <li class="dashboard__list--item" v-for="winner in winners" :key="winner.email">
          <span>{{ winner.email }}</span>
          <Ranking :aciertos="winner.correctAnswers" :total="5" />
        </li>
      </ul>
    </div>
    <div class="dashboard__section">
      <h2 class="headline__heavy">Losers</h2>
      <ul class="dashboard__list">
        <li class="dashboard__list--item" v-for="loser in losers" :key="loser.email">
          <span>{{ loser.email }}</span>
          <Ranking :aciertos="loser.correctAnswers" :total="5" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dashboard {
  @extend .global-background;
  @include flex(row, flex-start);
  @include breakpoint($tablet-landscape, 'max') {
    @include flex(column);
  }

  height: auto;
  max-height: 100vh;
  overflow: auto;

  &__container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__section {
    @include flex(column);
    @include breakpoint($tablet-landscape, 'max') {
      width: 80%;
      margin: 0;
      margin-top: 8rem;
    }
    z-index: 3;
    width: 40%;
    margin: 10%;
  }
  &__list {
    width: 100%;
    padding: 2rem;
    list-style-type: none;

    &--item {
      @extend .subheader__light;
      @include flex(row);
      @include breakpoint($tablet-landscape, 'max') {
        @include flex(column);
        padding: 1rem 0.5rem;
      }
      background-color: $secondary;
      border-radius: $mainCard;
      margin: 1rem 0;
      padding: 1rem 3rem;
    }
  }
}
</style>
