<script setup>
import { reactive } from 'vue';


const borderStyle = reactive({
    'border': '1px solid #e5e5e5'
})
const avenirStyles = reactive({
    'font-family': 'Avenir,lucida grande,tahoma,verdana,arial,sans-serif',
})
const fontStyles = reactive({
    'color': '#323232',
    'font-size': '24px',
    'font-weight': '700',
    'position': 'relative',
    'text-align': 'center',
    'font-family': 'Avenir,lucida grande,tahoma,verdana,arial,sans-serif'
})

const fontStylesRight = reactive({
    'color': '#323232',
    'font-size': '16px',
    'font-family': 'Avenir,lucida grande,tahoma,verdana,arial,sans-serif'
})
</script>

<template>
    <div>


        <div class="flex flex-col ">
            <div class="score flex bg-[#f8f8f8] pl-[10px] pr-[10px] pt-[8px] pb-[8px]">
                <div class="flex flex-col items-center pr-[10px]" :style="fontStyles"
                    style="border-right: 1px solid #d8d8d8">
                    <div class="font-[400] text-[10px] bg-[#a22e2e] text-white rounded-[2px] w-[60px]">SCORE</div>
                    <div class="h-[30px]">9.30</div>
                    <div class="text-[10px] font-[400] text-[#323232]">1,000,000 voters</div>
                </div>
                <div class="flex flex-col justify-between ml-[12px]">
                    <div class="flex" :styles="fontStylesRight">
                        <div>Popularity: <span class="font-bold">9.84</span></div>
                        <div class="ml-[25px]">Votes: <span class="font-bold">1,000,000</span></div>
                    </div>
                    <div class="text-[10px] text-[#9b1c1c]" :style="avenirStyles">
                        <span class="border-r-[1px] border-r-[#d8d8d8] pr-[10px]">Feb 2023</span>
                        <span class="ml-[10px]">Movie</span>
                    </div>
                </div>
            </div>
            <div class="options flex bg-[#f8f8f8] mt-[8px] pl-[10px] pt-[6px] pb-[6px]">
                <div
                    class="flex items-center justify-center bg-[#c84f4f] border-[#c84f4f] border-[1px] text-[11px] text-center pl-[10px] pr-[10px] pt-[5px] pb-[5px] shrink-0 rounded-[4px]">
                    <span class="bg-white rounded-[2px] w-[11px] h-[11px] flex justify-center items-center"><svg
                            width="5" height="5" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 0.5V6.25M5.5 12V6.25M5.5 6.25H11M5.5 6.25H0" stroke="#D84040"
                                stroke-width="2" />
                        </svg>
                    </span>
                    <span class="ml-[5px] text-white" :style="avenirStyles">Add to My List</span>
                </div>
                <div class="bg-blue-400 ml-[7px] w-[130px] h-[28px] rounded-[2px] border-[1px] border-[#bebebe] flex justify-end items-center">
                    <select class="bg-white text-[#a22e2e] rounded-[2px] flex text-[11px] w-full h-full" name="rating" id="rating">
                        <option value="">Select</option>
                    </select>
                    <img :style="{position: 'absolute', marginRight: '20px', marginBottom: '2px', pointerEvents: 'none'}" class="w-[15px] h-[15px]" src="../assets/Rating_Star.svg" alt="Star_ON">
                </div>
            </div>
        </div>
    </div>

</template>


<style scoped>

</style>