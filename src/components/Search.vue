<script setup>

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        
        <div class="flex border-2 rounded-full border-solid border-black p-3 w-[582px] h-[46px] pt-[5px] pb-[5px]">
            <div class="flex items-center">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
            </div>
        
            <input class="
            focus:outline-none w-full indent-2" type="search" id="search" name="search">
            <div class="w-[32px] h-[32px]">
                <button class="bg-red-500 rounded-full flex items-center justify-center h-[32px] w-[32px]">
                    <font-awesome-icon :icon="['fas', 'plus']" class=" text-white"/>
                </button>
            </div>
            
        </div>
        <div class="flex mt-3">
                <button class="bg-[#f3f3f3] w-[142px] h-[34px] pl-[16px] pr-[16px] m-[4px] rounded-[5px] mr-1 text-md text-[15px]">
                    Search
                </button>
                <button class="bg-[#f3f3f3] w-[142px] h-[34px] pl-[16px] pr-[16px] m-[4px] rounded-[5px] ml-1 text-[15px]">
                    I'm Feeling Lucky
                </button>
            </div>
    </div>
</template>