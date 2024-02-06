import { computed, ref } from 'vue'
import { useCollection } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import type { IUser } from '@/domain/models/users.model'

export const useUsers = () => {
  const error = ref<string | null>(null)
  const { data: users, error: collectionError } = useCollection(collection(db, 'users'))

  if (collectionError.value) {
    error.value = collectionError.value.message
  }

  const addUser = async (user: IUser) => {
    try {
      await addDoc(collection(db, 'users'), user)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
    }
  }

  const isRegisteredUser = (email: string) => {
    return computed(() => users.value.some((user) => user.email === email)).value
  }

  return { users, error, addUser, isRegisteredUser }
}
