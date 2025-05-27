<script setup>
import MovieCard from './MovieCard.vue'
import {getMovieCardInfo} from '@/getMovieCardInfo'
import { ref, watch } from "vue"
import { myUserStore} from '@/authStore'


const props = defineProps(['results'])
const listDataArr = ref([])
const hasMovieDataRetreived = ref(false)

//Get user object
const userFromStorage = myUserStore()
const user = JSON.parse(userFromStorage.user)
 

 //Fetch Movie Card Data
 const BASE_URL = import.meta.env.VITE_BACKEND_URL
 const uid = user.uid
const getMovieData = async () => {
    const {data} = await getMovieCardInfo(BASE_URL + `getHasMovie/${uid}`)
    if (data.value !== null) {
        listDataArr.value = data.value
    }
    console.log(listDataArr.value[0])
    // console.log(dataObjArr.value.length, dataObjArr.value[1])
    hasMovieDataRetreived.value = true
}

getMovieData();

</script>

<template>
    <div class="listGrid">
        <div v-if="hasMovieDataRetreived === false">Loading...</div>
        <div v-else v-for="item,index in props.results" :key="item.id">
            <MovieCard :list-arr="listDataArr" :mid="item.id" :title="item.title" :image="item.poster_path" :release-date="item.release_date" :voters="item.vote_count" :score="item.vote_average" />
        </div>
        
    </div>
</template>