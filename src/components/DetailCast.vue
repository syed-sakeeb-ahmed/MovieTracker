<script setup>
import { ref, reactive } from "vue";
import DetailCastInfo from "./DetailCastInfo.vue";
const verdanaStyles = reactive({
    "font-family": "Verdana,Arial",
});
const redColor = reactive({
    color: "#9b1c1c",
});

const items = ref([
    { message: "Foo" },
    { message: "Bar" },
    { message: "Car" },
    { message: "Lar" },
    { message: "Lar" },
    { message: "Lar" },
    { message: "Lar" },
    { message: "Lar" },
    { message: "Lar" },
    { message: "Lar" },
]);
</script>

<template>
    <div class="cast bg-white" :style="verdanaStyles">
        <div class="w-full border-b-1 border-[#bebebe] flex justify-between">
            <div class="text-[12px] font-bold">Cast</div>
            <div class="text-[11px]" :style="redColor">More cast members</div>
        </div>
        <div class="gridStyle">
            <DetailCastInfo checkIndex='1' />
            <DetailCastInfo checkIndex='2' />
            <DetailCastInfo checkIndex='3' />
            <DetailCastInfo checkIndex='4' />
        </div>
    </div>
</template>


<style scoped>
.gridStyle {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>
