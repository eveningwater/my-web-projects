import { createUUID } from "./uuid";

export const renderList = [
    {
        key: createUUID(),
        value: `这是一个自定义的输入框组件:<CustomInput placeholder="请输入内容" className="base-input"/></CustomInput>这是一个自定义的输入框组件:<CustomInput placeholder="请输入内容" className="base-input" value="123"/></CustomInput>`
    },
    {
        key: createUUID(),
        value: `这是一个自定义的标签组件:<CustomTag className="base-tag" color="#2396ef"/ value="标签1"></CustomTag>这是一个自定义的标签组件:<CustomTag className="base-tag" color="#2396ef" value="标签2"/></CustomTag>`
    },
    {
        key: createUUID(),
        value: `这是一个自定义的输入框组件:<CustomInput placeholder="请输入内容" className="base-input" value="123"/></CustomInput>这是一个自定义的输入框组件:<CustomInput placeholder="请输入内容" className="base-input" value="123"/></CustomInput>`
    },
    {
        key: createUUID(),
        value: `这是一个自定义的标签组件:<CustomTag className="base-tag" color="#2396ef" value="标签1"/></CustomTag>这是一个自定义的标签组件:<CustomTag className="base-tag" color="#2396ef" value="标签2"/></CustomTag>`
    },
    {
        key: createUUID(),
        value: `<CustomTag className="base-tag" color="#2396ef" value="标签1"/></CustomTag>这是一个自定义的标签组件:<CustomTag className="base-tag" color="#2396ef" value="标签2"/></CustomTag>`
    },
]