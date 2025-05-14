<script setup>
import Search from '@/components/Search.vue'
import ListCol from '@/components/ListCol.vue';
import ListData from '@/components/ListData.vue';

import { modifiedQueryObject, queryObject } from '@/store';
import { watch, ref } from 'vue';
import { createInternalQueryAndPush, buildQuery, createTMDBReleaseDateQuery, genresDict, languages, SECRET } from '@/utilites/jsonUtilities';
import { useRoute, useRouter } from 'vue-router'

const queryResults = ref(null)
const helloWorld = ref(null)

const route = useRoute()
const router = useRouter()

const url = ref('myURL')



const getQueryJSON = async (queryObject) => {
    const queryString = buildQuery(queryObject)

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + SECRET
        }
    };

    const routeQueryParams = {
        include_adult: false,
        include_video: false,
        page: 1,
        language: 'en-US',
        sort_by: null
    }

    const modifiedQueryObject = {
        include_adult: false,
        include_video: false,
        page: 1,
        language: 'en-US',
        sort_by: null
    }
    
     //const route = useRoute()
    //console.log(route.query.sorhted_by, route.query.shit, route.query.pop)
    // route.


    queryResults.value = await fetch(queryString, options)
        .then(res => res.json())
        .catch(err => { throw new Error("Failed to fetch discover information" + err) });
}


getQueryJSON(queryObject);

const fetchNextPage = () => {
    if (queryObject.page < 500) {
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
        .catch(err => { throw new Error("Failed to fetch discover information" + err) });
    helloWorld.value = hello.name
}

fetchHelloWorld()




watch(queryObject, () => {
    console.log("Query object changed: " + queryObject)
})

const handleSearch = () => {
    console.log("Search has been clicked!!!")
    url.value = "newURL"
}


</script>


<template>
    <div>
        <div class="w-[1060px] bg-yellow-300">
            New update published on local pc
        </div>
        <div class="bg-red-500">{{ helloWorld }}</div>
        <button @click="fetchNextPage" class="bg-amber-500">Next Page</button>
        <button v-if="queryObject.page > 1" @click="fetchPreviousPage"
            class="bg-amber-500">Prev
            Page</button>
        <Search @search-clicked="handleSearch"/>
        <ListCol />
        <ListData :page="queryObject.page" :search-count="queryObject.searchCount"/>

    </div>

</template>