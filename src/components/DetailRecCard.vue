<script setup>
import {reactive} from 'vue'
const redColor = reactive({
    color: "#9b1c1c",
});
</script>

<template>
    <div class="recco-component-card flex grow-0 text-[11px] mr-[30px]">
        <div class="w-[50px] h-[71px] bg-slate-300">

        </div>
        <div class="flex flex-col justify-between">
            <div class="font-bold" :style="redColor">Title</div>
            <div class="text-[#bebebe]">Date</div>
            <div class="text-[#bebebe]">Voters</div>
            <div class="flex">
                <div class="flex bg-[#9b1c1c] pl-[4px] pr-[4px] text-white justify-center items-center">
                    <span>Add</span>
                </div>
                <div class="flex ml-[2px] pl-[4px] pr-[4px] bg-[#9b1c1c] text-white justify-center items-center">
                    <span>Rate</span>
                </div>
            </div>
        </div>
    </div>
</template>