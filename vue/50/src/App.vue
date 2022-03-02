<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from 'vue';
const asyncTitle = defineAsyncComponent(() => import("./components/Title.vue"));
</script>

<template>
    <div class="tn-header">
        <button type="button" class="tn-header-btn">show Notification(auto close)</button>
        <async-title level="2" class="tn-header-title">Notification</async-title>
        <button type="button" class="tn-header-btn">show Notification(not auto close)</button>
    </div>
    <div class="tn-toast-container" id="tn-toast-container"></div>
</template>

<style lang="scss">
    @import "./style/app.scss";
</style>
