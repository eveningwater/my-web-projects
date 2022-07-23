import { defineComponent, PropType, toRefs } from "vue"
import "./carousel.scss"

export default defineComponent({
    props:{
        carouselOptions: {
            type: Array as PropType<Record<string,string> []>
        },
        currentActive:{
            type:String as PropType<string>
        }
    },
    setup(props){
        const { carouselOptions,currentActive } = toRefs(props)
        return () => (
            <div class="mtn-carousel">
                {
                    carouselOptions.value?.map((car:Record<string,string>) => (
                        <img src={car.src} alt={car.alt} key={car.key} class={`mtn-carousel-item${currentActive.value === car.key ? ' active' : ''}`} />
                    ))
                }
            </div>
        )
    }
})