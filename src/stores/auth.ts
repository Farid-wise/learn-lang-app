import { ref } from 'vue';
import { defineStore } from 'pinia'
import type { User } from 'firebase/auth';
import {signOut, getAuth} from 'firebase/auth'
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {


  const router = useRouter()
  const user = ref<User>()
  const userId = ref<string>('')


  const clearUser = async () => {
    await signOut(getAuth())
    userId.value = ''
    user.value = {} as User
    if(localStorage.getItem('user_id')) localStorage.removeItem('user_id')

    await router.replace({name: 'signIn'})

  }

  const setUser = (_user: User) => {

    userId.value = _user?.uid
    user.value = _user
  }



  return { 
    userId,
    user,
    clearUser,
    setUser
  }
})
