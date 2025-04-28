<script setup>
import { ref, watch } from 'vue';
import { getMatchedGenreTitlesArray, getGenreTitleArray, removeNumberFromArray, getIndexFromArray } from '@/utilites/jsonUtilities';

console.log("Calling API")
const genreTitleArray = await getGenreTitleArray()

const isMenuOpen = ref(false)
const currentQuery = ref('')
const queryResults = ref([])
const selectedQueryResults = ref([])
const SECRET = import.meta.env.VITE_KEY


const toggleGenreMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const toggleQueryToSelectedArray = (genreName) => {
    const genreIndex = getIndexFromArray(genreName, genreTitleArray)
    if (selectedQueryResults.value.includes(genreIndex)) {
        removeQueryFromSelectedArray(genreName)
    }
    else {
        selectedQueryResults.value.push(genreIndex)

    }
}

const removeQueryFromSelectedArray = (genreName) => {
    const genreIndex = getIndexFromArray(genreName, genreTitleArray)
    const newSelectedArr = removeNumberFromArray(genreIndex, selectedQueryResults.value)
    selectedQueryResults.value = newSelectedArr
}

watch(currentQuery, async (newQuery, oldQuery) => {
    const regexResults = await getMatchedGenreTitlesArray(newQuery, genreTitleArray)
    //console.log(newQuery,regexResults)
    queryResults.value = regexResults
    console.log(queryResults.value)
});


</script>

<template>
    <div class="bg-pink-300">
        <button @click="toggleGenreMenu" class="w-full">Genre</button>
        <div v-if="isMenuOpen" class="w-[446px] h-[366px] bg-blue-100">
            <input v-model="currentQuery" type="text" name="include" id="include" placeholder="Search">
            <div class="bg-amber-400">
                <ul>
                    <li @click="removeQueryFromSelectedArray(genreTitleArray[item])"
                        v-for="(item, index) in selectedQueryResults" :key="index">
                        {{ genreTitleArray[item] }}
                    </li>
                </ul>
            </div>
            <div v-if="currentQuery !== ''">

                <ul>
                    <li @click="toggleQueryToSelectedArray(item, genreTitleArray)" v-for="(item, index) in queryResults"
                        :key="index">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>