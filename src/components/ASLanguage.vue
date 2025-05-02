<script setup>

import { ref } from 'vue';
import { SECRET } from '@/utilites/jsonUtilities';

const languageList = ref(null)

const getLanguages =  async () => {
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + SECRET
  }
};

languageList.value = await fetch('https://api.themoviedb.org/3/configuration/languages', options)
  .then(res => res.json())
  .catch(err => {throw new Error("Something went wrong while fetching languages from TMDB" + err)});
}

getLanguages()

</script>

<template>
    <div>
        <select name="languages" id="languages">

            <option :selected="item.english_name === 'English' ? true : false" v-for="item in languageList" :key="item.iso_639_1">
                {{ item.english_name }}
            </option>
        </select>
    </div>
</template>