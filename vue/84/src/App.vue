<script setup lang="ts">
import { NGrid, NGridItem, NInput, NConfigProvider, NDialogProvider, NSelect, NSpace, NDescriptions, NDescriptionsItem, NScrollbar, NButton, NPageHeader, NBackTop, NLayoutFooter, NEl } from 'naive-ui'
import { minMaxValue } from './utils/utils'
import RuleForm from './components/ruleForm.vue';
import CodeEditor from './components/codeEditor.vue';
import { computed, ref } from 'vue';
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml'
import { CodeTemplateKey, demoCodeTemplate, selectCodeTypeList } from './const/code';
import { htmlTemplate } from './const/htmlTemplate';
import { defaultFormValue } from './config';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import Logo from './components/Logo.vue';
import { footerList } from './const/footerList';
import { cloneDeep } from 'lodash-es';

hljs.registerLanguage('html', html)
hljs.registerLanguage('javascript', javascript)
const formValue = ref<IFormValue>(cloneDeep(defaultFormValue))
const codeTypeValue = ref<CodeTemplateKey>('js')
const onSubmit = (v: IFormValue) => {
  formValue.value = cloneDeep(v);
}
const onFormatValue = computed(() => (item: number) => {
  const v = formValue.value.inputContent[minMaxValue(item, 0, formValue.value.inputNumber - 1)];
  if (typeof v !== 'string' || !v) {
    return v;
  }
  const regExp = new RegExp(`${formValue.value.rule.split('+').map(item => `(\\d{${Number(item)},})`).reduce((res, item) => (res += item, res), '')}`, 'g');
  const formatValue = v.replace(regExp, (...args) => args?.slice(1, args.length - 2)?.join(formValue.value.symbol.repeat(formValue.value.symbolNumber)));
  return formatValue;
})
const renderTemplateCode = computed(() => demoCodeTemplate[<CodeTemplateKey>(codeTypeValue.value)]({ ...(formValue?.value) }));
const onDownloadDemoHandler = async () => {
  const zip = new JSZip();
  zip.file(`${codeTypeValue.value}-demo.html`, htmlTemplate(renderTemplateCode.value.html, renderTemplateCode.value.js, codeTypeValue.value));
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${codeTypeValue.value}-demo.zip`);
}
</script>

<template>
  <n-config-provider :hljs="hljs">
    <n-dialog-provider>
      <n-scrollbar style="max-height:100vh">
        <n-page-header class="header">
          <template #avatar>
            <logo />
          </template>
          <template #title>
            输入框插入符号
          </template>
        </n-page-header>
        <n-descriptions label-placement="top" title="需求描述:" class="description">
          <n-descriptions-item>
            页面当中存在多个输入框，输入框的 value 值是一个数值组成的字符串（盲猜应该是身份证号码），这个字符串的位数是 15 位或者是 18 位，例如:'621848063680370'(15
            位)和'621848063688370808'(18 位)，然后默认的值是这样的，现在问题来了，需求希望在这些数值中插入符号(比如当前是空白)，比如 15 位的数字就按照 6 + 6 + 3
            的格式分隔，分隔的时候就使用符号。比如'621848063680370'分隔后应该变成'621848 063680 370',也就是数字位数到了第 6 位就加个空白符号分隔，...依次类推，而 18
            位数字的分割规则则是:6 + 4 + 4 + 4。比如'621848063688370808'应该分隔成'621848 0636 8837 0808'。
          </n-descriptions-item>
        </n-descriptions>
        <main class="main">
          <n-grid x-gap="12" y-gap="6" cols="2" item-responsive>
            <n-grid-item span="2 800:1">
              <h2 class="text-align-center">定义插入规则</h2>
              <rule-form @on-submit="onSubmit"></rule-form>
            </n-grid-item>
            <n-grid-item span="2 800:1">
              <h2 class="text-align-center">预览效果</h2>
              <section class="preview-container">
                <n-grid y-gap="6" :cols="1">
                  <n-grid-item v-for="(item, index) in formValue.inputContent" :key="`input-${item}-${index}`">
                    <n-input :value="onFormatValue(index)" class="block"></n-input>
                  </n-grid-item>
                </n-grid>
              </section>
            </n-grid-item>
          </n-grid>
          <n-grid cols="1" item-responsive>
            <n-grid-item>
              <n-space align="center" justify="center">
                <h2 class="text-align-center">代码</h2>
                <n-select :options="selectCodeTypeList" class="code-select" placeholder="请选择代码类型"
                  v-model:value="codeTypeValue"></n-select>
                <n-button type="primary" @click="onDownloadDemoHandler">下载&nbsp;{{ codeTypeValue }}&nbsp;demo</n-button>
              </n-space>
              <code-editor :formValue="formValue" :code-type="codeTypeValue"></code-editor>
            </n-grid-item>
          </n-grid>
          <n-back-top :right="15" :bottom="15" />
        </main>
        <n-layout-footer class="footer">
          <n-space>
            <n-el tag="span">Copyright ©2023</n-el>
            <n-button v-for="(item, index) in footerList" text tag="a" :href="item.url" target="_blank" type="info"
              :key="item.text + index">{{ item.text }}</n-button>
          </n-space>
        </n-layout-footer>
      </n-scrollbar>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped></style>
