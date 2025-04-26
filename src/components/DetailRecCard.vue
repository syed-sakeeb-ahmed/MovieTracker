<script setup>
import {reactive} from 'vue'
const redColor = reactive({
    color: "#9b1c1c",
});
</script>

<template>
    <div class="recco-component-card flex grow-0 text-[11px]">
        <div class="w-[50px] h-[71px] bg-slate-300">

        </div>
        <div class="flex flex-col justify-between">
            <div :style="redColor">Title</div>
            <div>Date</div>
            <div>Voters</div>
            <div class="flex">
                <div>Add</div>
                <div>Rate</div>
            </div>
        </div>
    </div>
</template>