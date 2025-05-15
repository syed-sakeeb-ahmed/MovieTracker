<script setup>
import { ref, watch, } from 'vue';
import { getCastObjFromQueryString, getFirstTenCastNamesAndIdsFromQuery, objectExistsInArray, removeNumberFromArray, removeObjectFromArray, SECRET } from '@/utilites/jsonUtilities';
import { queryObject } from '@/store';

const castQueryResults = ref([])
const selectedCastList = ref(queryObject.with_cast)


const search = async (e) => {
    castQueryResults.value = await getFirstTenCastNamesAndIdsFromQuery(e.query)
}

watch(() => queryObject.with_cast, () => {
    selectedCastList.value = queryObject.with_cast
})


</script>

<template>
    <div class="bg-green-500 w-[215px]">
        <AutoComplete @value-change="$emit('value-changed', selectedCastList)" placeholder="Select Cast" multiple fluid v-model="selectedCastList" optionLabel="name" :suggestions="castQueryResults" @complete="search" />
    </div>
</template>