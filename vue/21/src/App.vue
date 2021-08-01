<template>
  <div class="app">
    <Tab />
    <transition name="fade">
      <div
        class="container flex-center flex-col"
        v-if="currentPage === 'start'"
      >
        <Title :lang="lang" />
        <Content
          :content="startContent"
          class="start-content text-center"
          isRenderHTML
        />
        <div class="button-wrapper mt-10px">
          <Button
            nativeType="button"
            v-text="startButtonText"
            type="default"
            isLong
            clickType="startBtn"
          ></Button>
        </div>
      </div>
      <div
        class="container flex-center flex-col"
        v-else-if="currentPage === 'center'"
      >
        <List
          v-for="(item, index) in questions"
          :key="item.answer + index"
          :question="item"
        />
        <Bottom :currentOrder="currentQuestion" />
      </div>
      <div class="result-wrapper" v-else>
        <div class="flex-center flex-col">
          <Title>{{ answerTitle }}</Title>
          <result-list :list="resultList"></result-list>
          <Content
            class="render-content"
            isRenderHTML
            :content="endContent"
          ></Content>
          <div class="button-wrapper mt-10px">
            <Button
              nativeType="button"
              v-text="endButtonText"
              type="default"
              isLong
              clickType="endBtn"
            ></Button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import emitter from "./event/eventBus";
import { parseObject, questions, getCurrentAnswers } from "./data/data";
import { renderMarkedContent } from "./utils/util";
import { defineComponent, reactive, ref, toRefs } from "vue";
import Tab from "./components/Tab.vue";
import Title from "./components/Title.vue";
import Content from "./components/Content.vue";
import List from "./views/List.vue";
import Bottom from "./views/Bottom.vue";
import Button from "./components/Button.vue";
import ResultList from "./views/ResultList.vue";
export default defineComponent({
  name: "App",
  components: { Tab, Title, Content, Button, List, Bottom, ResultList },
  setup() {
    const getStartContent = (lang: string) => parseObject[lang].startContent;
    const getStartButtonText = (lang: string) => parseObject[lang].startBtn;
    const getEndButtonText = (lang: string) => parseObject[lang].endBtn;
    const getResultList = (lang: string, answers: string[]) => {
      let resultList = [] as any [];
      for(let i = 0;i < answers.length;i++){
          resultList.push({
             question:questions[i] && questions[i].question,
             userTitle:parseObject[lang].answer,
             correctTitle:parseObject[lang].output,
             correctValue:questions[i] && questions[i].correct,
             detail:parseObject[lang].detail[i] && renderMarkedContent(parseObject[lang].detail[i]),
             userAnswer:answers[i],
             message:parseObject[lang][ questions[i] && answers[i] === questions[i].correct ? "successMsg": "errorMsg"]
          });
      }
      return resultList;
    };
    const lang = ref("en");
    const state = reactive({
      startContent: getStartContent(lang.value),
      currentPage: "start",
      startButtonText: getStartButtonText(lang.value),
      endButtonText: getEndButtonText(lang.value),
      questions: questions.slice(0, 1),
      currentQuestion: 0,
      answerCorrect: 0,
      answerTitle: "",
      endContent: "",
      resultList: [] as any [],
      userAnswers: [] as string[],
    });
    emitter.$on("on-change-lang", (callback: Function) => {
      lang.value = callback();
      state.startContent = getStartContent(lang.value);
      state.startButtonText = getStartButtonText(lang.value);
      state.endButtonText = getEndButtonText(lang.value);
      state.endContent = parseObject[lang.value].endContent;
      state.answerTitle = getCurrentAnswers(lang.value,state.answerCorrect,questions.length);
      if(state.userAnswers.length > 25){
        state.userAnswers = state.userAnswers.slice(0,25);
      }
      if (state.userAnswers.length === 25) {
        state.resultList = [...getResultList(lang.value, state.userAnswers)];
      }
    });
    emitter.$on("on-click", (callback: Function) => {
      const clickType: string = callback();
      switch (clickType) {
        case "startBtn":
          state.currentPage = "center";
          break;
        case "endBtn":
          state.currentPage = "start";
          state.currentQuestion = 0;
          state.questions = questions.slice(
            state.currentQuestion,
            state.currentQuestion + 1
          );
          break;
      }
    });
    emitter.$on("on-select-answer", (callback: Function) => {
      const select = callback();
      if(state.currentQuestion < questions.length){
          state.userAnswers.push(select.answer);
      }
      if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion++;
        if (select.answer === select.correct) {
           state.answerCorrect++;
        }
        state.questions = questions.slice(state.currentQuestion,state.currentQuestion + 1);
      } else {
        state.currentPage = "end";
        if(state.userAnswers.length > 25){
          state.userAnswers = state.userAnswers.slice(0,25);
        }
        state.resultList = [...getResultList(lang.value,state.userAnswers)];
        state.answerTitle = getCurrentAnswers(
          lang.value,
          state.answerCorrect,
          questions.length
        );
        state.endContent = renderMarkedContent(
          parseObject[lang.value].endContent
        );
      }
    });
    return {
      lang,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
.app {
  height: 100vh;
  overflow: hidden;
  .container {
    width: 100%;
    height: 100%;
    padding: 20px;
    .start-content {
      width: 100%;
      max-width: 35rem;
      line-height: 1.8;
      font-size: 18px;
    }
  }
  .button-wrapper {
    max-width: 25rem;
    width: 100%;
    display: flex;
  }
  .render-content {
    padding: 15px;
    max-width: 600px;
    line-height: 1.5;
    font-size: 18px;
    word-break: break-all;
  }
  .result-wrapper {
    width: 100%;
    height: 100vh;
    padding: 60px 15px 40px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
