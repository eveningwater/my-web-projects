<template>
    <el-form class="tri-form">
        <el-form-item label="方向:">
            <el-radio-group v-model="state.form.direction">
                <el-radio v-for="(item,index) in state.radioList" :key="item.value + index" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="宽度:">
            <el-slider v-model="state.form.width" :min="0" :max="200"></el-slider>
        </el-form-item>
        <el-form-item label="高度:">
            <el-slider v-model="state.form.height" :min="0" :max="200"></el-slider>
        </el-form-item>
        <el-form-item label="旋转角度:">
            <el-slider v-model="state.form.rotate" :min="0" :max="360"></el-slider>
        </el-form-item>
        <el-form-item label="背景色:">
            <el-color-picker v-model="state.form.color" show-alpha></el-color-picker>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { ElForm,ElSlider,ElRadio,ElRadioGroup,ElFormItem,ElColorPicker } from 'element-plus';
import { reactive, watchEffect,defineEmits, watch } from 'vue-demi';
const state = reactive({
    form:{
        direction:"top",
        width:60,
        height:60,
        color:"#2396ef",
        rotate:0
    },
    radioList:[
        { label:"上",value:"top"},
        { label:"下",value:"bottom"},
        { label:"左",value:"left"},
        { label:"右",value:"right"}
    ]
});
const emit = defineEmits(["on-change"]);
watch(() => state.form,(val) => {
    emit("on-change",val);
},{ deep:true,immediate:true })
</script>