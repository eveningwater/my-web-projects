import { defineComponent, PropType, toRefs } from "vue";
import './background.scss';

export default defineComponent({
    name:"Background",
    props:{
        url:{
            type: String as PropType<string>
        },
        value:{
            type: Number as PropType<number>
        }
    },
    setup(props){
        const { url,value } = toRefs(props);

        return () => (
            <div class="psb-background" style={{
                filter:`blur(${value.value}px)`, 
                background:`url(${url.value})no-repeat 50% / cover`,
            }}></div>
        )
    }
})