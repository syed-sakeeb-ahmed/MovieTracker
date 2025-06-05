<script setup>

import { computed, ref, reactive,watch, Suspense, defineAsyncComponent, useTemplateRef, onMounted } from 'vue';
import {createInternalQueryAndPush, createReleaseDateQuery, createScoreQuery, createGenreQuery, createCastQuery, createSortQuery} from "@/utilites/jsonUtilities"
import { getRandomMovieID, buildQuery, genresDict, languages, SECRET, createInternalQuery } from '@/utilites/jsonUtilities';
import {queryObject} from '@/store'
import { Form } from '@primevue/forms';

import { menuToggle } from '@/store';
import ASGenre from './ASGenre.vue';
import ASCast from './ASCast.vue';
import ASSort from './ASSort.vue';
import ASRelease from './ASRelease.vue'
import ASScore from './ASScore.vue'
import ASLanguage from './ASLanguage.vue';
import { onClickOutside } from '@vueuse/core'
import MovieCard from './MovieCard.vue'


import {useRouter, useRoute} from 'vue-router'
const route = useRoute()
    //console.log(route.query.sorhted_by, route.query.shit, route.query.pop)
const router = useRouter()


const getSearchValue = () => {
    return queryObject.searchToken
}

const getSearchMode = () => {
    if (queryObject.searchMode === 'basic') {
        return null
    }
    else if (queryObject.searchMode === 'advanced') {
        return '0'
    }
}

const isAdvancedSearchOpen = ref(true);
const selectedOption = ref(null);
const active = ref(getSearchMode())
const sortWidth = ref()



watch(() => queryObject.searchMode, () => {
    active.value = getSearchMode()
})


const toggleAdvancedSearch = () => {
    console.log("Toggled Advanced Search")
    if (active.value === '0') {
        active.value = null
        queryObject.searchMode = 'basic'
    }
    else if (!active.value) {
        active.value = '0'
        queryObject.searchMode = 'advanced'
        searchItems.value = []
    }
}



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






const logQuery = () => {
    console.log(createInternalQuery(queryObject))
    console.log(queryObject.with_genres)
}

const isDirty = ref(false)
watch(queryObject, () => {
    const expr = (queryObject.language === 'en' && queryObject.sort_by === 'popularity.desc' && queryObject.with_genres.length === 0 && queryObject.with_cast.length === 0 && queryObject.releaseDate === null && queryObject.releaseDateMin === null && queryObject.releaseDateMax === null && queryObject.score.min === null && queryObject.score.max === null && queryObject.vote.min === null && queryObject.vote.max === null)
    if (expr === true) {
        isDirty.value = false
    }
    else if (expr === false) {
        isDirty.value = true
    }
})


const handleClearFilters = () => {
    queryObject.language = 'en' 
    queryObject.sort_by = 'popularity.desc'  
    queryObject.with_genres.length = 0 
    queryObject.with_cast.length = 0 
    queryObject.releaseDate = null 
    queryObject.releaseDateMin = null 
    queryObject.releaseDateMax = null 
    queryObject.score.min = null 
    queryObject.score.max = null 
    queryObject.vote.min = null 
    queryObject.vote.max = null 
}


watch(() => route.fullPath, () => {
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


//Page value and Search Count
queryObject.page = (route.query.page) ? Number(route.query.page) : 1
queryObject.searchCount = (route.query.search_count) ? Number(route.query.search_count) : 0

//Search mode
queryObject.searchMode = (route.query.mode) ? route.query.mode : 'basic'
queryObject.searchToken = (route.query.search) ? route.query.search : ''


}, {immediate: true})

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

const searchItems = ref([])

const clearSearchInput = () => {
    dontQuerySearch.value = false
    queryObject.searchToken = ""
}

const suggestionsIsDisplayed = ref(false)

watch(searchItems, () => {
    if (searchItems.value.length > 0) {
        suggestionsIsDisplayed.value = true
    }
    else {
        suggestionsIsDisplayed.value = false 
    }
})

watch(() => queryObject.searchToken, async () => {
    console.log(queryObject.searchToken.value)
    if (queryObject.searchToken.length === 0) {
        searchItems.value = []
    }
    if (queryObject.searchToken.length > 0 && dontQuerySearch.value === false) {
        searchItems.value = await searchQueryTMDB(queryObject.searchToken)
    }
})

const searchQueryTMDB = async (searchString) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + SECRET
        }
    };

    const query = `https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false&language=en-US&page=1`


    const searchQueryResults = await fetch(query, options)
        .then(res => res.json())
        .catch(err => { throw new Error("Failed to fetch discover information" + err) });
    return searchQueryResults.results.slice(0, 10)
}

const searchRef = useTemplateRef('searchBar')
const searchHeight = ref(null)
const searchWidth = ref(null)
const dontQuerySearch = ref(false)

onMounted(() => {
    console.log("This is searchRef height: " + searchRef.value.offsetHeight)
    searchHeight.value = searchRef.value.offsetHeight
    searchWidth.value = searchRef.value.offsetWidth
})

const normalSearchStyle = reactive({
    borderRadius: '100px',
})

const suggestionsSearchStyle = reactive({
    borderRadius: '25px 25px 0px 0px',
})

const myInput = useTemplateRef('myInput')
onClickOutside(myInput, () => {searchItems.value = []})

const inputLookupOnFocus = async () => {
    if (queryObject.searchToken.length > 0) {
        dontQuerySearch.value = false
        searchItems.value = await searchQueryTMDB(queryObject.searchToken)
    }
}

