<template>
    <label class="exam-radio-container" @click="isChecked = true;$emit('on-click',isChecked);" :class="{ 'exam-radio-checked':isChecked }">
        <span class="exam-radio">
            <span class="exam-radio-inner"></span>
        </span>
        <slot>{{ label }}</slot>
    </label>
</template>
<script>
export default {
    name:"exam-radio",
    props:{
        label:{
            type:String,
            default:""
        }
    },
    data(){
        return {
            isChecked:false
        }
    }
}
</script>