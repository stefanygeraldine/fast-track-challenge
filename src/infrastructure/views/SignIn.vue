<script setup lang="ts">
import { ref } from 'vue'
import type { IUser } from '@/domain/models/users.model'
import { useUsers } from '@/infrastructure/composables/useUser.composable'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/infrastructure/stores/user'
import { isValidEmail } from '@/infrastructure/utilities/valid-email.util'
import Banner from '@/infrastructure/assets/images/banner.png'
import Header from '@/infrastructure/components/Header.vue'

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
    <Header>
      <nav class="navigation">
        <RouterLink class="link__light" to="/dashboard">Dashboard</RouterLink>
      </nav>
    </Header>
    <div class="form__container">
      <input class="input" type="text" v-model="user.email" placeholder="Email" />
      <div>
        <button class="button" @click="validateUser">Validate</button>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.form {
  @extend .global-background;
  &__container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
