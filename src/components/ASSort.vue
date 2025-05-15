<script setup>
import { queryObject } from '@/store';
import { sortOptions } from '@/utilites/jsonUtilities';
import { ref, watch } from 'vue';

const selectedSortOption = ref(queryObject.sort_by)

watch(() => queryObject.sort_by, () => {
    selectedSortOption.value = queryObject.sort_by
})
</script>

<template>
    <div >
        <Select fluid @value-change="$emit('value-changed', selectedSortOption)" v-model="selectedSortOption" :options="sortOptions" optionValue="value" optionLabel="name" placeholder="Sort by" class="w-full md:w-56" />
    </div>
</template>