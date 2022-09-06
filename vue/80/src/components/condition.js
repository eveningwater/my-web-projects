export const formData = [
    {
        "elementType": "el-select",
        "selectList": [
            {
                "label": "小王",
                "value": "name"
            }
        ],
        "placeholder": "请选择姓名",
        "modelValue": "",
        "multiple": false,
        "eventName":"change",
        "eventHandler":(event,item,vm) => {
             console.log(event,item,vm);
        },
        "clearable":true,
        "size":"mini"
    },
    {
        "elementType": "el-select",
        "selectList": [
            {
                "label": "包含",
                "value": "Contains"
            },
            {
                "label": "开头是",
                "value": "StartsWith"
            },
            {
                "label": "结尾是",
                "value": "EndsWith",
            },
            {
                "label": "不包含",
                "value": "NotContains",
            },
            {
                "label": "开头不是",
                "value": "NotStartsWith",
            },
            {
                "label": "等于",
                "value": "Equal",
            },
            {
                "label": "不等于",
                "value": "NotEqual",
            },
            {
                "label": "大于",
                "value": "GreaterThan",
            },
            {
                "label": "大等于",
                "value": "GreaterThanOrEqual",
            },
            {
                "label": "小于",
                "value": "LessThan",
            },
        ],
        "placeholder": "请选择权限",
        "modelValue": "",
        "multiple": false,
        "eventName":"change",
        "eventHandler":(event) => {
             console.log(event);
        },
        "clearable":true,
        "size":"mini"
    },
    {
        "elementType": "el-select",
        "selectList": [
            {
                "label": "小王",
                "value": "name"
            }
        ],
        "placeholder": "请选择昵称",
        "modelValue": "",
        "multiple": true,
        "eventName":"change",
        "eventHandler":(event) => {
             console.log(event);
        },
        "clearable":true,
        "size":"mini"
    },
    {
        "elementType": "el-button",
        "modelValue": "",
        "eventName":"click",
        "type":"text",
        "eventHandler":(event,item,vm) => {
             console.log(event,item,vm);
        },
        "text":"<i class='el-icon-plus'></i>分组",
        "size":"mini"
    }
]