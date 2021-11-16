<script lang="tsx">
    import { defineComponent, PropType } from "@vue/runtime-core";
    export default defineComponent({
        props:{
            placeholder:String as PropType<string>,
            onBlur:Function
        },
        setup(props,{ slots }){
            const onBlurHandler = (e:FocusEvent) => {
                props.onBlur && props.onBlur(e);
            }
            return () => (
                <div class="ma-input">
                    { slots.prefix ? slots.prefix() : null }
                    <input type="text" class="ma-inner-input" placeholder={props.placeholder} onBlur={ onBlurHandler}/>
                    { slots.suffix ? slots.suffix() : null}
                </div>
            )
        }
    })
</script>
<style lang="scss" scoped>
    @import "../style/variable.scss";
    $inputBorderColor:#dcdef6;
    $inputFontColor:#606466;
    $inputBgColor:#ffffff;
    $inputFocusBorderColor:#40a4f0;
    $placeholderColor:#c0c1cc;
    .#{$baseSelector}input {
        position: relative;
        display: inline-block;
        width: percentage(1);
        font-size: 14px;
        .#{$baseSelector}inner-input {
            -webkit-appearance: none;
            border: {
                width:1px;
                style:solid;
                color:$inputBorderColor;
            }
            border-radius: 50px;
            box-sizing: border-box;
            display: inline-block;
            color:$inputFontColor;
            @include p(-top,1,rem);
            @include p(-bottom,1,rem);
            @include p(-left,2,rem);
            @include p(-right,2,rem);
            width: inherit;
            font-size: inherit;
            background-color: $inputBgColor;
            transition: border-color .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            &:focus-visible {
                outline: none;
            }
            &:focus {
                border-color:$inputFocusBorderColor;
            }
            &::placeholder {
                color:$placeholderColor;
            }
        }
    }
</style>