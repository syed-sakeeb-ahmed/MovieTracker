<script setup>
import { reactive } from "vue";
const verdanaStyles = reactive({
    "font-family": "Verdana,Arial",
});
</script>

<template>
    <div class="flex flex-col text-[11px]" :style="verdanaStyles">
        <div class="w-[225px] h-[318px] bg-slate-300 shrink-0"></div>
        <div>Known for: sfsdfsdfsd</div>
        <div>Known for: sfsdfsdfsd</div>
        <div>Known for: sfsdfsdfsd</div>
        <div>Known for: sfsdfsdfsd</div>
    </div>
</template>
