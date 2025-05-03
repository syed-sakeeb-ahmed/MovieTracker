<script setup>
import { ref, watch, } from 'vue';
import { getCastObjFromQueryString, getFirstTenCastNamesAndIdsFromQuery, objectExistsInArray, removeNumberFromArray, removeObjectFromArray, SECRET } from '@/utilites/jsonUtilities';
import { queryObject } from '@/store';
import { useRoute, useRouter } from 'vue-router';

const isMenuOpen = ref(false)
const castInputValue = ref('')
const castQueryResults = ref({})
const selectedCastList = ref([])

const route = useRoute()

const getParamsFromQueryString = async () => {
    if (route.query.with_cast !== undefined) {
        /*
            getCastObjs
            set that shit to selectedCastList
        */
        const castObjArrFromURL = await getCastObjFromQueryString(route.query.with_cast)
        selectedCastList.value = (castObjArrFromURL)
    }
}

getParamsFromQueryString()


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



watch(castInputValue, async (newInputValue, oldInputValue) => {
    castQueryResults.value = await getFirstTenCastNamesAndIdsFromQuery(newInputValue)
})

</script>

<template>
    <div class="bg-green-500">
        <button class="w-full" @click="toggleIsMenuOpen">Cast</button>
        <div class="bg-slate-300 w-[446px] h-[366px]" v-if="isMenuOpen">
            <input v-model="castInputValue" type="text" name="cast" id="cast" placeholder="Search">
            <div class="bg-pink-500" v-if="selectedCastList.length > 0">
                <ul>
                    <li @click="toggleAddToQuery(item)" v-for="item in selectedCastList" :key="item.id">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <div v-if="castQueryResults.length > 0">
                <ul>
                    <li @click="toggleAddToQuery(item)" v-for="item in castQueryResults" :key="item.id">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>