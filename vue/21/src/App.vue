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
    <Button
      size="mini"
      class="btn-no-hover btn-no-active to-top"
      v-if="currentPage === 'end'"
    >
      <a href="#" rel="noopener noreferrer"></a>
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4158"
        ref="toTop"
      >
        <path
          d="M508.214279 842.84615l34.71157 0c0 0 134.952598-188.651614 134.952598-390.030088 0-201.376427-102.047164-339.759147-118.283963-357.387643-12.227486-13.254885-51.380204-33.038464-51.380204-33.038464s-37.809117 14.878872-51.379181 33.038464C443.247638 113.586988 338.550111 251.439636 338.550111 452.816063c0 201.378473 134.952598 390.030088 134.952598 390.030088L508.214279 842.84615zM457.26591 164.188456l50.948369 0 50.949392 0c9.344832 0 16.916275 7.522324 16.916275 16.966417 0 9.377578-7.688099 16.966417-16.916275 16.966417l-50.949392 0-50.948369 0c-9.344832 0-16.917298-7.556093-16.917298-16.966417C440.347588 171.776272 448.036711 164.188456 457.26591 164.188456zM440.347588 333.852624c0-37.47859 30.387078-67.865667 67.865667-67.865667s67.865667 30.387078 67.865667 67.865667-30.387078 67.865667-67.865667 67.865667S440.347588 371.331213 440.347588 333.852624z"
          p-id="4159"
          fill="#ffffff"
        ></path>
        <path
          d="M460.214055 859.812567c-1.87265 5.300726-2.90005 11.000542-2.90005 16.966417 0 12.623505 4.606925 24.189935 12.244882 33.103956l21.903869 37.510312c1.325182 8.052396 8.317433 14.216793 16.750499 14.216793 8.135284 0 14.929014-5.732561 16.585747-13.386892l0.398066 0 24.62177-42.117237c5.848195-8.284687 9.29469-18.425651 9.29469-29.325909 0-5.965875-1.027399-11.665691-2.90005-16.966417L460.214055 859.81359z"
          p-id="4160"
          fill="#ffffff"
        ></path>
        <path
          d="M312.354496 646.604674c-18.358113 3.809769-28.697599 21.439288-23.246447 39.399335l54.610782 179.871647c3.114944 10.304693 10.918677 19.086707 20.529569 24.454972l8.036024-99.843986c1.193175-14.745842 11.432377-29.226648 24.737404-36.517705-16.502859-31.912827-34.381042-71.079872-49.375547-114.721835L312.354496 646.604674z"
          p-id="4161"
          fill="#ffffff"
        ></path>
        <path
          d="M711.644481 646.604674l-35.290761-7.356548c-14.994506 43.641963-32.889061 82.810031-49.374524 114.721835 13.304004 7.291057 23.544229 21.770839 24.737404 36.517705l8.036024 99.843986c9.609869-5.368264 17.397229-14.150278 20.529569-24.454972L734.890928 686.004009C740.34208 668.043962 730.003618 650.414443 711.644481 646.604674z"
          p-id="4162"
          fill="#ffffff"
        ></path>
      </svg>
    </Button>
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
      let resultList = [] as any[];
      for (let i = 0; i < answers.length; i++) {
        resultList.push({
          question: questions[i] && questions[i].question,
          userTitle: parseObject[lang].answer,
          correctTitle: parseObject[lang].output,
          correctValue: questions[i] && questions[i].correct,
          detail:
            parseObject[lang].detail[i] &&
            renderMarkedContent(parseObject[lang].detail[i]),
          userAnswer: answers[i],
          message:
            parseObject[lang][
              questions[i] && answers[i] === questions[i].correct
                ? "successMsg"
                : "errorMsg"
            ],
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
      resultList: [] as any[],
      userAnswers: [] as string[],
    });
    emitter.$on("on-change-lang", (callback: Function) => {
      lang.value = callback();
      state.startContent = getStartContent(lang.value);
      state.startButtonText = getStartButtonText(lang.value);
      state.endButtonText = getEndButtonText(lang.value);
      state.endContent = renderMarkedContent(
        parseObject[lang.value].endContent
      );
      state.answerTitle = getCurrentAnswers(
        lang.value,
        state.answerCorrect,
        questions.length
      );
      if (state.userAnswers.length > 25) {
        state.userAnswers = state.userAnswers.slice(0, 25);
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
      if (state.currentQuestion < questions.length) {
        state.userAnswers.push(select.answer);
      }
      if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion++;
        if (select.answer === select.correct) {
          state.answerCorrect++;
        }
        state.questions = questions.slice(
          state.currentQuestion,
          state.currentQuestion + 1
        );
      } else {
        state.currentPage = "end";
        if (state.userAnswers.length > 25) {
          state.userAnswers = state.userAnswers.slice(0, 25);
        }
        state.resultList = [...getResultList(lang.value, state.userAnswers)];
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
