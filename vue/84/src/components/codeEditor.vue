<script setup lang="ts">
import { NCode, NGrid, NGridItem, NButton, NIcon, NTooltip, useDialog } from 'naive-ui'
import { computed, toRefs } from 'vue';
import { CodeTemplateKey, codeTemplate } from '../const/code';
import { defaultFormValue } from '../config';
import { copyHandler } from '../utils/utils';
const dialog = useDialog()
const props = defineProps<{
  formValue?: IFormValue,
  codeType?: CodeTemplateKey
}>()
const { formValue, codeType } = toRefs(props);
const renderCode = computed(() => codeTemplate[<CodeTemplateKey>(codeType?.value || 'js')]({ ...(formValue?.value || defaultFormValue) }));
const onCopyHandler = (v: string) => {
  copyHandler(v, dialog);
}
</script>
<template>
  <n-grid x-gap="12" y-gap="6" :cols="codeType !== 'react' ? 2 : 1" item-responsive>
    <n-grid-item span="2 800:1" v-if="codeType !== 'react'">
      <h2 class="text-align-center">html代码</h2>
      <div class="code-container">
        <n-code :code="renderCode.html" language="html" show-line-numbers word-wrap />
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button type="primary" class="code-copy-btn" quaternary @click="onCopyHandler(renderCode.html)">
              <template #icon>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <path
                      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                      fill="currentColor"></path>
                  </svg>
                </n-icon>
              </template>
            </n-button>
          </template>
          复制代码
        </n-tooltip>
      </div>
    </n-grid-item>
    <n-grid-item :span="codeType !== 'react' ? '2 800:1' : '1'">
      <h2 class="text-align-center">js代码</h2>
      <div class="code-container">
        <n-code :code="renderCode.js" language="javascript" show-line-numbers word-wrap />
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button type="primary" class="code-copy-btn" quaternary @click="onCopyHandler(renderCode.js)">
              <template #icon>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <path
                      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                      fill="currentColor"></path>
                  </svg>
                </n-icon>
              </template>
            </n-button>
          </template>
          复制代码
        </n-tooltip>
      </div>
    </n-grid-item>
  </n-grid>
</template>