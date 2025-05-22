<script setup>
import {useRoute} from 'vue-router'
import {ref, computed} from 'vue'

const route = useRoute()

const comp = computed(() => ({
    isNotVisible: route.path === '/login' || route.path === '/register'
}))

</script>


<template>
    <div class="flex justify-between bg-white w-full">
        
        <div class="flex justify-center items-center ml-[30px]">MyMovieIndex</div>
        <div :class="comp" class="flex items-center bg-white p-[10px]">
            <Button rounded label='Login' />
            <Button class="ml-[5px]" rounded variant="outlined" label="Sign up" />
        </div>
</div>
</template>