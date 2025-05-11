<script setup>
import Search from '@/components/Search.vue'
import ListCol from '@/components/ListCol.vue';
import ListData from '@/components/ListData.vue';

import { modifiedQueryObject, queryObject } from '@/store';
import { watch, ref } from 'vue';
import { buildQuery, genresDict, SECRET } from '@/utilites/jsonUtilities';
import { useRoute, useRouter } from 'vue-router'

const queryResults = ref(null)
const helloWorld = ref(null)

const route = useRoute()

const getGenresFromURL = (genreQueryString) => {
    const jsonArr = "[" + genreQueryString + "]"
    const arr = JSON.parse(jsonArr)
    const outputArr = []
    for (const item of arr) {
        outputArr.push(genresDict[item])
    }
    return outputArr
}

const getCastFromURL = (castQueryString) => {
    const splitArr = castQueryString.split(',')
    const outputArr = []
    for (const item of splitArr) {
        const localArr = item.split(':')
        const localObj = {id: localArr[0], name: localArr[1]}
        outputArr.push(localObj)
    }
    return outputArr
}

//Setup query object on load
queryObject.language = (route.query.with_original_language) ? route.query.with_original_language : 'en-US'
queryObject.sort_by = (route.query.sort_by) ? route.query.sort_by : 'popularity.desc'
queryObject.with_genres = (route.query.with_genres) ? getGenresFromURL(route.query.with_genres) : []
queryObject.with_cast = (route.query.with_cast) ? getCastFromURL(route.query.with_cast) : []
queryObject.releaseDateTab = (route.query.release_date_tab) ? route.query.release_date_tab : '0'

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
    queryObject.page = queryObject.page + 1
    getQueryJSON(queryObject)
}

const fetchPreviousPage = () => {
    queryObject.page = queryObject.page - 1
    getQueryJSON(queryObject)
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


</script>


<template>
    <div>
        <div class="w-[1060px] bg-yellow-300">
            New update published on local pc
        </div>
        <div class="bg-red-500">{{ helloWorld }}</div>
        <button @click="fetchNextPage" class="bg-amber-500">Next Page</button>
        <button v-if="queryResults !== null && queryResults.page !== 1" @click="fetchPreviousPage"
            class="bg-amber-500">Prev
            Page</button>
        <Search />
        <ListCol />
        <ListData :query-results="queryResults" />

    </div>

</template>