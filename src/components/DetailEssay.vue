<script setup>
import { reactive } from 'vue';

const verdanaStyles = reactive({
    'font-family': 'Verdana,Arial',
})
</script>

<template>
    <div class="overview bg-white " :style="verdanaStyles">
        <div class="w-full border-b-1 border-[#bebebe] font-bold text-[12px]">Overview</div>
        <div class="text-[11px]">The adventures of a group of explorers who make use of a newly discovered wormhole to
            surpass
            the
            limitations on human space travel and conquer the vast distances involved in an interstellar
            voyage.
        </div>
    </div>
</template>