<script setup>
import {ref} from 'vue'
import {postUpdate} from '/src/updateMovieCardInfo'
import {getMovieCardInfo} from '/src/getMovieCardInfo'
import { myUserStore} from '@/authStore'
import { onMounted, watch } from 'vue'
import {useRouter} from 'vue-router'
import AddToListButton from '/src/components/AddToListButton.vue'
import {checkIfInUserList, deleteMovieFromUserList} from '/src/utilites/jsonUtilities.js'


const props = defineProps(['listArr', 'mid', 'image', 'title', 'releaseDate', 'voters', 'score'])
const emit = defineEmits(['deleteFromList'])

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
const user = JSON.parse(userFromStorage.user)

if (userFromStorage.user) {
    userSessionExists.value = true
}
 else if (!userFromStorage.user) {
    userSessionExists.value = false
 }

const status = ref(null)
const rating = ref(null)

 

 

// const parsedData = JSON.parse(data)
//console.log("This is movie status: " + data.value)

 

 const handleRatingSetter = (emittedRating) => {
    rating.value = emittedRating
 }

 const handleStatusSetter = (emittedStatus) => {
    status.value = emittedStatus
 } 

 const handleDeleteFromUserList = async () => {
    const deleteObj = {
        uid: user.uid,
        mid: queryResults.value.id,
        user_rating: 3,
        movie_status: 'null'
    }
    const result = await deleteMovieFromUserList(deleteObj)
    if (result === true) {
        status.value = null
        rating.value = null
        emit('deleteFromList', deleteObj.mid)
    }
    console.log(`This is delete user movie result: ${result === true}`)
}


</script>

<template>
    <div :style="{borderRadius: '20px', position: 'relative'}" class='flex movieCardStyles overflow-hidden movieCardDropShadow'>
        <div v-if="props.title" class="max-w-[185px] rounded-[20px] overflow-hidden border-[1px] border-[#ebebeb] ">
<RouterLink :to="`/movie?id=${mid}`">
    <img v-if="props.image" :src="imageBaseURL + props.image" :alt="`Image for ${props.title}`" class="w-[185px]"/>
<img v-else src="/src/assets/image_not_found.png" class="w-[185px]"/>

<div class="ml-[6px] whitespace-nowrap el mt-[3px] text-[24px]"><p class='ml-[5px] mr-[5px] text-ellipsis  overflow-hidden hover:underline'>{{props.title}}</p></div>
</RouterLink>
<div class="ml-[7px]">
    <div class="flex ">
        <div class="flex items-center mt-[3px]"><img src="/src/assets/Star_ON.svg" /><p class='ml-[1px]'>{{(props.score) ? props.score.toFixed(2) : 'N/A'}}</p></div>
        <div v-if="rating" class="flex items-center mt-[3px]"><img src="/src/assets/Star_RED.svg" /><p class='ml-[1px]'>{{rating}}</p></div>
    </div>
    
    <div class=" mt-[3px]"><p class='ml-[5px] text-ellipsis  overflow-hidden whitespace-nowrap'>Votes: {{(props.voters) ? props.voters : 'N/A'}}</p></div>
    <div><p class='ml-[5px]'>{{(props.releaseDate) ? props.releaseDate : 'N/A'}}</p></div>
</div>
<AddToListButton :deleteButton="false" :parent-rating="rating" :parent-status="status" @status-value="handleStatusSetter" class="ml-[5px]" @rating-value="handleRatingSetter" :myListData="props.listArr" :queryResults="queryResults" />
<Button :style="{position: 'absolute', left: '10px', top: '10px'}" @click="handleDeleteFromUserList" class="mr-[5px] deleteButtonClass" rounded v-if="status !== null" icon="pi pi-trash" severity="danger" aria-label="Delete" />
</div>
    </div>

</template>