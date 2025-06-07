<script setup>
import { ref, reactive } from 'vue'

const borderColorLRT = '#e5e5e5'
const borderColorB = '#9b1c1c'
const bgColor = '#f5e1e1'

const styles = reactive({
    'background-color': `${bgColor}`,
    'border-bottom': `1px solid ${borderColorB}`,
    'border-left': `1px solid ${borderColorLRT}`,
    'border-right': `1px solid ${borderColorLRT}`,
    'border-up': `1px solid ${borderColorLRT}`,
})

</script>

<template>
    <div style="font-family: Verdana, Arial"
        class="font-bold text-[16px] pl-[9px] pt-[5px] pb-[5px] pr-[7px] w-[1060px] h-[50px]" :style="styles">
        <slot></slot>
    </div>
</template>