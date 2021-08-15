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
      <div
        class="result-wrapper"
        v-else
        @scroll="onScroll"
        ref="wrapperScrollInstance"
      >
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
        <TopButton :topStyle="topDisplay" @on-to-top="toTopHandler"></TopButton>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import emitter from "./event/eventBus";
import { parseObject, questions, getCurrentAnswers } from "./data/data";
import { renderMarkedContent } from "./utils/util";
import { defineComponent, nextTick, reactive, Ref, ref, toRefs } from "vue";
import Tab from "./components/Tab.vue";
import Title from "./components/Title.vue";
import Content from "./components/Content.vue";
import TopButton from "./components/toTop.vue";
import List from "./views/List.vue";
import Bottom from "./views/Bottom.vue";
import Button from "./components/Button.vue";
import ResultList from "./views/ResultList.vue";
export default defineComponent({
  name: "App",
  components: {
    Tab,
    Title,
    Content,
    Button,
    List,
    Bottom,
    ResultList,
    TopButton,
  },
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
    const wrapperScrollInstance = ref(null) as Ref<unknown>;
    const topDisplay = ref("none");
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
    const onScroll = (e: MouseEvent) => {
      const { scrollTop } = e.target as HTMLDivElement;
      topDisplay.value = scrollTop > 50 ? "block" : "none";
    };
    const toTopHandler = () => {
        let top_value = 0,timer:number | null = null,scrollElement:HTMLDivElement | null = null;
        const updateTop = () => {
          top_value -= 20;
          (scrollElement as HTMLDivElement).scrollTop = top_value;
          if (top_value < 0) {
            if (timer) clearTimeout(timer);
            (scrollElement as HTMLDivElement).scrollTop = 0;
          } else {
            timer = setTimeout(updateTop, 1);
          }
        };
        if (wrapperScrollInstance.value && wrapperScrollInstance.value instanceof HTMLElement) {
           nextTick(() => {
              scrollElement = wrapperScrollInstance.value as HTMLDivElement;
              top_value = (wrapperScrollInstance.value as HTMLDivElement).scrollTop;
              updateTop();
           })
        }
    };
    return {
      lang,
      topDisplay,
      onScroll,
      wrapperScrollInstance,
      toTopHandler,
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
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  background: linear-gradient(45deg, #e9bf89, #c9a120, #c0710a);
}
::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  background: linear-gradient(180deg, #d33606, #da5d4d, #f0c8b8);
}
</style>
