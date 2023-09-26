export const codeTemplate = {
    'js': (options: IFormValue) => ({
        html: Array.from({ length: options.inputNumber }).map((_, i) => options.inputContent[i]).map(item => `<input type="text" value="${item}"/>\n`).join(''),
        js: `
const spaceRule = {
    digit: ${options.digit},
    rule: /${options.rule.split('+').map(item => `(\\d{${Number(item)},})`).reduce((res, item) => (res += item, res), '')}/g,
    symbolNumber: ${options.symbolNumber},
    symbol: '${options.symbol}'
};
const allInputs = document.querySelectorAll('input');
allInputs.forEach(item => {
    const v = item.value;
    const { symbolNumber, symbol, rule } = spaceRule;
    item.value = v.replace(rule, (...args) => args?.slice(1, args.length - 2)?.join(symbol.repeat(symbolNumber)));
})`
    }),
    'vue2': (options: IFormValue) => ({
        html: Array.from({ length: options.inputNumber }).map((_, i) => options.inputContent[i]).map(_ => `<input type="text" v-model="onFormatValue('${_}')" />\n`).join(''),
        js: `
const spaceRule = {
    digit: ${options.digit},
    rule: '${options.rule}',
    symbolNumber: ${options.symbolNumber},
    symbol: '${options.symbol}'
};
export default {
    methods:{
        onFormatValue(item){
            const { symbolNumber,symbol,rule } = spaceRule;
            const regExp = new RegExp(\`\${rule.split('+').map(item => \`(\\\\d{\$\{Number(item)\},})\`).reduce((res, item) => (res += item, res), '')}\`, 'g');
            const formatValue = item.replace(regExp, (...args) => args?.slice(1, args.length - 2)?.join(symbol.repeat(symbolNumber)));
            return formatValue;
        }
    }
}
      `
    }),
    'vue3': (options: IFormValue) => ({
        html: Array.from({ length: options.inputNumber }).map((_, i) => options.inputContent[i]).map(_ => `<input type="text" :value="onFormatValue('${_}')" />\n`).join(''),
        js: `
const spaceRule = {
    digit: ${options.digit},
    rule: '${options.rule}',
    symbolNumber: ${options.symbolNumber},
    symbol: '${options.symbol}'
};
const onFormatValue = computed(() => (item) => {
    const { symbolNumber,symbol,rule } = spaceRule;
    const regExp = new RegExp(\`\${rule.split('+').map(item => \`(\\\\d{\$\{Number(item)\},})\`).reduce((res, item) => (res += item, res), '')}\`, 'g');
    const formatValue = item.replace(regExp, (...args) => args?.slice(1, args.length - 2)?.join(symbol.repeat(symbolNumber)));
    return formatValue;
})
      `
    }),
    'react': (options: IFormValue) => ({
        html: '',
        js: `
const spaceRule = {
    digit: ${options.digit},
    rule: '${options.rule}',
    symbolNumber: ${options.symbolNumber},
    symbol: '${options.symbol}'
};
const FormatInput = () => {
    const onFormatValue = React.useCallback((value) => {
        const { symbolNumber,symbol,rule } = spaceRule;
        const regExp = new RegExp(\`\${rule.split('+').map(item => \`(\\\\d{\$\{Number(item)\},})\`).reduce((res, item) => (res += item, res), '')}\`, 'g');
        const formatValue = value.replace(regExp, (...args) => args?.slice(1, args.length - 2)?.join(symbol.repeat(symbolNumber)));
        return formatValue;
    },[])
    return (
        ${Array.from({ length: options.inputNumber }).map((_, i) => options.inputContent[i]).map(_ => `<input type="text" value={onFormatValue('${_}')} />`).join('')}
    )
}
export default FormatInput;
        `
    }),
}

