<script setup>
import CastCard from '@/components/CastCard.vue'
import {ref} from "vue"

const props = defineProps(['castObjArray'])
const startLength = ref(8)
const endLength = ref(startLength.value)

const toggleEndLength = () => {
    if (endLength.value === startLength.value) {
        endLength.value = props.castObjArray.length
    }
    else if (endLength.value !== startLength.value) {
        endLength.value = startLength.value
    }
}
</script>

<template>
    <div>
        
            <div class="castCardContainer">
                <CastCard v-for="item in props.castObjArray.slice(0,endLength)" :castName="item.name" :castCharacterName="item.character" :castImage="item.profile_path" :key="item.cast_id" />
                <!-- <CastCard v-for="item in castObjArray.slice(8,)" :key="item.cast_id" /> -->
            </div>
            <div class="castCardContainerPanel">
                    
            </div>
            <Button class="mt-[10px] mb-[10px]" v-if="castObjArray.length > 8" @click="toggleEndLength" :label="(endLength === startLength) ? `Show More` : `Show less`" />
        
    </div>
</template>