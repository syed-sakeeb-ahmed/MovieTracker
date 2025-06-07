<script setup>
import { ref, watch } from 'vue';
import { genres, getMatchedGenreTitlesArray, getGenreObjArray, removeNumberFromArray, getIndexFromArray, objectExistsInArray, removeObjectFromArray, getGenreDetailJSON, createGenreDict, getArrayFromQueryString, createGenreObjectArrayFromTitleArray, createGenreObjectsFromIDList } from '@/utilites/jsonUtilities';
import { useRoute } from 'vue-router';
import { FormField } from '@primevue/forms';
import { queryObject } from '@/store'

const selectedArray = ref(queryObject.with_genres)


watch(() => queryObject.with_genres, () => {
    selectedArray.value = queryObject.with_genres

});

</script>

<template>
    <div>

        <MultiSelect @value-change="$emit('value-changed', selectedArray)" v-model="selectedArray" :options="genres"
            fluid optionLabel="name" filter placeholder="Select Genres" :maxSelectedLabels="3" class="w-full md:w-80" />
    </div>
</template>