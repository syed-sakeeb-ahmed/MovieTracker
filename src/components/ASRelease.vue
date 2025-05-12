<script setup>
import { ref, watch } from 'vue';
import { queryObject } from '@/store';


const val = ref(queryObject.releaseDateTab)
const releaseDate = ref(queryObject.releaseDate)
const releaseDateMin = ref(queryObject.releaseDateMin)
const releaseDateMax = ref(queryObject.releaseDateMax)

const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

const emit = defineEmits(['value-changed-tab', 'value-changed-min', 'value-changed-max', 'value-changed-rd'])

const changeValue = (arg) => {
    //value.value = arg
    //console.log("foo" + arg)
    emit('value-changed-tab', arg)
}

</script>

<template>
    <div>
        <Button fluid label="Primary" variant="outlined" 
            @click="toggle">
            <span>Release Date</span>
        </Button>

        <Popover ref="op">
            <Tabs @update:value="changeValue" :value="val">
                <TabList>
                    <Tab value="0">Specific Year</Tab>
                    <Tab value="1">Custom Range</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <DatePicker @value-change="$emit('value-changed-rd', releaseDate)" v-model="releaseDate" showIcon fluid iconDisplay="input" />
                    </TabPanel>
                    <TabPanel value="1" class="flex flex-col justify-between">
                        <div>
                            <span>From</span>
                            <DatePicker @value-change="$emit('value-changed-min', releaseDateMin)" v-model="releaseDateMin" showIcon fluid iconDisplay="input"/>
                        </div>
                        <div>
                            <span>To</span>
                            <DatePicker @value-change="$emit('value-changed-max', releaseDateMax)" v-model="releaseDateMax" showIcon fluid iconDisplay="input"/>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Popover>


    </div>
</template>