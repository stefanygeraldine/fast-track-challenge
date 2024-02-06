import { type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/domain/models/users.model'

export const useUserStore = defineStore('user', () => {
  const user: Ref<IUser> = ref({
    email: '',
    hasCompletedGame: false
  })

  function updateUser(_user: IUser) {
    user.value = _user
  }

  return { user, updateUser }
})
