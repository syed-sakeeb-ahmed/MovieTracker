<script setup>
import { ref, watch } from 'vue';
import { getMatchedGenreTitlesArray, getGenreObjArray, removeNumberFromArray, getIndexFromArray, objectExistsInArray, removeObjectFromArray, getArrayFromQueryString, createGenreObjectArrayFromTitleArray } from '@/utilites/jsonUtilities';
import { useRoute } from 'vue-router';

let genreObjectArray = null
const setGenreTitleArray = async () => {
    genreObjectArray = await getGenreObjArray()
}
const setupComponent = async () => {
    await setGenreTitleArray()
    if (route.query.genres !== undefined) {
        const queryArr = getArrayFromQueryString(route.query.genres)
        const genreObjArrayFromURL = createGenreObjectArrayFromTitleArray(queryArr, genreObjectArray)
        console.log(genreObjArrayFromURL)

        selectedQueryResults.value = genreObjArrayFromURL
    }
}
setupComponent()

const isMenuOpen = ref(false)
const currentQuery = ref('')
const queryResults = ref([])
const selectedQueryResults = ref([])
const SECRET = import.meta.env.VITE_KEY
const route = useRoute()


const toggleGenreMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const toggleQueryToSelectedArray = (genreObj) => {
    if (objectExistsInArray(genreObj.id, selectedQueryResults.value)) {
        selectedQueryResults.value = removeObjectFromArray(genreObj.id, selectedQueryResults.value)
    }
    else {
        selectedQueryResults.value.push(genreObj)
    }
}

watch(currentQuery, async (newQuery, oldQuery) => {
    const regexResults = await getMatchedGenreTitlesArray(newQuery, genreObjectArray)
    //console.log(newQuery,regexResults)
    queryResults.value = regexResults
    //console.log(queryResults.value)
});



</script>

<template>
    <div class="bg-pink-300">
        <button @click="toggleGenreMenu" class="w-full">Genre</button>
        <div v-if="isMenuOpen" class="w-[446px] h-[366px] bg-blue-100">
            <input v-model="currentQuery" type="text" name="include" id="include" placeholder="Search">
            <div class="bg-amber-400">
                <ul>
                    <li @click="toggleQueryToSelectedArray(item)" v-for="item in selectedQueryResults" :key="item.id">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <div v-if="currentQuery !== ''">

                <ul>
                    <li @click="toggleQueryToSelectedArray(item)" v-for="(item) in queryResults" :key="item.id">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>