<script setup lang="ts">
import { ref } from 'vue'
import type { IUser } from '@/domain/models/users.model'
import { useUsers } from '@/infrastructure/composables/useUser.composable'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/infrastructure/stores/user'

const { addUser, users, isRegisteredUser } = useUsers()
const router = useRouter()
const { updateUser } = useUserStore()

const user = ref<IUser>({
  email: '',
  hasCompletedGame: false
})

const validateUser = (): void => {
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
  <input type="text" v-model="user.email" />
  <ul>
    <li v-for="user in users" :key="user?.id">
      <span>{{ user?.email }}</span>
    </li>
  </ul>

  <button v-on:click="addUser(user)">Add user</button>
  <button v-on:click="validateUser()">Validate</button>
</template>
