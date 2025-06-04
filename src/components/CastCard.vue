<script setup>
import {ref} from 'vue'

const props = defineProps(['castImage', 'castName', 'castCharacterName'])
const imageBaseURL = ref('https://image.tmdb.org/t/p/w185')

</script>

<template>
    <div class="rounded-[20px] castCardShadow">
        <a :href="`https://google.com/search?q=${castName}`">
        <img v-if="props.castImage" :src="imageBaseURL + props.castImage" :alt="`Image for ${props.castName}`" class="w-[185px] rounded-[20px]"/>
        <img v-else src="/src/assets/image_not_found.png" class="w-[185px] rounded-[20px]"/>
        </a>
        <div class="p-[10px]">
            <a :href="`https://google.com/search?q=${castName}`"><div class="font-bold text-ellipsis  overflow-hidden hover:underline text-nowrap">{{castName}}</div></a>
            <div class="text-slate-500 ">{{(castCharacterName) ? castCharacterName : 'N/A'}}</div>
        </div>
    </div>
</template>