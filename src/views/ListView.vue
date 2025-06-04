<script setup>
import Search from '@/components/Search.vue'
import ListCol from '@/components/ListCol.vue';
import ListData from '@/components/ListData.vue';

import { modifiedQueryObject, queryObject } from '@/store';
import { watch, ref, computed } from 'vue';
import { BASE_URL, createInternalQueryAndPush, buildQuery, createTMDBReleaseDateQuery, genresDict, languages, SECRET } from '@/utilites/jsonUtilities';
import { useRoute, useRouter } from 'vue-router'

const pageUpperLimit = ref(null)
const helloWorld = ref(null)


const router = useRouter()
const route = useRoute()

const fetchNextPage = () => {
    if (queryObject.page < pageUpperLimit.value) {
        queryObject.page = queryObject.page + 1
        createInternalQueryAndPush(router, queryObject)
    }
}

const fetchPreviousPage = () => {
    if (queryObject.page > 1) {
        queryObject.page -= 1
        createInternalQueryAndPush(router, queryObject)
    }
}

const first = ref(1)
const upPaginator = () => {
    first.value += 10;
}

const fetchHelloWorld = async () => {
    const options = {
        method: 'GET',
    };
    const hello = await fetch(`${BASE_URL}api/hello`, options)
        .then(res => res.json())
        .catch(err => { throw new Error("Failed to fetch hello world information " + err) });
    helloWorld.value = hello.name
}

fetchHelloWorld()


const totalRecords = ref(0)
const setPageUpperLimit = (numberOfPages, totalResults) => {
    console.log("Set page upper limit ran")
    pageUpperLimit.value = numberOfPages
    totalRecords.value = totalResults
}

const handlePageChange = (page) => {
    // {"page":3,"first":30,"rows":10,"pageCount":12}
    // console.log('gamer ' + JSON.stringify(page))
    queryObject.page = page.page + 1
    createInternalQueryAndPush(router, queryObject)
}


watch(queryObject, () => {
    console.log("Query object changed: " + queryObject)
})

watch((totalRecords), () => {
    console.log("This is total records: " + totalRecords.value)
})

const searchNotMade = computed(() => ({
    searchNotMade: totalRecords.value === 0,
}))

const searchMade = computed(() => ({
    searchMade: totalRecords.value !== 0,
}))

const isPaginatorVisible = ref(false)
const handlePaginatorView = (value) => {
    isPaginatorVisible.value = value
}

</script>


<template>
    <div :class="searchNotMade" class="w-full max-w-[2000px] flex flex-col">
        <!-- <div class="bg-red-500">{{ helloWorld }}</div> -->
         <!-- <div>Well, {{ helloWorld }}</div> -->
        <Search :class="searchMade"/>
        <Paginator v-if="isPaginatorVisible" class="mb-[20px]" :alwaysShow="false" :first="(queryObject.page - 1) * 20 + 1" :rows="20" :totalRecords="totalRecords" @page="handlePageChange" />
        <ListData @has-movie-data-loaded="handlePaginatorView" @loaded-query="setPageUpperLimit" :page="queryObject.page" :search-count="queryObject.searchCount"/>
        <Paginator v-if="isPaginatorVisible" class="mt-[20px]" :alwaysShow="false" :first="(queryObject.page - 1) * 20 + 1" :rows="20" :totalRecords="totalRecords" @page="handlePageChange" />

    </div>

</template>