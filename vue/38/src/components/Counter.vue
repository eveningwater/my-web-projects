<script lang="tsx">
    import { defineComponent, PropType } from "@vue/runtime-core";
    export default defineComponent({
        props:{
            iconClass:String as PropType<string>,
            value:Number as PropType<number>,
            text:String as PropType<string>,
        },
        setup(props){
            const { iconClass,value,text } = props;
            let newIconClass = "fa fa-3x";
            if(typeof iconClass === "string"){
                newIconClass += " " + iconClass;
            }
            return () => (
                <div class="ic-counter mt-40 mb-40 ml-50 mr-50">
                    <i class={newIconClass}></i>
                    <div class="ic-counter-value mt-10 mb-10">{value}</div>
                    <div class="ic-counter-text">{text}</div>
                </div>
            )
        }
    });
</script>
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