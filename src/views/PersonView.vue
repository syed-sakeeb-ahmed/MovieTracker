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
        <DetailTitle />
        <div class="flex ">
            <DetailInfo />

            <div class="score-container bg-green-500 w-full">
                <DetailScore />
                <DetailEssay />
                <DetailCast />
                <DetailRec />
            </div>
        </div>
    </div>
</template>