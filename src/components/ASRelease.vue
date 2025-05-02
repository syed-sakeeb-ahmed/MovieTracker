<script setup>
import { ref } from 'vue';

const isCustomRange = ref(false)
</script>

<template>
    <div>
        <button>Release Date</button>
        <div>
            <div>
                <input v-model="isCustomRange" type="checkbox" name="isCustomRange" id="isCustomRange">
            </div>
            <div v-if="!isCustomRange" class="flex">
                Specific Year
                <input type="date" name="date" id="date">
            </div>
            <div v-if="isCustomRange" class="flex">
                Custom range
                <input type="date" name="from" id="from">
                to
                <input type="date" name="until" id="until">
            </div>
        </div>
    </div>
</template>