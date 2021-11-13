interface TotalString {
    left:string;
    right:string;
}
interface ClassType {
    unit:string;
    text:string;
}
interface CommonType {
    title:string;
    total:TotalString;
    class:ClassType,
    unit:string;
    text:string;
}
interface LangItemType {
    label:string;
    value:string;
}
export interface LangType {
    "en":Array<LangItemType>;
    "zh":Array<LangItemType>;
}
export interface DataType {
    "en":CommonType;
    "zh":CommonType;
}
export const dwData:DataType = {
    "en":{
        "title":"Drink Water",
        "total":{
            "left":"Goal:",
            "right":"Liters"
        },
        "class":{
            "unit":"L",
            "text":"Remained"
        },
        "text":"Select how many glasses of water that you have drank",
        "unit":"ml"
    },
    "zh":{
        "title":"喝水",
        "total":{
            "left":"目标:",
            "right":"升"
        },
        "class":{
            "unit":"升",
            "text":"剩余"
        },
        "text":"选择您喝了多少杯水",
        "unit":"毫升"
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