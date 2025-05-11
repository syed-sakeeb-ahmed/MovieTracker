<script setup>
import { reactive, ref, watch } from 'vue';


const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}



</script>

<template>
    <Button variant="outlined" @click="toggle">
        Score
    </Button>

    <Popover ref="op">
        <div>

            <div class="mt-[10px] mb-[5px]"> Score</div>
            <div class="flex items-center">

                <InputNumber name="username" placeholder="Min." v-model="value4" inputId="minmax" :min="0" :max="10" fluid />
                <div class="mr-[10px] ml-[10px]">to</div>
                <InputNumber placeholder="Max." v-model="value4" inputId="minmax" :min="0" :max="10" fluid />
            </div>
        </div>
        <div>
            <div class="mt-[10px] mb-[5px]">Vote count</div>
            <div class="flex items-center">

                <InputNumber placeholder="Min." v-model="value4" inputId="minmax" :min="0" :max="1000000" fluid />
                <div class="mr-[10px] ml-[10px]">to</div>
                <InputNumber placeholder="Max." v-model="value4" inputId="minmax" :min="0" :max="1000000" fluid />
            </div>
        </div>
    </Popover>
</template>