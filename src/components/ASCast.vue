<script setup>
import { ref, watch, useTemplateRef, onMounted, onUpdated, onUnmounted } from 'vue';
import { getCastObjFromQueryString, getFirstTenCastNamesAndIdsFromQuery, objectExistsInArray, removeNumberFromArray, removeObjectFromArray, SECRET } from '@/utilites/jsonUtilities';
import { queryObject } from '@/store';

const castQueryResults = ref([])
const selectedCastList = ref(queryObject.with_cast)
const maxWidth = ref(null)

const myRef = useTemplateRef('castRef')
onMounted(() => {
    // console.log("This is castRef: " + myRef.value.offsetWidth)
    maxWidth.value = myRef.value.clientWidth
})

const search = async (e) => {
    castQueryResults.value = await getFirstTenCastNamesAndIdsFromQuery(e.query)
}

watch(() => queryObject.with_cast, () => {
    selectedCastList.value = queryObject.with_cast
})


</script>

<template>
    <div ref="castRef">
        <AutoComplete @value-change="$emit('value-changed', selectedCastList)" placeholder="Select Cast" multiple fluid
            v-model="selectedCastList" optionLabel="name" :suggestions="castQueryResults" @complete="search" />
    </div>
</template>