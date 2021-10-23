<script setup lang="ts">
    import { ref,watch } from 'vue';
    const icon = `url(https://eveningwater.com/my-web-projects/js/62/images/search.svg) no-repeat 50%/cover`;
    const isActive = ref(false);
    const inputRef = ref(null);
    const props = defineProps({
        placeHolder:{
            Type:String,
            default:"请输入需要搜索的内容"
        }
    })
    watch(isActive,val => {
        const inputElement = inputRef.value;
        if(val && inputElement){
            (inputElement as HTMLInputElement).focus();
        }
    });
</script>
<template>
    <div class="hsw-input-container" :class="{ active:isActive }">
        <input type="text" class="hsw-input" ref="inputRef" :placeholder="props.placeHolder" />
        <slot>
            <button class="hsw-btn" type="button" @click="isActive = !isActive">
                <i class="hsw-search-icon"></i>
            </button>
        </slot>
    </div>
</template>
<style lang="less" scoped>
    @import "../style/variable.less";
    .hsw-input-container {
        height: 45px;
        position: relative;
        box-sizing: border-box;
        &.active {
            .hsw-input {
                width: 240px;
                border-radius:8px 0 0 8px;
                border:1px solid @input_focus_color;
                border-right: none;
            }
            .hsw-btn {
                transform: translateX(238px);
                border-radius:0 8px 8px 0;
                border:1px solid @input_focus_color;
            }
        }
        .hsw-input,.hsw-btn {
            width: 45px;
            height: 45px;
            border: none;
            border-radius: 8px;
            transition: all .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-sizing: border-box;
            &:focus-visible {
                outline: none;
            }
            &.hsw-input {
                color:@input_font_color;
                background: linear-gradient(135deg,@input_bg_color_1 10%,@input_bg_color_2 90%);
                font-size: 16px;
                display: inline-block;
                padding: 15px;
            }
            &.hsw-btn {
                background: linear-gradient(90deg,@input_bg_color_1 10%,@input_bg_color_2 90%);
                line-height: 45px;
                cursor: pointer;
                text-align: center;
                position: absolute;
                left: 0;
                top: 0;
                .hsw-search-icon {
                    width: 20px;
                    height: 20px;
                    background: v-bind(icon);
                    margin: auto;
                    display: block;
                }
            }
        }
    }
</style>