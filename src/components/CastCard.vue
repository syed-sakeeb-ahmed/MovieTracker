<script setup>
import {ref} from 'vue'

const props = defineProps(['castImage', 'castName', 'castCharacterName'])
const imageBaseURL = ref('https://image.tmdb.org/t/p/w185')

</script>

<template>
    <div>
        <img v-if="props.castImage" :src="imageBaseURL + props.castImage" :alt="`Image for ${props.castName}`" class="w-[185px]"/>
        <img v-else src="/src/assets/image_not_found.png" class="w-[185px]"/>
        <div>{{castName}}</div>
        <div>{{castCharacterName}}</div>
    </div>
</template>