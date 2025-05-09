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

const isCustomRange = ref(false)
</script>

<template>
    <div>
        <button ref="ignoreEl" @click="toggleIsOpen">Release Date</button>
        <div v-if="isOpen" v-on-click-outside="onClickOutsideHandler">
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
        </div>

    </div>
</template>