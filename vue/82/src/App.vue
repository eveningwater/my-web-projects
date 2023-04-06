<script setup lang="ts">
import { get } from './axios';

get('https://jsonplaceholder.typicode.com/todos/1').then(data => {
    console.log(1111,data)
})
</script>

<template>

</template>

<style scoped>

</style>
