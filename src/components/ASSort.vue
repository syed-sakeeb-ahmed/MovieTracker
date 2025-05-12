<script setup>
import { queryObject } from '@/store';
import { sortOptions } from '@/utilites/jsonUtilities';
import { ref, watch } from 'vue';

const selectedSortOption = ref(queryObject.sort_by)

watch(selectedSortOption, () => {
    console.log(selectedSortOption.value)
})
</script>

<template>
    <div>
        <Select v-model="selectedSortOption" :options="sortOptions" optionValue="value" optionLabel="name" placeholder="Sort by" class="w-full md:w-56" />
    </div>
</template>