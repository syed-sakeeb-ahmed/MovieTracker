<script setup>

import { ref, reactive, watch, computed } from 'vue'

const props = defineProps(['queryResults', 'cumulativeEntries'])

if (props.queryResults !== null) console.log(props.queryResults.results.length)


</script>

<template>
    <div v-if="props.queryResults !== null">

        <div v-for="item,index in props.queryResults.results" :key="item.id"  class="w-[1060px] flex justify-center">
            <div class=" w-[75px] h-[94px] flex items-center justify-center">
                {{ index + ((props.queryResults.page - 1) * 20) + 1 }}
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