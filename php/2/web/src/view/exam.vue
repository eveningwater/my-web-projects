<template>
  <main class="exam-main">
    <h1 class="exam-h1">Web前端HTML+CSS阶段测试</h1>
    <exam-row :gutter="16" class="exam-header">
      <exam-col :span="6">
        <p>答卷时间：120分钟</p>
      </exam-col>
      <exam-col :span="9">
        <exam-row>
          <exam-col :span="8">
            <div class="vertical-middle form-item-label">考生姓名：</div>
          </exam-col>
          <exam-col :span="16">
            <exam-input></exam-input>
          </exam-col>
        </exam-row>
      </exam-col>
      <exam-col :span="9">
        <exam-row>
          <exam-col :span="4">
            <div class="vertical-middle form-item-label">得分:</div>
          </exam-col>
          <exam-col :span="20">
            <exam-input></exam-input>
          </exam-col>
        </exam-row>
      </exam-col>
    </exam-row>
    <div class="exam-comment">
      <p>&lt;考试纪律&gt;</p>
      <p>※ 考试期间保证电脑和通讯设备处于关闭状态</p>
      <p>※ 不得进行任何形式的作弊，包括翻阅自己的笔记</p>
      <p>※ 考试结束试卷必须交回，不交回试卷者成绩无效</p>
    </div>
    <div class="exam-question">
      <section v-for="(item,index) in questionList" :key="index">
        <!-- 单选题 -->
        <template v-if="item.id === 1">
          <h1 class="exam-h1">{{ item.type }}</h1>
          <article>
            <div
              v-for="(que,secondIndex) in item.content"
              :key="secondIndex"
              class="exam-question-topic"
            >
              <h2 class="exam-h2">{{ que.question }}</h2>
              <template v-if="que.src">
                <img src="../assets/content/img-url.png" alt="图片加载中" title="图片加载中" />
              </template>
              <ul class="exam-question-answer">
                <li v-for="(answer,thirdIndex) in que.selectAnswer" :key="thirdIndex">{{ answer }}</li>
              </ul>
            </div>
          </article>
        </template>
        <!-- 多选题 -->
        <template v-else-if="item.id === 2">
          <h1 class="exam-h1">{{ item.type }}</h1>
          <article>
            <div
              v-for="(que,secondIndex) in item.content"
              :key="secondIndex"
              class="exam-question-topic"
            >
              <h2 class="exam-h2">{{ que.question }}</h2>
              <ul class="exam-question-answer">
                <li v-for="(answer,thirdIndex) in que.selectAnswer" :key="thirdIndex">{{ answer }}</li>
              </ul>
            </div>
          </article>
        </template>
        <template v-else-if="item.id === 3">
          <h1 class="exam-h1">{{ item.type }}</h1>
          <article>
            <div
              v-for="(que,secondIndex) in item.content"
              :key="secondIndex"
              class="exam-question-topic"
            >
              <h2 class="exam-h2">{{ que.question }}</h2>
              <table>
                <tbody>
                  <tr v-for="(answer,thirdIndex) in trRow(que.answer)" :key="thirdIndex">
                    <td v-for="(item,fourthIndex) in answer" :key="fourthIndex">
                      <exam-row :gutter="8">
                        <exam-col :span="12" class="exam-label-property">
                          <span>{{ item }}</span>
                        </exam-col>
                        <exam-col :span="12">
                          <exam-input></exam-input>
                        </exam-col>
                      </exam-row>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </template>
        <!-- 简答题 -->
        <template v-else-if="item.id === 4">
          <h1 class="exam-h1">{{ item.type }}</h1>
          <article>
            <div
              v-for="(que,secondIndex) in item.content"
              :key="secondIndex"
              class="exam-question-topic"
            >
              <h2 class="exam-h2">{{ que }}</h2>
              <exam-input tagType="textarea" :col="8"></exam-input>
            </div>
          </article>
        </template>
        <!-- 操作题 -->
        <template v-else-if="item.id === 5">
            <h1 class="exam-h1">{{ item.type }}</h1>
            <div
              v-for="(que,secondIndex) in item.content"
              :key="secondIndex"
              class="exam-question-topic"
            >
              <template v-if="isString(que)">
                <h2 class="exam-h2">{{ que }}</h2>
                <exam-input tagType="textarea" :col="8"></exam-input>
              </template>
              <template v-else-if="que.id === 1">
                  <h2 class="exam-h2">{{ que.question }}</h2>
                  <div class="exam-code-container">
                     <p>代码如下:</p>
                     <p>
                        <img src="../assets/content/code.png" alt="图片加载中" title="图片加载中" />
                     </p>
                  </div>
                  <exam-input tagType="textarea" :col="8"></exam-input>
              </template>
              <template v-else-if="que.id === 2">
                <h2 class="exam-h2">{{ que.question }}</h2>
                <ul class="exam-question-requirement">
                  <li v-for="(requirement,thirdIndex) in que.requirement" :key="thirdIndex">{{ requirement }}</li>
                </ul>
                <div class="exam-comment">
                  <p v-for="(com,index) in que.comment" :key="index">{{ com }}</p>
                </div>
                <exam-input tagType="textarea" :col="8"></exam-input>
              </template>
            </div>
        </template>
      </section>
    </div>
    <div class="text-align-center pb-40">
      <exam-button nativeType="button" type="primary" size="large" isLong>提交</exam-button>
    </div>
    <exam-radio>单选</exam-radio>
  </main>
</template>
<script src="../js/exam.js"></script>
<style>
@import url("../css/exam.css");
</style>