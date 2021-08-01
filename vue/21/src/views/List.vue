<template>
     <div class="render-list flex-center flex-col">
         <Title>{{ question.question }}</Title>
         <div class="button-wrapper" @click="onSelectAnswer($event)">
             <Button class="btn-no-hover btn-no-active mb-20px" nativeType="button" isLong v-for="(item,index) in question.answer" :key="item + index">{{ item }}</Button>
         </div>
     </div>
</template>
<script lang="ts">
import emitter from "../event/eventBus";
import Button from '../components/Button.vue';
import Title from '../components/Title.vue';
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { QuestionArray } from '../data/data';
export default defineComponent({
    components:{Button,Title},
    props:{
        question:{
            type:Object as PropType<QuestionArray>,
            default:() => ({
                question:"",
                answer:[],
                correct:""
            })
        }
    },
    setup(props){
        const state = reactive({
            question:props.question
        });
        const { correct } = props.question;
        const onSelectAnswer = (event:MouseEvent) => {
            const { target } = event;
            const { tagName } = target as HTMLElement;
            if((tagName as string).toLowerCase() === "button"){
                emitter.$emit("on-select-answer",() => ({
                    correct:correct,
                    answer:(target as HTMLButtonElement).textContent
                }));
            }
        }
        return {
            ...toRefs(state),
            onSelectAnswer
        }
    }
})
</script>