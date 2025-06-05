<script setup>
import {getMovieCardInfo} from '/src/getMovieCardInfo'
import { BASE_URL, jt } from '/src/utilites/jsonUtilities'
import { myUserStore} from '@/authStore'
import { ref } from 'vue'
import MovieCard from '/src/components/MovieCard.vue'

const results = ref([])
const sortedResults = ref([])
const listDataArr = ref([])

const userFromStorage = myUserStore()
const user = JSON.parse(userFromStorage.user)
 
const uid = (user) ? user.uid : 'null'

const getListData = async () => {
    const {data: data1} = await getMovieCardInfo(BASE_URL + `getHasMovie/${uid}`)
    if (data1.value !== null) {
        listDataArr.value = data1.value //Will get HTTP.OK and empty array if uid does not exist
    }
    const {data: data2} = await getMovieCardInfo(BASE_URL + `getHasMoviePopulated/${uid}`)
    results.value = data2.value
    // results.value = data.value
    // const completedArray = []
    // const plannedArray = []
    // for (const item of results.value) {
    //     if (item.movie_status === "Completed") {
    //         completedArray.push(item)
    //     }
    //     else if (item.movie_status === "Plan to Watch") {
    //         plannedArray.push(item)
    //     }
    // }
    // sortedResults.value = completedArray.concat(plannedArray)
    // console.log("This is sorted results: " + JSON.stringify(sortedResults.value))
}

getListData();


const deleteFromRealTimeList = (id) => {
    //console.log("Delete from real time list")
    for (let i = 0; i < results.value.length; i++) {
        if (results.value[i][jt.mid] === id) {
            results.value.splice(i, 1)
            return
        }
    }
}
</script>

<template>
    <div v-if="results.length === 0" class="h-full flex items-center"><ProgressSpinner /></div>
    <div v-else-if="results.length > 0" class="listGrid w-full mt-[50px]">
        <div v-for="item,index in results" :key="item[jt.mid]">
            <MovieCard @delete-from-list="deleteFromRealTimeList" :list-arr="listDataArr" :mid="item[jt.mid]" :title="item[jt.title]" :image="item[jt.poster_path]" :release-date="item[jt.release_date]" :voters="item[jt.votes]" :score="item[jt.rating]" />
        </div>
    </div>
</template>