<script setup>
import { computed, reactive } from 'vue';

const props = defineProps(['checkIndex'])

//Checks whether component should be gray
const grayClass = computed(() => ({
     gray: (Math.ceil(props.checkIndex / 2) % 2 === 0),
     even: (props.checkIndex % 2 === 0),
     odd: (props.checkIndex % 2 === 0)
}))

const redColor = reactive({
    color: "#9b1c1c",
});
</script>

<template>
        <div class="h-[71px] flex border-b-[#e5e5e5] border-b-[1px]" :class="grayClass">
            <div class="w-[50px] h-[71px] p-[3px]">
                <img src="../assets/cover_image.webp" alt="Movie Recommention Image">
            </div>
            <div class="flex flex-col ml-[3px]">
                <div class="text-[11px]" :style="redColor">Cooper</div>
                <div class="text-[9px]">Matthew McConaughey</div>
            </div>
            <div class="h-full border-test"> </div>
        </div>
</template>


<style scoped>
    .gray {
        background-color: #F8F8f8;
    }
    
    .even {
        
    }

    .odd {
        
    }

    .border-test {
        
    }
</style>