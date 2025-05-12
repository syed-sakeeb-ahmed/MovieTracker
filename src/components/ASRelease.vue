<script setup>
import { ref, watch } from 'vue';
import { queryObject } from '@/store';


const value = ref(queryObject.releaseDateTab)
const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

watch(value, () => {
    queryObject.releaseDateTab = value.value
})


</script>

<template>
    <div>
        <Button fluid label="Primary" variant="outlined" 
            @click="toggle">
            <span>Release Date</span>
        </Button>

        <Popover ref="op">
            <Tabs v-model:value="value">
                <TabList>
                    <Tab value="0">Specific Year</Tab>
                    <Tab value="1">Custom Range</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <DatePicker v-model="queryObject.releaseDate" showIcon fluid iconDisplay="input" />
                    </TabPanel>
                    <TabPanel value="1" class="flex flex-col justify-between">
                        <div>
                            <span>From</span>
                            <DatePicker v-model="queryObject.releaseDateMin" showIcon fluid iconDisplay="input"/>
                        </div>
                        <div>
                            <span>To</span>
                            <DatePicker v-model="queryObject.releaseDateMax" showIcon fluid iconDisplay="input"/>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Popover>


    </div>
</template>