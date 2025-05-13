<script setup>

import { ref, reactive,watch, Suspense, defineAsyncComponent } from 'vue';
import {createReleaseDateQuery, createScoreQuery, createGenreQuery, createCastQuery, createSortQuery, primaryLanguageQuery} from "@/utilites/jsonUtilities"
import { buildQuery, genresDict, languages, SECRET } from '@/utilites/jsonUtilities';
import {queryObject} from '@/store'
import { Form } from '@primevue/forms';

import { menuToggle } from '@/store';
import ASGenre from './ASGenre.vue';
import ASCast from './ASCast.vue';
import ASSort from './ASSort.vue';
import ASRelease from './ASRelease.vue'
import ASScore from './ASScore.vue'
import ASLanguage from './ASLanguage.vue';

import {useRoute} from 'vue-router'

const isAdvancedSearchOpen = ref(true);
const selectedOption = ref(null);


const toggleAdvancedSearch = () => {
    console.log("Toggled Advanced Search")
    isAdvancedSearchOpen.value = !isAdvancedSearchOpen.value;
}

const route = useRoute()
    console.log(route.query.sorhted_by, route.query.shit, route.query.pop)

const initialValues = reactive({
    releaseDate: route.query.rd,
    releaseDateMin: route['query']['primary_release_date.gte'],
    releaseDateMax: route['query']['primary_release_date.lte'],
    scoreMin: route['query']['vote_average.gte'],
    scoreMax: route['query']['vote_average.lte'],
    genre: {id: 12, name: 'Adventure'},
    cast: route.query.with_cast,
    sort: route.query.sort_by,
    language: route.query.with_original_language,
});

const resolver = ({ values }) => {
    const errors = {};

    if (!values.username) {
        errors.username = [{ message: 'Username is required.' }];
    }

    return {
        values, // (Optional) Used to pass current form values to submit event.
        errors
    };
};

const onFormSubmit = ({ valid }) => {
    if (valid) {
        console.log("gamer")
    }
};

const displayMenu = (menuToOpen) => {
    const options = {
        releaseDate: 0,
        genre: 1,
        cast: 2,
        sortBy: 3,
        votes: 4,
        originalLanguage: 5,
    }
    if (menuToggle.isOpen === true) {
        menuToggle.isOpen = false;
    }

    selectedOption.value = options[menuToOpen]

    menuToggle.isOpen = true

}


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
queryObject.releaseDate = (route.query.release_date) ? route.query.release_date : null // has Date object need to convert to yyyy-mm-dd value
queryObject.releaseDateMin = (route.query.release_date_min) ? route.query.release_date_min : null // has Date object need to convert to yyyy-mm-dd value
queryObject.releaseDateMax = (route.query.release_date_max) ? route.query.release_date_max : null // has Date object need to convert to yyyy-mm-dd value


//Scores and votes
queryObject.score = {min: null, max: null}
queryObject.vote = {min: null, max: null}

queryObject.score.min = (route.query.score_min) ? route.query.score_min : null
queryObject.score.max = (route.query.score_max) ? route.query.score_max : null
queryObject.vote.min = (route.query.vote_min) ? route.query.vote_min : null
queryObject.vote.max = (route.query.vote_max) ? route.query.vote_max : null


//Create query for internal use
const createQuery = (queryObject) => {
    let queryString = ""
    
    queryString += createReleaseDateQuery(queryObject)
    queryString += createScoreQuery(queryObject)
    queryString += createGenreQuery(queryObject)
    queryString += createCastQuery(queryObject)
    queryString += createSortQuery(queryObject)
    queryString += primaryLanguageQuery(queryObject)
    
    queryString = queryString.substring(0, queryString.length - 1);
    return queryString
}

const logQuery = () => {
    console.log(createQuery(queryObject))
    console.log(queryObject.with_genres)
}

watch(queryObject, () => {
    console.log(queryObject)
})

//Emit callbacks
const changeGenre = (arg) => {
    queryObject.with_genres = arg
}

const changeReleaseDate = (arg) => {
    queryObject.releaseDate = arg.toISOString().slice(0,10)
}

const changeReleaseDateMin = (arg) => {
    queryObject.releaseDateMin = arg.toISOString().slice(0,10)
}

const changeReleaseDateMax = (arg) => {
    queryObject.releaseDateMax = arg.toISOString().slice(0,10)
}

const changeReleaseDateTab = (arg) => {
    //console.log("Huh?" + arg)
    queryObject.releaseDateTab = arg
}

const changeScoreMin = (arg) => {
    //console.log("Score Min Val: " + arg)
    queryObject.score.min = arg
}

const changeScoreMax = (arg) => {
    //console.log("Score Max Val: " + arg)
    queryObject.score.max = arg
}

const changeVoteMin = (arg) => {
    //console.log("Vote Min Val: " + arg)
    queryObject.vote.min = arg
}

const changeVoteMax = (arg) => {
    //console.log("Vote Max Val: " + arg)
    queryObject.vote.max = arg
}

const changeCast = (arg) => {
    //console.log("Cast val: " + arg)
    queryObject.with_cast = arg
}

const changeSort = (arg) => {
    queryObject.sort_by = arg
}

const changeLanguage = (arg) => {
    queryObject.language = arg
}

</script>

<template>
    <div class="flex flex-col justify-center items-center">

        <div class="flex border-2 rounded-full border-solid border-black p-3 w-[582px] h-[46px] pt-[5px] pb-[5px]">
            <div class="flex items-center">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </div>

            <input class="
            focus:outline-none w-full indent-2" type="search" id="search" name="search">
            <div class="w-[32px] h-[32px]">
                <button @click="toggleAdvancedSearch"
                    class="bg-red-500 rounded-full flex items-center justify-center h-[32px] w-[32px]">
                    <font-awesome-icon :icon="['fas', 'plus']" class=" text-white" />
                </button>
            </div>

        </div>
        <div class="flex mt-3">
            <button @click="logQuery"
                class="bg-[#f3f3f3] w-[142px] h-[34px] pl-[16px] pr-[16px] m-[4px] rounded-[5px] mr-1 text-md text-[15px]">
                Search
            </button>
            <button class="bg-[#f3f3f3] w-[142px] h-[34px] pl-[16px] pr-[16px] m-[4px] rounded-[5px] ml-1 text-[15px]">
                I'm Feeling Lucky
            </button>
        </div>
        
        <div class="flex flex-col" v-if="isAdvancedSearchOpen">
            <!-- <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56"> -->
                <!-- <InputNumber name="username" type="text" placeholder="Username" class="w-full sm:w-56" /> -->
                <!-- <Fieldset legend="Form States" class="h-80 overflow-auto">
                <pre class="whitespace-pre-wrap">{{ $form }}</pre> -->
            <!-- </Fieldset> -->
            <ASRelease @value-changed-rd="changeReleaseDate" @value-changed-min="changeReleaseDateMin" @value-changed-max="changeReleaseDateMax"
            @value-changed-tab="changeReleaseDateTab"
            />
            <ASScore 
            @score-min-change="changeScoreMin"
            @score-max-change="changeScoreMax"
            @vote-min-change="changeVoteMin"
            @vote-max-change="changeVoteMax"
            />
            <ASGenre @value-changed="changeGenre"/>
            <ASCast @value-changed="changeCast"/>
            <ASSort @value-changed="changeSort"/>
            <ASLanguage @value-changed="changeLanguage"/>
            <!-- </Form> -->
        </div>
    </div>
</template>