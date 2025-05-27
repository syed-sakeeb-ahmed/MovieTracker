<script setup>
import {ref} from 'vue'
import {postUpdate} from '/src/updateMovieCardInfo'
import {getMovieCardInfo} from '/src/getMovieCardInfo'
import { myUserStore} from '@/authStore'
import { onMounted } from 'vue'

const props = defineProps(['listArr', 'mid', 'image', 'title', 'releaseDate', 'voters', 'score'])

const status = ref(null)
const rating = ref(null)
const imageBaseURL = ref('https://image.tmdb.org/t/p/w185')

//Popover
const op = ref()
const toggle = (event) => {
    op.value.toggle(event);
    displayError.value = false
}

const statusValues = ref([
    "Completed",
    "Plan to Watch"
]);
const ratingValues = [1,2,3,4,5,6,7,8,9,10]

const intermediaryStatus = ref(null)
const intermediaryRating = ref(null)

const displayError = ref(false);

//User info
const userSessionExists = ref(false)
const userFromStorage = myUserStore()

if (userFromStorage.user) {
    userSessionExists.value = true
}
 else if (!userFromStorage.user) {
    userSessionExists.value = false
 }

 const checkIfInUserList = () => {
    //console.log("This is listArr props: " + props.listArr[0].uid)
    for (const item of props.listArr) {
        console.log("This is item mid: " + item.mid)
        if (props.mid === item.mid) {
            status.value = item.movie_status
            rating.value = item.user_rating
            console.log("Found one")
            break;
        }
    }
 }

 onMounted(() => {
    checkIfInUserList();
 })
 

// const parsedData = JSON.parse(data)
//console.log("This is movie status: " + data.value)

const BASE_URL = import.meta.env.VITE_BACKEND_URL
const addToListURL = BASE_URL + "addToList"

const handleListChange = async (movieStatus, userRating) => {
    const user = JSON.parse(userFromStorage.user)
    const addToListBody = {
    "uid": user.uid,
    "mid": props.mid,
    "poster_path": props.image,
    "title": props.title,
    "rating": props.score,
    "votes": props.voters,
    "release_date": props.releaseDate,
    "movie_status": movieStatus,
    "user_rating": userRating
}
    const {data} = await postUpdate(addToListURL, addToListBody)
    if (data.value !== null) {
        status.value = data.value.movie_status
        rating.value = data.value.user_rating
    }
}

const handleSubmit = (movieStatus, userRating) => {
    if (movieStatus !== null && userRating !== null) {
        handleListChange(movieStatus, userRating);
        toggle();
        // console.log("This is intermediaryStatus: " + intermediaryStatus.value)
        intermediaryStatus.value = null
        intermediaryRating.value = null
        displayError.value = false;
    }
    else {
        displayError.value = true
    }
}



</script>

<template>
    <div class='movieCardStyles border-[1px] border-[#ebebeb]'>
        <div v-if="props.title" class="max-w-[185px]">
<img v-if="props.image" :src="imageBaseURL + props.image" :alt="`Image for ${props.title}`" class="w-[185px]"/>
<img v-else src="/src/assets/image_not_found.png" class="w-[185px]"/>
<div class="whitespace-nowrap el mt-[3px] text-[24px]"><p class='ml-[5px] mr-[5px] text-ellipsis  overflow-hidden'>{{props.title}}</p></div>
<div class="flex items-center mt-[3px]"><img src="/src/assets/STAR_ON.svg" /><p class='ml-[1px]'>{{(props.score) ? props.score.toFixed(2) : 'N/A'}}</p></div>
<div class=" mt-[3px]"><p class='ml-[5px] text-ellipsis  overflow-hidden whitespace-nowrap'>Votes: {{(props.voters) ? props.voters : 'N/A'}}</p></div>
<div><p class='ml-[5px]'>{{(props.releaseDate) ? props.releaseDate : 'N/A'}}</p></div>
<Button v-if="status === 'Completed'" class='mt-[10px] mb-[10px]' severity="success" rounded label="Completed" @click="toggle"/>
<Button v-else-if="status === 'Plan to Watch'" class='mt-[10px] mb-[10px]' severity="warn" rounded label="Plan to Watch" @click="toggle"/>
<Button v-else-if="status === null" class='mt-[10px] mb-[10px]' rounded label="Add to List" @click="toggle"/>
<Popover ref="op">
    <div class="flex flex-col gap-[10px]">
        <!-- <span>Rating</span> -->
        <Select v-model="intermediaryRating" :options="ratingValues" placeholder="Rating" class="w-full" />
        <Select v-model="intermediaryStatus" :options="statusValues" placeholder="Status" class="w-full" />
        <Button label="Submit" @click="handleSubmit(intermediaryStatus, intermediaryRating)"/>
        <Message v-if="displayError" severity="error" size="small" variant="simple">Both fields must be filled out</Message>
    </div>
</Popover>
</div>
    </div>

</template>