<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { menuToggle } from './store';
</script>

<template>
  <div @click="menuToggle.isOpen = false" class="h-full max-w-[2000px] flex flex-col items-center">
    <Navbar />
    <RouterView/>
    <Footer />
  </div>
</template>
