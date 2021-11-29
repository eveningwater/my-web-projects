export interface CommonLangType {
    "mode-dark-text":string;
    "mode-light-text":string;
    "lang-text":string;
    "time-before-text":string;
    "time-after-text":string;
    "date-day-text":string;
    "days":string [];
    "months":string [];
}
export interface LangTextType {
    "zh":Readonly<CommonLangType>;
    "en":Readonly<CommonLangType>;
}
export const langText = {
    'zh':{
        "mode-dark-text":"黑暗模式",
        "mode-light-text":"明亮模式",
        "lang-text":"中文",
        "time-before-text":"上午",
        "time-after-text":"下午",
        "date-day-text":"日",
        "days":["星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        "months":["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
    },
    'en':{
        "mode-dark-text":"dark mode",
        "mode-light-text":"light mode",
        "lang-text":"English",
        "time-before-text":"AM",
        "time-after-text":"PM",
        "date-day-text":"",
        "days":["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "months":["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
};