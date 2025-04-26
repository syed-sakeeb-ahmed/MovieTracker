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
        <div class="h-[71px] flex" :class="grayClass">
            <div class="w-[50px] h-[71px] bg-slate-300"></div>
            <div class="flex flex-col">
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