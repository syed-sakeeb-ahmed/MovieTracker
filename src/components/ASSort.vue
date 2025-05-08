<script setup>
import { sortOptionsArr } from '@/utilites/jsonUtilities';
//console.log(sortOptionsArr)
</script>

<template>
    <div>
        <select name="sort" id="sort">
            <option value="">Sort by</option>
            <option :selected="item === 'popularity.desc' ? true : false" v-for="item,index in sortOptionsArr" :key="index" value="item">
                {{ item }}
            </option>
        </select>
    </div>
</template>