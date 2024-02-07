<script setup lang="ts">
import { ref } from 'vue'
import type { IUser } from '@/domain/models/users.model'
import { useUsers } from '@/infrastructure/composables/useUser.composable'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/infrastructure/stores/user'
import { isValidEmail } from '@/infrastructure/utilities/valid-email.util'

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
  <section class="container">
    <label for="email">Email</label>
    <input class="input" type="text" v-model="user.email" />
    <button class="button" @click="validateUser">Validate</button>
  </section>
</template>
