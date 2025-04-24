<script setup>
</script>

<template>
    <div class="w-[1060px] flex justify-center">
        <div class=" w-[75px] h-[94px] flex items-center justify-center">
            1
        </div>
        <div class=" w-[645px] h-[94px] flex pt-[12px] pb-[12px]">
            <div class="w-[50px] h-[70px] bg-slate-300 ml-[12px] mr-[8px]">

            </div>
            <div class="flex flex-col">
                <div>
                    Interstellar
                </div>
                <div>
                    Sep 2023
                </div>
                <div>
                    1,000,000 voters
                </div>
            </div>

        </div>
        <div class=" w-[97px] h-[94px] flex justify-center items-center pt-[12px] pb-[12px]">
            <img src="../assets/Star_ON.svg" alt="Star_ON">
            <span>9.8</span>
        </div>
        <div class=" w-[97px] h-[94px] flex justify-center items-center pt-[12px] pb-[12px]">
            <img src="../assets/Star_OFF.svg" alt="Star_OFF">
            <span>N/A</span>
        </div>
        <div class=" w-[123px] h-[94px] flex justify-center items-center">
            <select name="status" id="status" class="p-[4px] ml-[13px] mr-[13px]">
                <option value="">Select</option>
                <option value="">Plan to Watch</option>
                <option value="">Completed</option>
            </select>
        </div>
    </div>

</template>