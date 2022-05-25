export interface LangItemType {
    label:string;
    value:string;
}
export interface LangType {
    "en":Array<LangItemType>;
    "zh":Array<LangItemType>;
}
export interface PageInfoItemType {
    titleStart:string;
    titleEnd:string;
    countStart:string;
    countEnd:string;
    btnText:string;
}
export interface PageInfoType {
    "en":PageInfoItemType,
    "zh":PageInfoItemType
}
export const pageInfo:PageInfoType = {
    "en":{
        "titleStart":"Double click on the image to",
        "titleEnd":"it",
        "countStart":"you loved it",
        "countEnd":"times",
        "btnText":"Love this small Dog?"
    },
    "zh":{
        "titleStart":"双击图片为了",
        "titleEnd":"它",
        "countStart":"你爱它",
        "countEnd":"次",
        "btnText":"爱这只小狗吗?"
    }
}
export const langData:LangType = {
    "en":[
        { label:"en",value:"en" },
        { label:"zh",value:"zh" }
    ],
    "zh":[
        { label:"英文",value:"en" },
        { label:"中文",value:"zh" }
    ]
}