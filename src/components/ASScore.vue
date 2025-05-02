<script setup>
import { reactive, ref, watch } from 'vue';

const score = reactive({
    arr: [0, 10],
    constraints: [0, 10]
})

const voteCount = reactive({
    arr: [0, 100000],
    constraints: [0, 100000]
})

const isMenuOpen = ref(false)

//Takes in origArr of size 2 and constraintsArr of size 2
const enforceConstraints = (origArr, constraintsArr) => {
    if (origArr[0] < constraintsArr[0]) {
        origArr[0] = constraintsArr[0]
    }
    else if (origArr[0] > constraintsArr[1]) {
        origArr[0] = constraintsArr[1]
    }

    if (origArr[1] < constraintsArr[0]) {
        origArr[1] = constraintsArr[0]
    }
    else if (origArr[1] > constraintsArr[1]) {
        origArr[1] = constraintsArr[1]
    }
}

const toggleMenu = () => {
    isMenuOpen.value = ! isMenuOpen.value
}

watch(score, () => {
    console.log(`${score.arr[0]}, ${score.arr[1]}`)
    enforceConstraints(score.arr, score.constraints)
})

watch(voteCount, () => {
    console.log(`${voteCount.arr[0]}, ${voteCount.arr[1]}`)
    enforceConstraints(voteCount.arr, voteCount.constraints)
})



</script>

<template>
    <div @click="toggleMenu" class="bg-green-700">
        Score
    </div>
    <div v-if="isMenuOpen" class="bg-pink-700">

        <div>
            <span>Score</span>
            <Slider :min="0" :max="10" v-model="score.arr" range class="w-56" />
            <div>
                <div>
                    <span>Min</span>
                    <input type="number" v-model="score.arr[0]">
                </div>
                <span> - </span>
                <div>
                    <span>Max</span>
                    <input type="number" v-model="score.arr[1]" placeholder="Max">
                </div>
            </div>

        </div>
        <div>
            <span>Vote Count</span>
            <Slider :min="0" :max="100000" v-model="voteCount.arr" range class="w-56" />
            <div>
                <div>
                    <span>Min</span>
                    <input type="number" v-model="score.arr[0]">
                </div>
                <span> - </span>
                <div>
                    <span>Max</span>
                    <input type="number" v-model="score.arr[1]" placeholder="Max">
                </div>
            </div>
        </div>
    </div>
</template>