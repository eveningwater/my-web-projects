<script lang="tsx">
    import { defineComponent, getCurrentInstance, PropType, VNodeArrayChildren,VNode } from "@vue/runtime-core";
    import { ref } from "vue";
    import clickoutside from "../directive/clickoutside";
    import classnames from "../utils/classnames";
    export default defineComponent({
        props:{
            placeholder:String as PropType<string>
        },
        setup(props,{ slots }){
            const msg = "The select component should has 'mini-web-option' component as childs!";
            let children:VNodeArrayChildren = [];
            if(slots.default){
                children = slots.default();
                if(children.filter(child => !child || (child as VNode).type.toString() === "Symbol(Comment)").some(child => (child as VNode).type !== "mini-web-option")){
                    return console.warn(msg);
                }
            }
            const { placeholder } = props;
            const isDown = ref(false)
            const onClickOutside = () => {
                isDown.value = false;
            }
            const iconClassObject = {
                "mini-web-select-icon":true,
                "mini-web-select-icon-down":!isDown.value,
                "mini-web-select-icon-up":isDown.value,
            }
            const directives = [
                {
                    name:clickoutside.directive,value:["onClickOutside"],modifiers:clickoutside.directiveOption
                }
            ]
            return () => (
                <div class="mini-web-select">
                    <div class="mini-web-select-title" placeholder={placeholder}></div>
                    <i class={classnames(iconClassObject)}></i>
                    {
                        isDown.value ? (
                            <div class="mini-web-select-popper" {...{directives}}>{ children }</div>
                        ) : null
                    }
                </div>
            )
        }
    })
</script>
<style lang="less" scoped>
    @import "../style/variable.less";
    @titleBorderColor:#e6e7e8;
    .@{baseSelector}select{
        position: extract(@position,@full);
        .@{baseSelector}select-title {
            height: unit(ceil(37.5),px);
            border: unit(@full,px) solid @titleBorderColor;
            background-color: @color;
            border-radius: unit(sqrt(4),px);
            cursor: extract(@cursor,@full);
            .p(r,20,px);
            .p(l,20,px);
            display: extract(@display,@full);
            width: percentage(@full);
            box-sizing: border-box;
        }
    }
</style>