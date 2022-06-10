<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';
const AsyncButton = defineAsyncComponent(() => import("@/components/Button.vue"));
</script>

<template>
    <header class="na-header">
        <async-button className="na-header-add-btn"><i class="fas fa-plus na-header-add-btn-icon"></i>add notes</async-button>
    </header>
    <div class="na-note-container">
        
    </div>
</template>

<style lang="scss">
  @import "./style/app.scss";
</style>
