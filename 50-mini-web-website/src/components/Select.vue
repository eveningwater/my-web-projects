<script lang="tsx">
    import { defineComponent, PropType, VNodeArrayChildren,VNode, provide, watch } from "@vue/runtime-core";
    import { ref } from "vue";
    import clickoutside from "../directive/clickoutside";
    import classnames from "../utils/classnames";
    export default defineComponent({
        props:{
            placeholder:String as PropType<string>,
            modelValue:String as PropType<string>
        },
        directives:{
            [clickoutside.directive]:clickoutside.directiveOption
        },
        emits:["update:modelValue","on-change"],
        setup(props,{ emit,slots}){
            const msg = "The select component should has 'mini-web-option' component as childs!";
            let children:VNodeArrayChildren = [];
            if(slots.default){
                children = slots.default();
                if(children.filter(child => !child || (child as VNode).type.toString() === "Symbol(Comment)").some(child => (child as VNode).type !== "mini-web-option")){
                    return console.warn(msg);
                }
            }
            const { placeholder } = props;
            const isDown = ref(false);
            const selectValue = ref(props.modelValue);
            const onClickOutside = () => {
                isDown.value = false;
            }
            const iconClassObject = {
                "mini-web-select-icon":true,
                "mini-web-select-icon-down":!isDown.value,
                "mini-web-select-icon-up":isDown.value,
            }
            const onOpenPoperHandler = () => {
                isDown.value = !isDown.value;
            }
            watch(() => isDown.value,(val) => {
                iconClassObject["mini-web-select-icon-down"] = !isDown.value;
                iconClassObject["mini-web-select-icon-up"] = isDown.value;
            })
            provide("select-context",{ emit,isDown,selectValue });
            return () => (
                <div class="mini-web-select" v-click-outside={onClickOutside}>
                    <div class="mini-web-select-title" placeholder={placeholder} onClick={onOpenPoperHandler}>{selectValue.value}</div>
                    <i class={classnames(iconClassObject)} onClick={onOpenPoperHandler}></i>
                    <div class="mini-web-select-popper" style={{ display:isDown.value ? "block" : "none" }}>{ children }</div>
                </div>
            )
        }
    })
</script>
<style lang="less" scoped>
    @titleBorderColor:#e6e7e8;
    @selectPoperBorderColor:#dad6d7;
    .@{baseSelector}select{
        position: extract(@position,@full);
        .@{baseSelector}select-title {
            height: unit(ceil(37.5),px);
            border: unit(@full,px) solid @titleBorderColor;
            background-color: @color;
            border-radius: unit(sqrt(4),px);
            cursor: extract(@cursor,@full);
            line-height:unit(ceil(37.6),px);
            .p(r,20,px);
            .p(l,20,px);
            display: extract(@display,@full);
            width: percentage(@full);
            box-sizing: border-box;
            color:@optionFontColor;
        }
        .@{baseSelector}select-icon {
            position: extract(@position,@full + @full);
            width: @none;
            height:@none;
            border-width: unit(pow(2,3) - pow(2,1),px);
            border-style: solid;
            border-color: @transparent;
            border-top-color: @iconColor;
            right: unit(2 * 5,px);
            top: percentage(@half);
            transform: translateY(percentage(-@half));
            .m(t,2,px);
            &.@{baseSelector}select-icon-up {
                .m(t,0,px);
                transform: rotateZ(unit(pow(3,2) * 20,deg)) translateY(percentage(@full - .2));
            }
        }
        .@{baseSelector}select-popper {
            box-sizing: border-box;
            position: absolute;
            top: unit(pow(6,2) + pow(2,2),px);
            left: @none;
            width: percentage(@full);
            background: @color;
            border-top: unit(@full,px) solid @selectPoperBorderColor;
            z-index: pow(10,2);
        }
    }
</style>