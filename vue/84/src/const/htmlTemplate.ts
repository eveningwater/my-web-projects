import { CodeTemplateKey } from "./code";

export const getScriptTemplate = (type: CodeTemplateKey) => {
    if (type.includes('vue')) {
        const src = type === 'vue2' ? 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.7/vue.min.js' : 'https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.global.min.js'
        return `<script src="${src}"></script>`
    } else if (type === 'react') {
        return `<script src="https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.22.17/babel.min.js"></script>`
    } else {
        return ''
    }
}
export const htmlTemplate = (htmlContent: string, jsContent: string, type: CodeTemplateKey) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>输入框生成插入符号&nbsp;${type}&nbsp;demo</title>
    <style>
        body {
            margin: 0;
        }

        input {
            padding: 8px 24px;
            border: 0;
            border-radius: 15px;
            background-color: #fefefe;
            color: rgba(0, 0, 0, .85);
            margin: 8px 0;
            border: 1px solid #232323;
            min-width: 250px;
        }
    </style>
</head>
<body>
    <div id="app">${htmlContent}</div>
    ${getScriptTemplate(type)}
    <script type="${type === 'react' ? 'text/babel' : 'text/javascript'}">${jsContent}</script>
</body>
</html>`