<template>
    <button :class="classObject" :type="nativeType" @click="onClickHandler" :style="topStyle">
        <slot>
            <template v-if="isRenderHTML">
                <span v-html="content"></span>
            </template>
            <template v-else>{{ content }}</template>
        </slot>
    </button>
</template>
<script lang="ts">
    import emitter from '../event/eventBus';
    import { computed, defineComponent, Prop, PropType, reactive, toRefs } from 'vue';
    export default defineComponent({
        props:{
            nativeType:{
                type:String as PropType<string>,
                default:"button",
                // validator 的参数一定要注明类型,否则会破坏setup函数的props对象的类型
                validator:(val:string) => {
                    return ["submit","button","reset"].indexOf(val) > -1;
                }
            },
            type:{
                type:String as PropType<String>,
                default:"default",
                validator:(val:string) => {
                    return ["default","success","primary","error","info","warning"].indexOf(val as string) > -1;
                }
            },
            size:{
                type:String as PropType<String>,
                default:"normal",
                validator:(val:string) => {
                    return ["mini","medium","normal","small","large"].indexOf(val as string) > -1;
                }
            },
            isLong:{
                type:Boolean as PropType<Boolean>,
                default:false
            },
            content:String as PropType<String>,
            isRenderHTML:{
                type:Boolean as PropType<Boolean>,
                default:false
            },
            clickType:String as PropType<string>,
            style:String as PropType<string>
        },
        setup(props){
            const { nativeType,isRenderHTML,content,type,size,isLong } = toRefs(props);
            const state = reactive({
                nativeType:nativeType.value,
                isRenderHTML:isRenderHTML.value,
                content:content.value
            });
            const classObject = computed(() => {
                const defaultClassName = "btn";
                return `${ defaultClassName } btn-${type.value} ${ ( isLong.value ? "btn-long " : "") }btn-${ size.value }`;
            });
            const onClickHandler = () => {
                emitter.$emit("on-click",() => props.clickType);
            }
            const topStyle = computed(() => ({ "display":props.style }));
            return {
                ...toRefs(state),
                classObject,
                topStyle,
                onClickHandler
            }
        }
    })
</script>
<style lang="less" scoped>
    @btn-default-color:transparent;
    @btn-default-border-color:#d8dbdd;
    @btn-default-font-color:#ffffff;
    @btn-default-hover-color:#fff;
    @btn-default-hover-border-color:#a19f9f;
    @btn-default-hover-font-color:#535455;
    .btn {
        outline: none;
        display: inline-block;
        border: 1px solid @btn-default-border-color;
        color: @btn-default-font-color;
        border-radius: 8px;
        background-color: @btn-default-color;
        font-size: 14px;
        letter-spacing: 2px;
        cursor: pointer;
        &.btn-normal {
            padding: 14px 18px;
        }
        &.btn-long {
            width: 100%;
        }
        &.btn-mini {
            padding: 6px 8px;
        }
        &:not(.btn-no-hover):hover,&:not(.btn-no-active):active,&.btn-active {
            border-color: @btn-default-hover-border-color;
            background-color: @btn-default-hover-color;
            color:@btn-default-hover-font-color;
        }
    }
</style>