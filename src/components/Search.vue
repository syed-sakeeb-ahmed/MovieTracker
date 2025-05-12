<script setup>

import { ref, reactive,watch, Suspense, defineAsyncComponent } from 'vue';
import {createReleaseDateQuery, createScoreQuery, createGenreQuery, createCastQuery, createSortQuery, primaryLanguageQuery} from "@/utilites/jsonUtilities"
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
            <ASRelease />
            <ASScore />
            <ASGenre />
            <ASCast/>
            <ASSort />
            <ASLanguage />
            <!-- </Form> -->
        </div>
    </div>
</template>