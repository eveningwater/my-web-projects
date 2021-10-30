import { defineComponent, Fragment, PropType } from "@vue/runtime-core";
import "../style/loading.less";

export default defineComponent({
    props:{
        children:String as PropType<string>,
        dotNumber:{
            type:Number as PropType<number>,
            default:3
        }
    },
    setup(props,{ slots }){
        const { children,dotNumber,...rest } = props;
        const renderChildren = () => slots.default ? slots.default() : children ? children : (
            <div class="dj-loading-circle"></div>
        );
        const allChildren:Array<{ dot:string }> = [];
        for(let i = 0;i < dotNumber;i++){
            allChildren.push({ dot:"dot-" + i });
        }
        return () => (
            <div class="dj-loading-container" { ...rest }>
                { 
                    allChildren.map((item,index) => (
                        <Fragment key={item.dot + index}>
                            { renderChildren() }
                        </Fragment>
                    ))
                }
            </div>
        )
    }
})