<template>
  <ul class="result-list">
    <li
      class="result-item"
      v-for="(item, index) in parseAnswerList"
      :key="item + index"
      :class="`answered-${
        item.userAnswer === item.correctValue ? '' : 'in'
      }correctly`"
    >
      <span class="result-question">
        <span class="order">{{ (index + 1) }}.</span>
        {{ item.question }}
      </span>
      <div class="result-item-wrapper">
        <span class="result-correct-answer">
          {{ item.correctTitle }}:
          <span class="ml-5 result-correct-answer-value">{{
            item.correctValue
          }}</span>
        </span>
        <span class="result-user-answer">
          {{ item.userTitle }}:
          <span class="ml-5 result-user-answer-value">{{
            item.userAnswer
          }}</span>
        </span>
        <span
          class="inline-answer"
          :class="`answered-${
            item.userAnswer === item.correctValue ? '' : 'in'
          }correctly`"
        >
          {{ item.message }}
        </span>
        <div class="render-content" v-html="item.detail"></div>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, watch } from "vue";
interface ParseListType {
  question?: string;
  userAnswer?: string;
  userTitle?: string;
  correctTitle?: string;
  correctValue?: string;
  detail?: string;
  message?: string;
}
export default defineComponent({
  props: {
    list: {
      type: Object as PropType<ParseListType>,
      default: [],
    },
  },
  setup(props) {
    const state = reactive({
      parseAnswerList: props.list,
    });
    watch(
      () => props.list,
      (val) => {
        state.parseAnswerList = val;
      }
    );
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
.result-list {
  list-style: none;
  padding-left: 0;
  width: 100%;
  max-width: 600px;
  .result-item-wrapper,
  .result-wrapper .result-list .result-item {
    display: flex;
    flex-direction: column;
  }
  .result-item-wrapper {
    .inline-answer {
      padding: 15px 25px;
      max-width: 250px;
      margin: 1rem 0;
      border-radius: 5px;
      &.answered-incorrectly {
        background-color: #d82323;
      }
      &.answered-correctly {
        background-color: #4ee24e;
      }
    }
    .font {
      font-weight: bold;
      font-size: 20px;
    }
    padding: 25px;
    .result-user-answer {
      letter-spacing: 1px;
      .result-user-answer-value {
        .font();
      }
    }
    .result-correct-answer .result-correct-answer-value {
      .font();
    }
  }
  .result-question {
    display: block;
    padding: 25px;
    background-color: #1b132b;
    font-size: 22px;
    letter-spacing: 2px;
    border-radius: 4px 4px 0 0;
    .order {
      margin-right: 8px;
    }
  }
  .result-item {
    background-color: #020304;
    border-radius: 4px;
    margin-bottom: 2rem;
    color: #fff;
  }
  .result-content .render-content {
    max-width: 600px;
    line-height: 1.5;
    font-size: 18px;
  }
}
</style>