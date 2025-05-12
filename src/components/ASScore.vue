<script setup>
import { queryObject } from '@/store';
import { reactive, ref, watch } from 'vue';

const queryObjectScoreCopy = JSON.parse(JSON.stringify(queryObject.score))
const queryObjectVoteCopy = JSON.parse(JSON.stringify(queryObject.vote))

const score = reactive(queryObjectScoreCopy)
const vote = reactive(queryObjectVoteCopy)


const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

//Value is null when <InputText> is empty
watch(score, () => {
    //console.log(score.min)
    // console.log(typeof score.min.value)
})


</script>

<template>
    <div>


        <Button variant="outlined" @click="toggle">
            Score
        </Button>

        <Popover ref="op">
            <div>

                <div class="mt-[10px] mb-[5px]"> Score</div>
                <div class="flex items-center">

                    <InputNumber placeholder="Min." @value-change="$emit('score-min-change', score.min)"
                        v-model="score.min" inputId="minscore" :min="0" :max="10" fluid />
                    <div class="mr-[10px] ml-[10px]">to</div>
                    <InputNumber placeholder="Max." @value-change="$emit('score-max-change', score.max)"
                        v-model="score.max" inputId="maxscore" :min="0" :max="10" fluid />
                </div>
            </div>
            <div>
                <div class="mt-[10px] mb-[5px]">Vote count</div>
                <div class="flex items-center">

                    <InputNumber placeholder="Min." @value-change="$emit('vote-min-change', vote.min)"
                        v-model="vote.min" inputId="minvote" :min="0" :max="1000000" fluid />
                    <div class="mr-[10px] ml-[10px]">to</div>
                    <InputNumber placeholder="Max." @value-change="$emit('vote-max-change', vote.max)"
                        v-model="vote.max" inputId="maxvote" :min="0" :max="1000000" fluid />
                </div>
            </div>
        </Popover>
    </div>
</template>