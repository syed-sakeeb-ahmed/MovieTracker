import { reactive } from "vue";

export const menuToggle = reactive({
    isOpen: false
})

export const queryObject = reactive({
    include_adult: false,
    include_video: false,
    page: 1,
    language: 'en-US',
    sort_by: 'popularity.desc'
})

export const modifiedQueryObject = reactive({
    count: 0
})