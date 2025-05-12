<script setup>
import { ref, watch, } from 'vue';
import { getCastObjFromQueryString, getFirstTenCastNamesAndIdsFromQuery, objectExistsInArray, removeNumberFromArray, removeObjectFromArray, SECRET } from '@/utilites/jsonUtilities';
import { queryObject } from '@/store';
import { useRoute, useRouter } from 'vue-router';

const isMenuOpen = ref(false)
const castInputValue = ref('')
const castQueryResults = ref([])
const selectedCastList = ref(queryObject.with_cast)

const route = useRoute()


const toggleIsMenuOpen = () => {
    //console.log("Toggled")
    isMenuOpen.value = !isMenuOpen.value
}

//CastObj = {id: xxx, name: xxx}
const toggleAddToQuery = (castObj) => {
    if (objectExistsInArray(castObj.id, selectedCastList.value)) {
        selectedCastList.value = removeObjectFromArray(castObj.id, selectedCastList.value)
    }
    else {
        selectedCastList.value.push(castObj)
    }
}


//Items for popover
const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

const selectedArray = ref(null)

const search = async (e) => {
    castQueryResults.value = await getFirstTenCastNamesAndIdsFromQuery(e.query)
}


</script>

<template>
    <div class="bg-green-500 w-[215px]">
        <AutoComplete placeholder="Select Cast" multiple fluid v-model="selectedCastList" optionLabel="name" :suggestions="castQueryResults" @complete="search" />
    </div>
</template>