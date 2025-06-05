<script setup>
import {ref, watch, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { myUserStore} from '@/authStore'
import {postUpdate} from '/src/updateMovieCardInfo'
import {SECRET, checkIfInUserList, getMovieData, deleteMovieFromUserList} from '@/utilites/jsonUtilities'

const props = defineProps(['queryResults', 'myListData', 'parentStatus', 'parentRating', 'deleteButton'])
const emit = defineEmits(['ratingValue', 'statusValue'])

const router = useRouter()
const route = useRoute()

//Select options
const statusValues = ref([
    "Completed",
    "Plan to Watch"
]);
const ratingValues = [1,2,3,4,5,6,7,8,9,10]

const intermediaryStatus = ref(null)
const intermediaryRating = ref(null)

//Popover
const op = ref()
const displayError = ref(false);

const toggle = (event) => {
    op.value.toggle(event);
    displayError.value = false
}

//Event functions 
const handleActionButtonClick = (event) => {
    if (!userFromStorage.user) {
        router.push('/login')
    }
    else {
        toggle(event);
    }
}

const handleSubmit = (movieStatus, userRating) => {
    if (movieStatus !== null && userRating !== null) {
        handleListChange(movieStatus, userRating)
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

const handleDeleteFromUserList = async () => {
    const deleteObj = {
        uid: user.uid,
        mid: props.queryResults.id,
        user_rating: 3,
        movie_status: 'null'
    }
    const result = await deleteMovieFromUserList(deleteObj)
    if (result === true) {
        status.value = null
        rating.value = null
    }
    console.log(`This is delete user movie result: ${result === true}`)
}


//Get user object
const userFromStorage = myUserStore()
const user = JSON.parse(userFromStorage.user)
 
 const uid = (user) ? user.uid : 'null'

//Get user list data
const listDataArr = ref([])
const loadedUserListData = ref(false)

const status = ref(null)
const rating = ref(null)
const movieID = (route.query.id) ? route.query.id : undefined

onMounted(async () => {
    //ToDO move getMovieData upward
    listDataArr.value = props.myListData
    console.log("AddToList listData value: " + listDataArr.value)
    const outputObj = checkIfInUserList(listDataArr.value, props.queryResults.id)
    status.value = outputObj.status
    rating.value = outputObj.rating
    loadedUserListData.value = true
    console.log("AddToList status value: " + status.value)
 })


 //Handle List change
const BASE_URL = import.meta.env.VITE_BACKEND_URL
const addToListURL = BASE_URL + "addToList"


 const handleListChange = async (movieStatus, userRating) => {
    const user = JSON.parse(userFromStorage.user)
    const addToListBody = {
    "uid": user.uid,
    "mid": props.queryResults.id,
    "poster_path": props.queryResults.poster_path,
    "title": props.queryResults.title,
    "rating": props.queryResults.vote_average,
    "votes": props.queryResults.vote_count,
    "release_date": props.queryResults.release_date,
    "movie_status": movieStatus,
    "user_rating": userRating
}
    const {data} = await postUpdate(addToListURL, addToListBody)
    if (data.value !== null) {
        status.value = data.value.movie_status
        rating.value = data.value.user_rating
    }
}



//Check if user logged in
watch(() => userFromStorage.user, () => {
    if (!userFromStorage.user) {
        status.value = null
        rating.value = null
    }
})

watch(rating, () => {
    emit('ratingValue', rating.value)
})

watch(status, () => {
    emit('statusValue', status.value)
})

watch(() => props.parentRating, () => {
    rating.value = props.parentRating
})

watch(() => props.parentStatus, () => {
    status.value = props.parentStatus
})

</script>

<template>
    <div v-if="loadedUserListData">
        <div class="">
            <Button v-if="status === 'Completed'" class='mt-[10px] mb-[10px]' severity="success" rounded label="Completed" @click="handleActionButtonClick"/>
        <Button v-else-if="status === 'Plan to Watch'" class='mt-[10px] mb-[10px]' severity="warn" rounded label="Plan to Watch" @click="handleActionButtonClick"/>
        <Button v-else-if="status === null" class='mt-[10px] mb-[10px]' rounded label="Add to List" @click="handleActionButtonClick"/>
        <Button  @click="handleDeleteFromUserList" class="ml-[10px]" rounded v-if="status !== null && props.deleteButton" icon="pi pi-trash" severity="contrast" aria-label="Delete" />
    </div>
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
</template>