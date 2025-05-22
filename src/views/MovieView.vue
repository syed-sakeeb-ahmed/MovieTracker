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
import {ref, watch} from 'vue'
import {SECRET} from '@/utilites/jsonUtilities'


const items = [1,2,3,4,5]

const route = useRoute()
const movieID = (route.query.id) ? route.query.id : undefined
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

watch(() => movieID, async () => {
    fetchMovieData(movieID)
}, {immediate: true})


</script>

<template>
    <div v-if="queryResults === null">Loading...</div>
    <div v-else class="flex flex-col">
        <div class="movieContainer">
            <div class="flex justify-center">
                <!-- <img class="imageBlur w-full" src='/src/assets/image_not_found.png' width="250px"/> -->
                <img v-if="queryResults.poster_path" :src="imageBaseURL + queryResults.poster_path" :alt="`Image for ${queryResults.title}`" width="500px"/>
                <img v-else src="/src/assets/image_not_found.png" class="w-[185px]"/>
            </div>
            <div class="flex flex-col">
                <div class="flex text-[44px] font-bold">
                    {{ queryResults.original_title}}
                </div>
                
                    <span>{{`Release date: ` + queryResults.release_date}}</span>
                    <span>{{`Runtime: ` + queryResults.runtime + ` minutes`}}</span>
                    <span>Genres: <span v-for="item,index in queryResults.genres" :key="index">{{item.name}}<span v-if="index !== queryResults.genres.length - 1">, </span></span></span>
                
                <div class="flex items-center">
                    <img src="/src/assets/STAR_ON.svg" />
                    {{queryResults.vote_average.toFixed(2)}}
                </div>
                <div>
                    <p class="text-[32px] font-bold">Overview</p>
                    <p>{{queryResults.overview}}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
                <p class="text-[32px] font-bold">Cast</p>
                <CastGrid :cast-obj-array="queryResults.credits.cast" />
            </div>
        <div class="flex flex-col">
            <p class="text-[32px] font-bold">Similar</p>
                <SimilarGrid :similar-obj-array="queryResults.similar.results" />
        </div>
    </div>
</template>