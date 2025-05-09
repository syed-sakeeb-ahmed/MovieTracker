<script setup>
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components'
import { useTemplateRef } from 'vue'

const isOpen = ref(false)

const toggleIsOpen = () => {
    isOpen.value = !isOpen.value
}
const ignoreElRef = useTemplateRef('ignoreEl')

const onClickOutsideHandler = [
    (ev) => {
        console.log(ev)
        isOpen.value = false
    },
    { ignore: [ignoreElRef] },
]

const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

const isCustomRange = ref(false)
</script>

<template>
    <div>
        <Button class="flex rounded-[20px] p-[10px] w-[215px] items-center border-red-500 border-[2px]" ref="ignoreEl"
            @click="toggle">
            <span>Release Date</span>
            <img :style="{ pointerEvents: 'none', marginLeft: 'auto' }" class="w-[15px] h-[15px]"
                src="../assets/Dropdown_Arrow.svg" alt="Dropdown Arrow">
        </button>

        <Popover ref="op">
            <Tabs value="0">
                <TabList>
                    <Tab value="0">Specific Year</Tab>
                    <Tab value="1">Custom Range</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <DatePicker v-model="icondisplay" showIcon fluid iconDisplay="input" />
                    </TabPanel>
                    <TabPanel value="1" class="flex flex-col justify-between">
                        <div>
                            <span>From</span>
                            <DatePicker v-model="icondisplay" showIcon fluid iconDisplay="input" />
                        </div>
                        <div>
                            <span>To</span>
                            <DatePicker v-model="icondisplay" showIcon fluid iconDisplay="input" />
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Popover>


    </div>
</template>