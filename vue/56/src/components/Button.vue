<script lang="tsx">
    import { PropType,Fragment,defineComponent } from "vue";
    import classnames from "../utils/classnames";
    const typeArr = ["button","submit","reset"];
    export default defineComponent({
        props:{
            nativeType:{
                type:String as PropType<string>,
                default:"button",
                validator:(value:string) => {
                    return typeArr.indexOf(value) > -1;
                }
            },
            content:String as PropType<string>,
            className:String as PropType<string>
        },
        emits:["click"],
        setup(props,{ slots,emit }){
            const { nativeType,content,className } = props;
            const renderChildren = () => slots.default ? slots.default() : content;
            type ClassType = {
                [prop:string]:any;
            }
            const classes:ClassType= {
                "na-btn":true,
            }
            if(className){
                classes[className] = true;
            }
            return () => (
                <Fragment>
                    <button type={ nativeType as "button" } class={classnames(classes)} onClick={$event => emit('click',$event)}>{ renderChildren() }</button>
                </Fragment>
            )
        }
    })
</script>
<style lang="scss" scoped>
    $backgroundColor:linear-gradient(135deg,#f3c27a 10%,#e6a10f 90%);
    $backgroundActiveColor:linear-gradient(135deg,#f5b452 10%,#e99210 90%);
    .#{$baseSelector}btn {
        @extend .el-display-inline-block,.el-cursor-pointer;
        @include setComponent(border-radius,8,px);
        @include setComponent(letter-spacing,2,px);
        @include setComponent(font-size,14,px);
        @include setComponent(padding-top,8,px);
        @include setComponent(padding-bottom,8,px);
        @include setComponent(padding-left,18,px);
        @include setComponent(padding-right,18,px);
        @include setComponent(border,0,null);
        @include background($backgroundColor);
        @include color($white);
        &:focus-visible {
            outline:none;
        }
        &:hover {
            @include background($backgroundActiveColor);
        }
    }
</style>