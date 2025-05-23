import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { getAuth } from 'firebase/auth'

export const myUserStore = defineStore('userStore', () => {
  const user = useStorage('authUser', null, localStorage)

  return { user }
})