<script setup>

import { ref, watch } from 'vue';
import { SECRET, languages } from '@/utilites/jsonUtilities';
import {queryObject} from "@/store"


const languageList = ref(languages)
const selectedLanguage = ref('en')
console.log(JSON.stringify(queryObject.language))

//English is at index 172
// let count = 0
// for (const obj of languages) {
//   console.log(obj.english_name, count)
//   count++
// }

watch(selectedLanguage, () => {
  console.log(selectedLanguage.value)
})

</script>

<template>
    <div>
      <Select @value-change="$emit('value-changed', selectedLanguage)" v-model="selectedLanguage" :options="languageList" optionValue="iso_639_1" optionLabel="english_name" placeholder="Original Language" class="w-full md:w-56" />
    </div>
</template>