export const demoCodeTemplate = {
    'js': (options: IFormValue) => ({
        html: Array.from({ length: options.inputNumber }).map((_, i) => options.inputContent[i]).map(item => `<input type="text" value="${item}"/>\n`).join(''),
        js: `
const spaceRule = {
    digit: ${options.digit},
    rule: /${options.rule.split('+').map(item => `(\\d{${Number(item)},})`).reduce((res, item) => (res += item, res), '')}/g,
    symbolNumber: ${options.symbolNumber},
    symbol: '${options.symbol}'
};
const allInputs = document.querySelectorAll('input');
allInputs.forEach(item => {
    const v = item.value;
    const { symbolNumber, symbol, rule } = spaceRule;
    item.value = v.replace(rule, (...args) => args?.slice(1, args.length - 2)?.join(symbol.repeat(symbolNumber)));
})`
    }),
    'vue2': (options: IFormValue) => ({
        html: Array.from({ length: options.inputNumber }).map((_, i) => options.inputContent[i]).map(_ => `<input type="text" v-model="onFormatValue('${_}')" />\n`).join(''),
        js: `
const spaceRule = {
    digit: ${options.digit},
    rule: '${options.rule}',
    symbolNumber: ${options.symbolNumber},
    symbol: '${options.symbol}'
};
new Vue({
    el:"#app",
    methods:{
        onFormatValue(item){
            const { symbolNumber,symbol,rule } = spaceRule;
            const regExp = new RegExp(\`\${rule.split('+').map(item => \`(\\\\d{\$\{Number(item)\},})\`).reduce((res, item) => (res += item, res), '')}\`, 'g');
            const formatValue = item.replace(regExp, (...args) => args?.slice(1, args.length - 2)?.join(symbol.repeat(symbolNumber)));
            return formatValue;
        }
    }
});
      `
    }),
    'vue3': (options: IFormValue) => ({
        html: Array.from({ length: options.inputNumber }).map((_, i) => options.inputContent[i]).map(_ => `<input type="text" :value="onFormatValue('${_}')" />\n`).join(''),
        js: `
const spaceRule = {
    digit: ${options.digit},
    rule: '${options.rule}',
    symbolNumber: ${options.symbolNumber},
    symbol: '${options.symbol}'
};
Vue.createApp({
    setup() {
      const onFormatValue = Vue.computed(() => (item) => {
        const { symbolNumber,symbol,rule } = spaceRule;
        const regExp = new RegExp(\`\${rule.split('+').map(item => \`(\\\\d{\$\{Number(item)\},})\`).reduce((res, item) => (res += item, res), '')}\`, 'g');
        const formatValue = item.replace(regExp, (...args) => args?.slice(1, args.length - 2)?.join(symbol.repeat(symbolNumber)));
        return formatValue;
      })
      return {
        onFormatValue
      }
    }
  }).mount('#app')
      `
    }),
    'react': (options: IFormValue) => ({
        html: '',
        js: `
const spaceRule = {
    digit: ${options.digit},
    rule: '${options.rule}',
    symbolNumber: ${options.symbolNumber},
    symbol: '${options.symbol}'
};
const FormatInput = () => {
    const onFormatValue = React.useCallback((value) => {
        const { symbolNumber,symbol,rule } = spaceRule;
        const regExp = new RegExp(\`\${rule.split('+').map(item => \`(\\\\d{\$\{Number(item)\},})\`).reduce((res, item) => (res += item, res), '')}\`, 'g');
        const formatValue = value.replace(regExp, (...args) => args?.slice(1, args.length - 2)?.join(symbol.repeat(symbolNumber)));
        return formatValue;
    },[])
    return (
        ${Array.from({ length: options.inputNumber }).map((_, i) => options.inputContent[i]).map(_ => `<input type="text" value={onFormatValue('${_}')} />`).join('')}
    )
}
const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<FormatInput />);
        `
    }),
}

export type CodeTemplateKey = keyof typeof codeTemplate;

export const codeTypeList = Object.keys(codeTemplate) as CodeTemplateKey[];

export const selectCodeTypeList = codeTypeList.map(item => ({ label: item, value: item }))