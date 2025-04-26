<script setup>
import DetailTitle from '@/components/DetailTitle.vue';
import DetailInfo from '@/components/DetailInfo.vue';
import DetailScore from '@/components/DetailScore.vue'
import DetailEssay from '@/components/DetailEssay.vue';
import DetailCast from '@/components/DetailCast.vue';
import DetailRec from '@/components/DetailRec.vue';
</script>

<template>
    <div class="w-[1060px] flex flex-col">
        <DetailTitle>Interstellar</DetailTitle>
        <div class="flex ">
            <DetailInfo class="pr-[3px]"/>

            <div class="score-container bg-white w-full pl-[5px] border-l-1 border-l-[#bebebe]">
                <DetailScore class="pb-[16px]"/>
                <DetailEssay />
                <DetailCast />
                <DetailRec />
            </div>
        </div>
    </div>
</template>