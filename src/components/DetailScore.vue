<script setup>
import { reactive } from 'vue';


const borderStyle = reactive({
    'border': '1px solid #e5e5e5'
})

const fontStyles = reactive({
    'color': '#323232',
    'font-size': '24px',
    'font-weight': '700',
    'position': 'relative',
    'text-align': 'center',
    'font-family': 'Avenir,lucida grande,tahoma,verdana,arial,sans-serif'
})
</script>

<template>
    <div>


        <div class="flex flex-col ">
            <div class="score flex bg-[#f8f8f8] pl-[10px] pr-[10px] pt-[8px] pb-[8px]">
                <div class="flex flex-col items-center pr-[10px]" :style="fontStyles" style="border-right: 1px solid #d8d8d8">
                    <div class="font-[400] text-[10px] bg-[#a22e2e] text-white rounded-[2px] w-[60px]">SCORE</div>
                    <div class="h-[30px]">9.30</div>
                    <div class="text-[10px] font-[400] text-[#323232]">1,000,000 voters</div>
                </div>
                <div class="flex ">
                    <div>Popularity: 9.84</div>
                    <div >Votes: 1,000,000</div>
                </div>
            </div>
            <div class="options flex bg-[#f8f8f8] mt-[8px]">
                <div>Add to list</div>
                <div>Rate</div>
            </div>
        </div>
    </div>

</template>