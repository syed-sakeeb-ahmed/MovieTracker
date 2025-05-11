<script setup>
import { ref, watch } from 'vue';
import { genres, getMatchedGenreTitlesArray, getGenreObjArray, removeNumberFromArray, getIndexFromArray, objectExistsInArray, removeObjectFromArray, getGenreDetailJSON, createGenreDict, getArrayFromQueryString, createGenreObjectArrayFromTitleArray, createGenreObjectsFromIDList } from '@/utilites/jsonUtilities';
import { useRoute } from 'vue-router';
import { FormField } from '@primevue/forms';
import {queryObject} from '@/store'


let genreObjectArray = ref(genres)


const setGenreTitleArray = async () => {
    const temp = await getGenreDetailJSON()
    genreObjectArray = temp.genres
}
//setGenreTitleArray()

const route = useRoute()
const selectedArray = ref(queryObject.with_genres)

const getDataFromURL = async () => {
    if (route.query.with_genres !== undefined) {
        const genreJSON = await getGenreDetailJSON()
      const genreDict = createGenreDict(genreJSON)
      const idList = getArrayFromQueryString(route.query.with_genres)
      const selectedGenreObjectsFromURL = createGenreObjectsFromIDList(idList, genreDict)
    selectedQueryResults.value = selectedGenreObjectsFromURL
    }
}
//getDataFromURL()

const selectedQueryResults = ref([])


watch(selectedArray, async (newQuery, oldQuery) => {
    for (const val of selectedArray.value)
{
    console.log(val)
}
    
});

//Items for popover
const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

</script>

<template>
    <div>
        
            <MultiSelect v-model="selectedArray" :options="genres" fluid optionLabel="name" filter placeholder="Select Genres"
            :maxSelectedLabels="3" class="w-full md:w-80" />
    </div>
</template>