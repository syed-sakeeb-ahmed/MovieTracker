<script setup>
import MovieCard from './MovieCard.vue'
import {getMovieCardInfo} from '@/getMovieCardInfo'
import { ref, watch } from "vue"
import { myUserStore} from '@/authStore'
import { BASE_URL, getMovieData } from '/src/utilites/jsonUtilities'

const props = defineProps(['results'])
const listDataArr = ref([])
const hasMovieDataRetreived = ref(false)

//Get user object
const userFromStorage = myUserStore()
const user = JSON.parse(userFromStorage.user)
 

 //Fetch Movie Card Data
 const uid = (user) ? user.uid : 'null'

 const getUserListData = async (uid) => {
    listDataArr.value = await getMovieData(uid)
    hasMovieDataRetreived.value = true
 }
 
 getUserListData(uid);

</script>

<template>
    <div class="listGrid">
        <div v-if="hasMovieDataRetreived === false">Loading...</div>
        <!-- <div v-if="props.results.length === 0">Nothing found</div> -->
        <div v-else v-for="item,index in props.results" :key="item.id">
            <MovieCard :list-arr="listDataArr" :mid="item.id" :title="item.title" :image="item.poster_path" :release-date="item.release_date" :voters="item.vote_count" :score="item.vote_average" />
        </div>
        
    </div>
</template>