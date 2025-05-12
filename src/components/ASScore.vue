<script setup>
import { queryObject } from '@/store';
import { reactive, ref, watch } from 'vue';

const score = reactive(queryObject.score)
const vote = reactive(queryObject.vote)


const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

//Value is null when <InputText> is empty
watch(score, () => {
    console.log(score.min)
    // console.log(typeof score.min.value)
})


</script>

<template>
    <Button variant="outlined" @click="toggle">
        Score
    </Button>

    <Popover ref="op">
        <div>

            <div class="mt-[10px] mb-[5px]"> Score</div>
            <div class="flex items-center">

                <InputNumber placeholder="Min." v-model="score.min" inputId="minscore" :min="0" :max="10" fluid />
                <div class="mr-[10px] ml-[10px]">to</div>
                <InputNumber placeholder="Max." v-model="score.max" inputId="maxscore" :min="0" :max="10" fluid />
            </div>
        </div>
        <div>
            <div class="mt-[10px] mb-[5px]">Vote count</div>
            <div class="flex items-center">

                <InputNumber placeholder="Min." v-model="vote.min" inputId="minvote" :min="0" :max="1000000" fluid />
                <div class="mr-[10px] ml-[10px]">to</div>
                <InputNumber placeholder="Max." v-model="vote.max" inputId="maxvote" :min="0" :max="1000000" fluid />
            </div>
        </div>
    </Popover>
</template>