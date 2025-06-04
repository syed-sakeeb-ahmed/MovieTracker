<script setup>
import DetailTitle from '@/components/DetailTitle.vue';
import DetailInfo from '@/components/DetailInfo.vue';
import DetailScore from '@/components/DetailScore.vue'
import DetailEssay from '@/components/DetailEssay.vue';
import DetailCast from '@/components/DetailCast.vue';
import DetailRec from '@/components/DetailRec.vue';
import CastCard from '@/components/CastCard.vue'
import CastGrid from '@/components/CastGrid.vue'
import SimilarGrid from '@/components/SimilarGrid.vue'
import {useRouter, useRoute} from 'vue-router'
import {ref, watch, onMounted} from 'vue'
import {SECRET, checkIfInUserList, getMovieData} from '@/utilites/jsonUtilities'
import AddToListButton from '/src/components/AddToListButton.vue'
import { myUserStore} from '@/authStore'


const items = [1,2,3,4,5]

const status = ref(null)
const rating = ref(null)

const route = useRoute()
let movieID = (route.query.id) ? route.query.id : undefined
const queryResults = ref(null)
console.log(movieID)
const imageBaseURL = ref('https://image.tmdb.org/t/p/w500')

const fetchMovieData = async (movieID) => {

    const queryString = `https://api.themoviedb.org/3/movie/${movieID}?append_to_response=similar%2Ccredits&language=en-US`

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + SECRET
        }
    };

    queryResults.value = await fetch(queryString, options)
        .then(res => res.json())
        .catch(err => { throw new Error("Failed to fetch discover information" + err) });
}


//Get user object
const userFromStorage = myUserStore()
const user = JSON.parse(userFromStorage.user)
 

 //Fetch Movie Card Data
 const uid = (user) ? user.uid : 'null'
const listDataArr = ref([])
const hasMovieDataRetreived = ref(false)

 const getUserListData = async (uid) => {
    listDataArr.value = await getMovieData(uid)
    hasMovieDataRetreived.value = true
 }
 
 getUserListData(uid);


const handleRatingValue = (emittedRating) => {
    rating.value = emittedRating
}


watch(() => route.query.id, async () => {
    movieID = (route.query.id) ? route.query.id : undefined
    fetchMovieData(movieID)
}, {immediate: true})

// watch(queryResults, () => {
// //     {
// //   "page": 1,
// //   "results": [],
// //   "total_pages": 1,
// //   "total_results": 0
// // }
//     if (queryResults.value) {
//         console.log( queryResults.value.similar.results.length === 0)
//     } 
// })

</script>

<template>
    <div v-if="queryResults !== null && hasMovieDataRetreived !== false" class="flex flex-col m-[10px]">
        <div :style="{maxWidth: '1400px'}" class="movieContainer">
            <div class="flex justify-center items-start">
                <!-- <img class="imageBlur w-full" src='/src/assets/image_not_found.png' width="250px"/> -->
                <img v-if="queryResults.poster_path" :src="imageBaseURL + queryResults.poster_path" :alt="`Image for ${queryResults.title}`" width="500px" class="bigMoviePhoto"/>
                <img v-else src="/src/assets/image_not_found.png" class="w-[500px] bigMoviePhoto"/>
            </div>
            <div class="flex flex-col">
                <div class="flex text-[44px] font-bold">
                    {{ queryResults.title}}
                </div>
                
                    <span>{{`Release date: ` + queryResults.release_date}}</span>
                    <span>{{`Runtime: ` + queryResults.runtime + ` minutes`}}</span>
                    <span>Genres: <span v-for="item,index in queryResults.genres" :key="index">{{item.name}}<span v-if="index !== queryResults.genres.length - 1">, </span></span></span>
                
                <div class="flex items-center">
                    <img src="/src/assets/Star_ON.svg" />
                    {{queryResults.vote_average.toFixed(2)}}
                    <img v-if="rating"  src="/src/assets/Star_RED.svg" />
                    {{(rating) ? rating : ""}}
                    | Votes: {{queryResults.vote_count}}
                </div>
                <AddToListButton @rating-value="handleRatingValue" :myListData="listDataArr" :queryResults="queryResults" />
                <div>
                    <p class="text-[32px] font-bold">Overview</p>
                    <p>{{queryResults.overview}}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
                <p class="text-[32px] font-bold">Cast</p>
                <CastGrid v-if="queryResults.credits.cast.length > 0" :cast-obj-array="queryResults.credits.cast" />
                <p v-else class="text-[30px] font">Nothing here...</p>
            </div>
        <div class="flex flex-col">
            <p class="text-[32px] font-bold">Similar</p>
                <SimilarGrid :list-data-arr="listDataArr" v-if="queryResults.similar.results.length > 0"  :similar-obj-array="queryResults.similar.results" />
            <p v-else class="text-[30px] font">Nothing here...</p>
        </div>
    </div>
    <div class="h-full flex items-center" v-else><ProgressSpinner /></div>

</template>