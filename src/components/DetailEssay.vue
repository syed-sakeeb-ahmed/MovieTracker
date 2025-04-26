<script setup>
import { reactive } from 'vue';

const verdanaStyles = reactive({
    'font-family': 'Verdana,Arial',
})
</script>

<template>
    <div class="overview bg-white " :styles="verdanaStyles">
                    <div class="w-full border-b-4 border-black">Overview</div>
                    <div>The adventures of a group of explorers who make use of a newly discovered wormhole to surpass
                        the
                        limitations on human space travel and conquer the vast distances involved in an interstellar
                        voyage.
                    </div>
                </div>
</template>