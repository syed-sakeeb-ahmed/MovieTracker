<script setup>
import { reactive } from 'vue';
import DetailRecCard from './DetailRecCard.vue';
const verdanaStyles = reactive({
    "font-family": "Verdana,Arial",
});
const redColor = reactive({
    color: "#9b1c1c",
});
</script>

<template>
    <div class="overview bg-white" :style="[verdanaStyles]">
        <div class="w-full border-b-1 border-[#bebebe] text-[12px] font-bold">Recommendations</div>
        <div class="recco-container-one-line flex">
            <DetailRecCard />
            <DetailRecCard />
        </div>
    </div>
</template>