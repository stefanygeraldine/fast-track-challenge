<script setup lang="ts">
import { ref } from 'vue'
import type { IUser } from '@/domain/models/users.model'
import { useUsers } from '@/infrastructure/composables/useUser.composable'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/infrastructure/stores/user'
import { isValidEmail } from '@/infrastructure/utilities/valid-email.util'
import Banner from '@/infrastructure/assets/images/banner.png'
import Header from '@/infrastructure/components/Header.vue'
import StarImage from '@/infrastructure/assets/parallax/stars.svg'
import FooterSvg from '@/infrastructure/assets/parallax/footer.svg'

const { isRegisteredUser } = useUsers()
const router = useRouter()
const { updateUser } = useUserStore()

const user = ref<IUser>({
  email: '',
  hasCompletedGame: false,
  correctAnswers: 0
})

const validateUser = (): void => {
  if (!isValidEmail(user.value.email)) {
    alert('Please enter a valid email address.')
    return
  }

  const hasCompletedGame: boolean = isRegisteredUser(user.value.email)
  if (hasCompletedGame) {
    router.push('/dashboard')
  } else {
    user.value.hasCompletedGame = hasCompletedGame
    updateUser(user.value)
    router.push('/challenge')
  }
}
</script>

<template>
  <section class="container form" :style="{ backgroundImage: `url(${Banner})` }">
    <img class="form__image" :src="StarImage" alt="Star Image" />
    <img class="form__image--footer" :src="FooterSvg" alt="Footer Svg" />
    <Header>
      <nav class="navigation">
        <RouterLink class="link__light" to="/dashboard">Dashboard</RouterLink>
      </nav>
    </Header>
    <div class="form__container">
      <h1 class="form__container--title display__heavy">Are you ready for the challenge?</h1>
      <input
        class="input"
        type="email"
        v-model="user.email"
        @keyup.enter="validateUser"
        placeholder="Email"
      />
      <div>
        <button class="button" @click="validateUser">Validate</button>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.form {
  @extend .global-background;
  position: relative;
  overflow: hidden;
  &__container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &--title {
      text-align: center;
    }
  }
  &__image {
    position: fixed;
    width: 100%;
    top: 0;
    &--footer {
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  }
}
</style>
