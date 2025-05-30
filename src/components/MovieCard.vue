<script setup>
import {ref} from 'vue'
import {postUpdate} from '/src/updateMovieCardInfo'
import {getMovieCardInfo} from '/src/getMovieCardInfo'
import { myUserStore} from '@/authStore'
import { onMounted, watch } from 'vue'
import {useRouter} from 'vue-router'
import AddToListButton from '/src/components/AddToListButton.vue'
import {checkIfInUserList} from '/src/utilites/jsonUtilities.js'


const props = defineProps(['listArr', 'mid', 'image', 'title', 'releaseDate', 'voters', 'score'])

const router = useRouter();

const imageBaseURL = ref('https://image.tmdb.org/t/p/w185')

const queryResults = ref({
    id: props.mid,
    poster_path: props.image,
    title: props.title,
    vote_average: props.score,
    vote_count: props.voters,
    release_date: props.releaseDate,
})



//User info
const userSessionExists = ref(false)
const userFromStorage = myUserStore()

if (userFromStorage.user) {
    userSessionExists.value = true
}
 else if (!userFromStorage.user) {
    userSessionExists.value = false
 }

 const status = ref(null)
const rating = ref(null)




 

 //Check if user logged in
watch(() => userFromStorage.user, () => {
    if (!userFromStorage.user) {
        status.value = null
        rating.value = null
    }
})

// const parsedData = JSON.parse(data)
//console.log("This is movie status: " + data.value)

 
 onMounted(() => {
    const statusRatingObj = checkIfInUserList(props.listArr, props.mid)
    status.value = statusRatingObj.status
    rating.value = statusRatingObj.rating
 })


</script>

<template>
    <div class='movieCardStyles border-[1px] border-[#ebebeb]'>
        <div v-if="props.title" class="max-w-[185px]">
<RouterLink :to="`/movie?id=${mid}`">
    <img v-if="props.image" :src="imageBaseURL + props.image" :alt="`Image for ${props.title}`" class="w-[185px]"/>
<img v-else src="/src/assets/image_not_found.png" class="w-[185px]"/>

<div class="whitespace-nowrap el mt-[3px] text-[24px]"><p class='ml-[5px] mr-[5px] text-ellipsis  overflow-hidden hover:underline'>{{props.title}}</p></div>
</RouterLink>
<div class="flex items-center mt-[3px]"><img src="/src/assets/STAR_ON.svg" /><p class='ml-[1px]'>{{(props.score) ? props.score.toFixed(2) : 'N/A'}}</p></div>
<div class=" mt-[3px]"><p class='ml-[5px] text-ellipsis  overflow-hidden whitespace-nowrap'>Votes: {{(props.voters) ? props.voters : 'N/A'}}</p></div>
<div><p class='ml-[5px]'>{{(props.releaseDate) ? props.releaseDate : 'N/A'}}</p></div>
<AddToListButton :myListData="props.listArr" :queryResults="queryResults" />
</div>
    </div>

</template>