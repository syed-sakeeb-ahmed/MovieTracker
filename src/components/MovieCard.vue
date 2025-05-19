<script setup>
import {ref} from 'vue'

const props = defineProps(['image', 'title', 'releaseDate', 'voters', 'score'])

const status = ref(null)
const rating = ref(null)
const imageBaseURL = ref('https://image.tmdb.org/t/p/w185')

const statusValues = ref([
    { name: 'Plan to watch' },
    { name: 'Completed' },
]);
const ratingValues = [1,2,3,4,5,6,7,8,9,10]
</script>

<template>
    <div class='movieCardStyles border-[1px] border-[#ebebeb]'>
        <div v-if="props.title" class="max-w-[185px]">
<img v-if="props.image" :src="imageBaseURL + props.image" :alt="`Image for ${props.title}`" class="w-[185px] h-[278px]"/>
<img v-else src="/src/assets/image_not_found.png" class="w-[185px] h-[278px]"/>
<div class="whitespace-nowrap el mt-[3px] text-[24px]"><p class='ml-[5px] mr-[5px] text-ellipsis  overflow-hidden'>{{props.title}}</p></div>
<div class="mt-[3px]"><p class='ml-[5px]'>{{(props.score) ? props.score : 'N/A'}}</p></div>
<div class=" mt-[3px]"><p class='ml-[5px]'>{{(props.voters) ? props.voters : 'N/A'}}</p></div>
<div><p class='ml-[5px]'>{{(props.releaseDate) ? props.releaseDate : 'N/A'}}</p></div>
<Button class='mt-[10px] mb-[10px]' rounded label="Add to List" />

</div>
    </div>

</template>