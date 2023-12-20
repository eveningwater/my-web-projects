<script setup lang="ts">
import { computed, ref } from 'vue'
import { checkedIcon } from '../../const/icon';
const emit = defineEmits(['on-change'])
const getCheckBoxIcon = computed(() => checkedIcon('ew-note-checkbox-checked-icon'));
const isChecked = ref(false);
const onClickHandler = () => {
    isChecked.value = !isChecked.value;
    emit('on-change', isChecked.value);
}
</script>
<template>
    <label class="ew-note-checkbox ew-note-flex-center" v-html="getCheckBoxIcon" :class="{ checked: isChecked }"
        @click="onClickHandler"></label>
</template>
<style scoped>
.ew-note-checkbox {
    width: 28px;
    height: 28px;
    border-radius: 1px;
    border: 1px solid var(--ew-note-checkbox-border-color--);
    margin-right: 5px;
    cursor: pointer;
    color: var(--white--);
}

.ew-note-checkbox.checked {
    background-color: var(--ew-note-checkbox-bg-color--);
}
</style>