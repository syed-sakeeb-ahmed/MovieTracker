<script setup>

import { ref, reactive, watch, computed, watchEffect } from 'vue'
import {createTMDBSearchQuery, createTMDBQuery, SECRET} from '@/utilites/jsonUtilities'
import ListCol from '@/components/ListCol.vue';
import { queryObject } from '@/store'
import MovieGrid from "./MovieGrid.vue"
import { myUserStore} from '@/authStore'

const { page, searchCount } = defineProps(['page', 'searchCount'])
const emit = defineEmits(['loadedQuery'])

const userFromStorage = myUserStore()

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

    emit('loadedQuery', queryResults.value.total_pages, queryResults.value.total_results)
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
    <div class="ml-[12px] mr-[12px]">
    <div v-if="queryResults.total_results > 0">
        <MovieGrid :results="queryResults.results" />
    </div>
    <div v-else >
    </div>
</div>


</template>