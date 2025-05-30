<script setup>
import CastCard from '@/components/CastCard.vue'
import MovieCard from '@/components/MovieCard.vue'

import {ref} from "vue"

const props = defineProps(['similarObjArray', 'listDataArr'])
const startLength = ref(5);
const endLength = ref(startLength.value)

const toggleEndLength = () => {
    if (endLength.value === startLength.value) {
        endLength.value = props.similarObjArray.length
    }
    else if (endLength.value !== startLength.value) {
        endLength.value = startLength.value
    }
}

console.log(props.similarObjArray)
</script>

<template>
    <div>
        
            <div class="castCardContainer">
                <MovieCard :list-arr="props.listDataArr" v-for="item in props.similarObjArray.slice(0,endLength)" :mid="item.id" :image="item.poster_path" :title="item.title" :release-date="item.release_date" :voters="item.vote_count" :score="item.vote_average" :key="item.cast_id" />
            </div>
            <Button class="mt-[20px]" v-if="similarObjArray.length > startLength" @click="toggleEndLength" :label="(endLength === startLength) ? `Show more` : `Show less`" />
        
    </div>
</template>