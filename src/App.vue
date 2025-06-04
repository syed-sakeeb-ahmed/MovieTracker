<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

import { menuToggle } from './store';

import {computed, watch} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

const notMovieView = computed(() => ({
    notMovieView: route.path !== '/movie'
}))

// watch(route, () => {
//   console.log("This is route path in app: " + JSON.stringify(route))

// })
</script>

<template>
  <div :class="notMovieView" @click="menuToggle.isOpen = false" class="h-full max-w-[2000px] flex flex-col">
    <Navbar />
    <RouterView/>
    <Footer />
  </div>
</template>
