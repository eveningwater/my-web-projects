<script lang="tsx">
    import { defineComponent, PropType } from "@vue/runtime-core";
    import { toRefs } from "vue";
    export default defineComponent({
        props:{
            iconClass:String as PropType<string>,
            value:Number as PropType<number>,
            text:String as PropType<string>,
        },
        setup(props){
            // Object deconstruction will destroy the reactivity of the object, so use the `toRefs` method to forward it
            // Then we can't need to monitor changes in value,and can't need to re-assign the value.
            const { iconClass,value,text } = toRefs(props);
            let newIconClass = "fa fa-3x";
            if(typeof iconClass.value === "string"){
                newIconClass += " " + iconClass.value;
            }
            // let newValue = value;
            // Why do you need to monitor changes in data and re-assign value?
            // watch(() => props.value,(val) => {
            //     newValue = val;
            // });
            return () => (
                <div class="ic-counter mt-40 mb-40 ml-50 mr-50">
                    <i class={ newIconClass }></i>
                    {/*<div class="ic-counter-value mt-10 mb-10">{newValue}</div>*/}
                    <div class="ic-counter-value mt-10 mb-10">{value.value}</div>
                    <div class="ic-counter-text">{text.value }</div>
                </div>
            )
        }
    });
</script>
<!-- <script lang="ts" setup>
    import { PropType, watch } from "@vue/runtime-core";
    import { computed, ref } from "vue";
    const props = defineProps({
        iconClass:String as PropType<string>,
        value:Number as PropType<number>,
        text:String as PropType<string>,
    });
    const { iconClass,value,text } = props;
    const newIconClass = computed(() => {
        let value = "fa fa-3x";
        if(typeof iconClass === "string"){
            value += " " + iconClass;
        }
        return value;
    });
    const newValue = ref(value);
    const newText = computed(() => text);
    watch(() => props.value,(val) => {
         newValue.value = val;
    })
</script>
<template>
    <div class="ic-counter mt-40 mb-40 ml-50 mr-50">
        <i :class="newIconClass"></i>
        <div class="ic-counter-value mt-10 mb-10">{{ newValue }}</div>
        <div class="ic-counter-text">{{ newText }}</div>
    </div>
</template> -->
<style lang="scss" scoped>
    @import "../style/variable.scss";
    .#{$baseSelector}counter {
        @include flex-center;
        color:$color;
        flex-direction: column;
        .#{$baseSelector}counter-value {
            font-size: 60px;
        }
        .#{$baseSelector}counter-text {
            font-size: 20px;
        }
    }
    @media screen and (max-width:780px) {
        .#{$baseSelector}counter {
            margin:20px 30px;
        }
    }
</style>