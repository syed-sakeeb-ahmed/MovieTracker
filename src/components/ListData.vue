<script setup>

import { ref, reactive, watch, computed, watchEffect } from 'vue'
import {createTMDBQuery, SECRET} from '@/utilites/jsonUtilities'

import { queryObject } from '@/store'

const { page, searchCount } = defineProps(['page', 'searchCount'])
const emit = defineEmits(['loadedQuery'])


const queryResults = ref(null)

watch([() => page, () => searchCount], async () => {
    const queryString = createTMDBQuery(queryObject)

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
    <div v-if="queryResults !== null">

        <div v-for="item,index in queryResults.results" :key="item.id"  class="w-[1060px] flex justify-center">
            <div class=" w-[75px] h-[94px] flex items-center justify-center">
                {{ index + ((queryResults.page - 1) * 20) + 1 }}
            </div>
            <div class=" w-[645px] h-[94px] flex pt-[12px] pb-[12px]">
                <div class="w-[50px] h-[70px] bg-slate-300 ml-[12px] mr-[8px]">
                </div>
                <div class="flex flex-col">
                    <div>
                        {{item.title}}
                    </div>
                    <div>
                        {{ item.release_date }}
                    </div>
                    <div>
                         {{ item.vote_count }}
                    </div>
                </div>
    
            </div>
            <div class=" w-[97px] h-[94px] flex justify-center items-center pt-[12px] pb-[12px]">
                <img src="../assets/Star_ON.svg" alt="Star_ON">
                <span>{{ Number.parseFloat(item.vote_average).toFixed(2) }}</span>
            </div>
            <div class=" w-[97px] h-[94px] flex justify-center items-center pt-[12px] pb-[12px]">
                <img src="../assets/Star_OFF.svg" alt="Star_OFF">
                <span>N/A</span>
            </div>
            <div class=" w-[123px] h-[94px] flex justify-center items-center">
                <select :name="'status' + item.id" :id="'status' + item.id" class="p-[4px] ml-[13px] mr-[13px]">
                    <option value="">Select</option>
                    <option value="">Plan to Watch</option>
                    <option value="">Completed</option>
                </select>
            </div>
        </div>
    </div>

</template>