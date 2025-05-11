<script setup>
import { sortOptions } from '@/utilites/jsonUtilities';
import { ref, watch } from 'vue';

const selectedSortOption = ref('')

watch(selectedSortOption, () => {
    console.log(selectedSortOption.value)
})
</script>

<template>
    <div>
        <Select v-model="selectedSortOption" :options="sortOptions" optionValue="value" optionLabel="name" placeholder="Sort by" class="w-full md:w-56" />
    </div>
</template>