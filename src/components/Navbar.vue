<script setup>
import {useRoute, useRouter} from 'vue-router'
import {ref, computed, watch} from 'vue'
import { getAuth, signOut } from "firebase/auth";
import { myUserStore} from '@/authStore'

const route = useRoute()
const router = useRouter()

const auth = getAuth()

const userSessionExists = ref(false)

const userFromStorage = myUserStore()

if (userFromStorage.user) {
    userSessionExists.value = true
}
 else if (!userFromStorage.user)
{
    auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    userFromStorage.user = JSON.stringify(user)
    userSessionExists.value = true
    // ...
  } else {
    // User is signed out
    // ...
    userSessionExists.value = false
  }
});
}

const handleLogout = () => {
    const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  const userFromStorage = myUserStore()
  userFromStorage.user = null
  userSessionExists.value = false
}).catch((error) => {
  throw error
});
}

const comp = computed(() => ({
    isNotVisible: route.path === '/login' || route.path === '/register'
}))

const handleLoginClick = () => {
    router.push('/login')
}

const handleSignUpClick = () => {
    router.push('/register')
}

const handleMyList = () => {
    router.push('/mylist')
}

watch(() => userFromStorage.user, () => {
  if (userFromStorage.user) {
    userSessionExists.value = true
  }
  else if (!userFromStorage.user) {
    userSessionExists.value = false
  }
})

</script>


<template>
    <div class="flex justify-between bg-white w-full">
        
       <a class="flex"  href="/list"><div class="flex justify-center w-full items-center p-[10px] logoTitleClass">MyMovieIndex</div></a>
        <div v-if="!userSessionExists" :class="comp" class="navButtonsContainerClass bg-white p-[10px]">
            <Button @click="handleLoginClick" rounded label='Login' class="navButtonsClass" />
            <Button @click="handleSignUpClick" class="navButtonsClass" rounded variant="outlined" label="Sign up" />
        </div>
        <div class="navButtonsContainerClass p-[10px]" v-else-if="userSessionExists">
            <Button variant="outlined" class="navButtonsClass" rounded @click="handleMyList" label="My List" />
            <Button rounded @click="handleLogout" class="navButtonsClass" label="Logout" />
        </div>
</div>
</template>