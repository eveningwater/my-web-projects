const BASE_GITHUB_URL = "https://github.com/eveningwater/";
export const githubURL = BASE_GITHUB_URL + "my-web-projects/tree/master/50-mini-web-website";
export type LinkItemType = Array<{ text:string;href:string }>;
export type LinkListType = {
    en:LinkItemType;
    zh:LinkItemType;
};
export const linkListData:LinkListType = {
    "en":[
        { text:"Personal website",href:"https://www.eveningwater.com"},
        { text:"ewColorPicker",href:"https://eveningwater.github.io/ew-color-picker/"},
        { text:"To-offer Algorithm",href:"https://eveningwater.github.io/to-offer/"},
        { text:"jue jin",href:"https://juejin.cn/user/4054654613988718"},
        { text:"segment fault",href:"https://segmentfault.com/u/xishui_5ac9a340a5484"},
        { text:"zhi hu",href:"https://www.zhihu.com/people/eveningwater"},
        { text:"blog-1",href:"https://eveningwater.github.io/"},
        { text:"blog-2",href:"https://www.cnblogs.com/eveningwater/"},
        { text:"github",href:BASE_GITHUB_URL },
        { text:"gitee",href:"https://gitee.com/eveningwater/" },
    ],
    "zh":[
        { text:"个人网站",href:"https://www.eveningwater.com"},
        { text:"颜色选择器",href:"https://eveningwater.github.io/ew-color-picker/"},
        { text:"剑指offer算法总结",href:"https://eveningwater.github.io/to-offer/"},
        { text:"掘金",href:"https://juejin.cn/user/4054654613988718"},
        { text:"思否",href:"https://segmentfault.com/u/xishui_5ac9a340a5484"},
        { text:"知乎",href:"https://www.zhihu.com/people/eveningwater"},
        { text:"博客-1",href:"https://eveningwater.github.io/"},
        { text:"博客-2",href:"https://www.cnblogs.com/eveningwater/"},
        { text:"源码仓库",href:BASE_GITHUB_URL },
        { text:"码云",href:"https://gitee.com/eveningwater/" },
    ]
} 