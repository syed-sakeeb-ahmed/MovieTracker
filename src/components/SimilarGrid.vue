<script setup>
import CastCard from '@/components/CastCard.vue'
import MovieCard from '@/components/MovieCard.vue'

import {ref} from "vue"

const props = defineProps(['similarObjArray'])
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
                <MovieCard v-for="item in props.similarObjArray.slice(0,endLength)" :image="item.poster_path" :title="item.title" :release-date="item.release_date" :voters="item.vote_count" :score="item.voter_average" :key="item.cast_id" />
            </div>
            <Button v-if="similarObjArray.length > startLength" @click="toggleEndLength" :label="(endLength === startLength) ? `Show more` : `Show less`" />
        
    </div>
</template>