<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { BASE_URL } from '../data/url';
    const icons = [
        "menu",
        "close"
    ];
    const currentActive = ref("menu");
    const iconResourceURL = computed(() => `url(${BASE_URL + currentActive.value + ".svg"})`);
    const emit = defineEmits(["on-change"]);
    const onChangeHandler = (icon:string) => {
        currentActive.value = icons.filter(v => v !== icon)[0];
        emit("on-change",currentActive.value);
    }
    emit("on-change",currentActive.value);
</script>
<template>
    <div class="rna-circle-container">
        <div class="rna-circle">
            <i 
                v-for="(icon,index) in icons" 
                :key="icon + index" 
                :class="{ [icon]:true,hidden:(currentActive !== icon),'rna-icon':true }"
                @click="onChangeHandler(icon)"
            ></i>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "../style/variable.less";
    .rna-circle-container {
        position: fixed;
        left: -75px;
        top: -75px;
        box-sizing: border-box;
        .rna-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: @color_active;
            position: relative;
            transition: transform .4s ease-in-out;
            .rna-icon {
                width: 35px;
                height: 35px;
                position: absolute;
                top: 60%;
                background-repeat: no-repeat;
                cursor: pointer;
                z-index: 2;
                background-size: 100%;
                left: 60%;
                background-image: v-bind("iconResourceURL");
                transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
                &:hover {
                    transform: scale(.8);
                }
                &.close {
                    left: 50%;
                    &.hidden {
                        transform-origin: top left;
                        left: 30%;
                        transform: rotate(90deg);
                    }
                }
                &.menu.hidden {
                    left: -60%;
                }
            }
        }
    }
</style>