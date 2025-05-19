<script setup>
import Search from '@/components/Search.vue'
import ListCol from '@/components/ListCol.vue';
import ListData from '@/components/ListData.vue';

import { modifiedQueryObject, queryObject } from '@/store';
import { watch, ref } from 'vue';
import { createInternalQueryAndPush, buildQuery, createTMDBReleaseDateQuery, genresDict, languages, SECRET } from '@/utilites/jsonUtilities';
import { useRoute, useRouter } from 'vue-router'

const pageUpperLimit = ref(null)
const helloWorld = ref(null)

const router = useRouter()

const fetchNextPage = () => {
    if (queryObject.page < pageUpperLimit.value) {
        queryObject.page = queryObject.page + 1
        createInternalQueryAndPush(router, queryObject)
    }
}

const fetchPreviousPage = () => {
    if (queryObject.page > 1) {
        queryObject.page -= 1
        createInternalQueryAndPush(router, queryObject)
    }
}

const fetchHelloWorld = async () => {
    const options = {
        method: 'GET',
    };
    const hello = await fetch("http://localhost:8080/api/hello", options)
        .then(res => res.json())
        .catch(err => { throw new Error("Failed to fetch hello world information " + err) });
    helloWorld.value = hello.name
}

fetchHelloWorld()

const setPageUpperLimit = (numberOfPages) => {
    pageUpperLimit.value = numberOfPages
}



watch(queryObject, () => {
    console.log("Query object changed: " + queryObject)
})



</script>


<template>
    <div class="w-full max-w-[2000px]">
        <div class="bg-red-500">{{ helloWorld }}</div>
        <button v-if="queryObject.page < pageUpperLimit" @click="fetchNextPage" class="bg-amber-500">Next Page</button>
        <button v-if="queryObject.page > 1" @click="fetchPreviousPage"
            class="bg-amber-500">Prev
            Page</button>
        <Search/>
        <ListData @loaded-query="setPageUpperLimit" :page="queryObject.page" :search-count="queryObject.searchCount"/>

    </div>

</template>