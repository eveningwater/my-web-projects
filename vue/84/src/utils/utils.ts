import { DialogApi } from 'naive-ui'
export const minMaxValue = (value: number, min = -Infinity, max = Infinity) =>
    Math.max(min, Math.min(value, max));
export const copyHandler = (str: string, dialog?: DialogApi) => {
    const confirm = (title = '温馨提示', content = '已复制到剪切板') => {
        dialog?.success({
            title: title,
            content: content,
            positiveText: '确定',
        });
    };
    const baseCopy = (copyText: string) =>
        new Promise<void>((resolve, reject) => {
            // 判断是否存在clipboard并且是安全的协议
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard
                    .writeText(copyText)
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        reject(new Error('复制失败'));
                    });
            } else {
                // 否则使用被废弃的execCommand
                const input = document.createElement('input') as HTMLInputElement;
                input.value = copyText;
                // 使input不在viewport，同时设置不可见
                input.style.position = 'absolute';
                input.style.left = '-9999px';
                input.style.top = '-9999px';
                document.body.append(input);
                input.focus();
                input.select();
                // 执行复制命令并移除文本框
                if (document.execCommand) {
                    document.execCommand('copy');
                    resolve();
                } else {
                    reject(new Error('复制失败'));
                }
                input.remove();
            }
        });
    baseCopy(str)
        .then(() => confirm())
        .catch(() => confirm('温馨提示', '复制失败'));
}