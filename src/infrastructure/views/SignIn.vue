<script setup lang="ts">
import { useCollection, useFirestore } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import { ref } from 'vue'
import type { IUser } from '@/domain/models/users.model'

const db = useFirestore()
const users = useCollection(collection(db, 'users'))

const user = ref<IUser>({
  email: 'test@email.com',
  hasCompletedGame: false
})

const addUser = async () => {
  const newUser = await addDoc(collection(db, 'users'), {
    ...user.value
  })
  console.log(newUser)
}
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <span>{{ user.email }}</span>
    </li>
  </ul>

  <button v-on:click="addUser()">Add user</button>
</template>
