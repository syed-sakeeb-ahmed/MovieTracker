<script setup>
import Search from '@/components/Search.vue'
import ListCol from '@/components/ListCol.vue';
import ListData from '@/components/ListData.vue';

import { modifiedQueryObject, queryObject } from '@/store';
import { watch, ref } from 'vue';
import { buildQuery, genresDict, languages, SECRET } from '@/utilites/jsonUtilities';
import { useRoute, useRouter } from 'vue-router'

const queryResults = ref(null)
const helloWorld = ref(null)

const route = useRoute()
const router = useRouter()

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
queryObject.language = (route.query.with_original_language) ? route.query.with_original_language : 'en'
queryObject.sort_by = (route.query.sort_by) ? route.query.sort_by : 'popularity.desc'
queryObject.with_genres = (route.query.with_genres) ? getGenresFromURL(route.query.with_genres) : []
queryObject.with_cast = (route.query.with_cast) ? getCastFromURL(route.query.with_cast) : []

//Release Date tab
queryObject.releaseDateTab = (route.query.release_date_tab) ? route.query.release_date_tab : '0'
queryObject.releaseDate = (route.query.release_date) ? route.query.release_date : null // yyyy-mm-dd format
queryObject.releaseDateMin = (route.query.release_date_min) ? route.query.release_date_min : null // yyyy-mm-dd format
queryObject.releaseDateMax = (route.query.release_date_max) ? route.query.release_date_max : null // yyyy-mm-dd format


//Scores and votes
queryObject.score = {min: null, max: null}
queryObject.vote = {min: null, max: null}

queryObject.score.min = (route.query.score_min) ? route.query.score_min : null
queryObject.score.max = (route.query.score_max) ? route.query.score_max : null
queryObject.vote.min = (route.query.vote_min) ? route.query.vote_min : null
queryObject.vote.max = (route.query.vote_max) ? route.query.vote_max : null







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