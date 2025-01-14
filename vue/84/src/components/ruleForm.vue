<script setup lang="ts">
import { ref, watch } from 'vue'
import { FormInst, NInput, NFormItem, NButton, NForm, NInputNumber, FormItemRule, NSpace, NGrid, NGi } from 'naive-ui'
import { minMaxValue } from '../utils/utils'
import { defaultFormValue } from '../config';
import { cloneDeep } from 'lodash-es'
const emit = defineEmits(['on-submit'])
const formRef = ref<FormInst | null>(null);
const formValue = ref(cloneDeep(defaultFormValue))
const rules = {
    digit: {
        required: true,
        message: '请选择位数',
        trigger: 'blur',
        type: 'number'
    },
    rule: {
        required: true,
        message: '请输入正确格式的规则，规则格式为: 数字 + 数字,并且所有数字加起来应该等于位数!',
        trigger: ['blur'],
        validator: (_: FormItemRule, value: string) => {
            const ruleRegExp = /[\d+\+\d+]/g;
            if (!ruleRegExp.test(value)) {
                return false;
            }
            const allNumber = value.split('+').map(Number).reduce((res, i) => (res += i, res), 0);
            if (allNumber !== formValue.value.digit) {
                return false;
            }
            return true;
        }
    },
    symbol: {
        required: true,
        message: '请选择插入符号，可以试试空白，或者-等',
        trigger: 'blur'
    },
    symbolNumber: {
        type: 'number',
        required: true,
        message: '请输入插入符号数',
        trigger: 'blur'
    },
    inputNumber: {
        required: true,
        message: '请输入文本框数',
        trigger: 'blur',
        type: 'number'
    },
    inputContent: [
        {
            required: true,
            message: '请输入文本框内容',
            trigger: 'blur',
            validator: (_: FormItemRule, value: string[]) => {
                if (value.some(item => Number.isNaN(Number(item)))) {
                    _.message = '请输入数字!';
                    return false;
                }
                if (value.some(item => item.replace(/\s+/g, '').length !== formValue.value.digit)) {
                    _.message = '内容长度应该与位数相同';
                    return false;
                }
                return true;
            }
        }
    ]
}
const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault()
    formRef.value?.validate((errors) => {
        if (!errors) {
            emit('on-submit', formValue.value);
        } else {
            console.log(errors)
        }
    })
}
const handleResetClick = () => {
    formRef.value?.restoreValidation();
    formValue.value = cloneDeep(defaultFormValue)
    emit('on-submit', formValue.value);
};
watch(() => formValue.value.inputNumber, (val, prevVal) => {
    const isAdd = val > prevVal;
    const v = cloneDeep(defaultFormValue).inputContent[0];
    for (let i = 0; i < Math.abs(val - prevVal); i++) {
        formValue.value.inputContent[isAdd ? 'push' : 'pop'](isAdd ? v : undefined)
    }
})
</script>

<template>
    <n-form ref="formRef" :model="formValue" :rules="rules" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" size="large">
        <n-form-item label="位数" path="digit">
            <n-input-number v-model:value="formValue.digit" placeholder="请输入位数" min="1" :precision="0" class="block" />
        </n-form-item>
        <n-form-item label="规则" path="rule">
            <n-input v-model:value="formValue.rule" placeholder="请输入规则，如: 15位则是6 + 6 + 3,中间以加号分开" />
        </n-form-item>
        <n-form-item label="插入符号" path="symbol">
            <n-input v-model:value="formValue.symbol" placeholder="请输入插入符号" />
        </n-form-item>
        <n-form-item label="插入符号数" path="symbolNumber">
            <n-input-number v-model:value="formValue.symbolNumber" placeholder="请输入插入符号位数" min="0" :precision="0"
                max="5" class="block" />
        </n-form-item>
        <n-form-item label="文本框数" path="inputNumber">
            <n-input-number v-model:value="formValue.inputNumber" placeholder="请输入文本框数" min="1" :precision="0" max="5"
                class="block" />
        </n-form-item>
        <n-form-item label="每个文本框内容" path="inputContent">
            <n-grid :cols="1" y-gap="6">
                <n-gi v-for="(_, index) in formValue.inputContent" :key="'input-content-' + index">
                    <n-input v-model:value="formValue.inputContent[minMaxValue(index, 0, formValue.inputNumber - 1)]"
                        placeholder="请输入文本框内容，应全部是数字，并且长度等于位数" class="block" />
                </n-gi>
            </n-grid>
        </n-form-item>
        <n-form-item style="display: flex; justify-content: center">
            <n-space>
                <n-button attr-type="button" @click="handleValidateClick">
                    确认
                </n-button>
                <n-button attr-type="button" @click="handleResetClick">重置</n-button>
            </n-space>
        </n-form-item>
    </n-form>
</template>

<style scoped></style>
