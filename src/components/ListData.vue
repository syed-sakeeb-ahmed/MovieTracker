<script setup>

import { ref, reactive, watch, computed, watchEffect } from 'vue'
import { createTMDBSearchQuery, createTMDBQuery, SECRET } from '@/utilites/jsonUtilities'
import ListCol from '@/components/ListCol.vue';
import { queryObject } from '@/store'
import MovieGrid from "./MovieGrid.vue"
import { myUserStore } from '@/authStore'
import { useRoute } from 'vue-router'

const { page, searchCount } = defineProps(['page', 'searchCount'])
const emit = defineEmits(['loadedQuery', 'hasMovieDataLoaded'])

const userFromStorage = myUserStore()

const route = useRoute()

const queryResults = ref({ total_results: -1 })

watch(() => route.fullPath, async () => {
    if (route.fullPath === '/list' || route.fullPath === '/list/') {
        // console.log("This is route full path: " + route.fullPath)
        queryResults.value = { total_results: -1 }
        // console.log("This is queryResults value: " + JSON.stringify(queryResults.value))
        emit('loadedQuery', 0, 0)

    }
    else {


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
        // console.log("Else statement in ListData.vue")
        emit('loadedQuery', queryResults.value.total_pages, queryResults.value.total_results)
    }
}, { immediate: true })

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


const handleMovieDataLoaded = (value) => {
    // console.log("Inside list data: " + value)
    emit('hasMovieDataLoaded', value)
}
</script>

<template>
    <div class="ml-[12px] mr-[12px]">
        <div v-if="queryResults.total_results > 0">
            <MovieGrid @movie-data-loaded="handleMovieDataLoaded" :results="queryResults.results" />
        </div>
        <div class="mt-[100px] flex justify-center items-center text-[34px]"
            v-else-if="queryResults.total_results === 0">
            Nothing found
        </div>
        <div v-else></div>
    </div>


</template>