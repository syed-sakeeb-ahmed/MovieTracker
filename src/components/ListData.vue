<script setup>

import { ref, reactive, watch, computed, watchEffect } from 'vue'
import {createTMDBSearchQuery, createTMDBQuery, SECRET} from '@/utilites/jsonUtilities'
import ListCol from '@/components/ListCol.vue';
import { queryObject } from '@/store'
import MovieCard from './MovieCard.vue'

const { page, searchCount } = defineProps(['page', 'searchCount'])
const emit = defineEmits(['loadedQuery'])



const queryResults = ref({total_results: 0})

watch([() => page, () => searchCount], async () => {

    let queryString = ""
    if (queryObject.searchMode === 'basic') {
        queryString = createTMDBSearchQuery(queryObject.searchToken, queryObject.page)
    }
    else {
        queryString = createTMDBQuery(queryObject)
    }

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

    emit('loadedQuery', queryResults.value.total_pages)
}, {immediate: true})

// watch(queryObject.page, async () => {
//     const queryString = createTMDBQuery(queryObject)

//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer ' + SECRET
//         }
//     };

//     queryResults.value = await fetch(queryString, options)
//         .then(res => res.json())
//         .catch(err => { throw new Error("Failed to fetch discover information" + err) });

// })
</script>

<template>
    <div>
    <div v-if="queryResults.total_results > 0">
        <div v-for="item,index in queryResults.results" :key="item.id"  class="w-[1060px] flex justify-center">
            <MovieCard :title="item.title" :image="item.poster_path" :release-date="item.release_date" :voters="vote_count" :score="item.vote_average" />
        </div>
        
    </div>
    <div v-else >
    </div>
</div>


</template>