const searchClass = computed(() => ({
    searchBarEnabled: active.value === null,
    searchBarDisabled: active.value === '0'
}))

const handleSuggestionClick = (movieTitle) => {
    // alert("Handling suggestion click")
    //router.push(`/movie?id=${movieID}`) // Old functionality

    if (movieTitle !== '' || active.value) {
        dontQuerySearch.value = true
        queryObject.searchToken = movieTitle
        myInput.value.blur()
        searchItems.value = []
        queryObject.page = 1
        queryObject.searchCount += 1
        createInternalQueryAndPush(router, queryObject)
    }
}


const searchValue = computed(() => {
    return (queryObject.searchToken === '')
})

const onSearchClick = () => {
    if (queryObject.searchToken !== '' || active.value) {
        myInput.value.blur()
        dontQuerySearch.value = true
        searchItems.value = []
        queryObject.page = 1
        queryObject.searchCount += 1
        createInternalQueryAndPush(router, queryObject)
    }
}

const handleImFeelingLucky = async () => {
    const randIDObj = await getRandomMovieID()
    console.log("This is randomOBJID: " + randIDObj.id)
    if (randIDObj.id) {
        router.push(`/movie?id=${randIDObj.id}`)
    }
}

const accordionContentRef = useTemplateRef('accordionContentRef')
onMounted(() => {
    console.log("This is inner width: " + accordionContentRef.innerWidth)
})

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <Accordion
        class="w-[80%] min-w-[350px] max-w-[582px]" 
        v-model:value="active">
            <AccordionPanel value="0">
        <AccordionHeader asChild>
            <div ref="searchBar" class="flex border-[2px] relative border-solid border-[#ebebeb] pl-[6px] pr-[6px] w-[100%] h-[52px] pt-[5px] pb-[5px]" :style="[(suggestionsIsDisplayed) ? suggestionsSearchStyle : normalSearchStyle]" :class="searchClass">
            <div class="flex items-center ml-[6px]">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </div>

            <input @keydown.enter="onSearchClick" autocomplete="off" :disabled="(active === '0') ? true : false" @focus="inputLookupOnFocus" ref="myInput" class="
            focus:outline-none w-full indent-[8px]" type="text" id="search" name="search" v-model="queryObject.searchToken">
            <!-- <AutoComplete
            class="w-full"
            fluid
            optionLabel="title"
            v-model="searchValue" :suggestions="searchItems" @complete="onSearchComplete"/>
             -->
            <div class="border-r-[1px] border-[#777777] flex items-center mr-[10px]" v-if="!searchValue">
                <div class="pi pi-times ml-[10px] mr-[10px] cursor-pointer text-[#777777]" @click="clearSearchInput"></div>
            </div>
            <div class="h-full flex items-center mr-[6px]">
                <button @click="toggleAdvancedSearch"
                    class="cursor-pointer bg-red-500 rounded-full flex items-center justify-center h-[32px] w-[32px]">
                    <font-awesome-icon v-if="active === null" :icon="['fas', 'plus']" class=" text-white" />
                    <div class="pi pi-minus text-white" v-else></div>
                </button>
            </div>
        </div>
        <div class="relative">
            <div  v-if="suggestionsIsDisplayed" class="flex flex-col bg-white border-[#ebebeb] w-full border-[1px] absolute z-20" >
                <ul>
                    <li @click="handleSuggestionClick(item.title)" class="hover:bg-[#ebebeb] flex pt-[10px] pb-[10px] pl-[12px] pr-[12px]" v-for="item, index in searchItems" :key=index>
                        <div class="flex items-center">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
                </div>
                <div  :style="{webkitUserSelect: 'none', cursor: 'default'}" class="ml-[8px]">
                        {{item.title }}
                        {{ (item.release_date) ? '(' + item.release_date.slice(0,4) + ')' : '*Undated*'}}
                </div>
                    </li>
                </ul>
                <div class=" flex justify-center mt-[15px] mb-[15px]">
                    <Button @click="onSearchClick" class="mr-[10px]" variant="outlined" label="Search"/>
                    <Button @click="handleImFeelingLucky" class="ml-[10px]" variant="outlined" label="I'm Feeling Lucky"/>
                </div>
                </div>
        </div>
        </AccordionHeader>
        <AccordionContent ref="accordionContentRef">
            <div class="flex flex-col gap-[10px] h-[350px] mt-[20px]">
            <!-- <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56"> -->
                <!-- <InputNumber name="username" type="text" placeholder="Username" class="w-full sm:w-56" /> -->
                <!-- <Fieldset legend="Form States" class="h-80 overflow-auto">
                <pre class="whitespace-pre-wrap">{{ $form }}</pre> -->
            <!-- </Fieldset> -->
            <ASRelease
            
            @value-changed-rd="changeReleaseDate" @value-changed-min="changeReleaseDateMin" @value-changed-max="changeReleaseDateMax"
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
            <Button v-if="isDirty" variant="outlined" @click="handleClearFilters" label="Clear Filters" /> 
            <!-- </Form> -->
        </div>
        </AccordionContent>
    </AccordionPanel>
        </Accordion>
       
        
        
        

        <div v-if="!suggestionsIsDisplayed" class="flex mt-[10px]" >
            <Button class="mr-[5px]" variant="outlined" @click="onSearchClick" label="Search" /> 
                <Button class="ml-[5px]" variant="outlined" label="I'm Feeling Lucky" @click="handleImFeelingLucky" /> 
        </div>

    </div>
</template>