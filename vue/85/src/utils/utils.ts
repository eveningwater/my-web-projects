import ewWebsiteBaseUtils from "./baseUtils";

const util = new ewWebsiteBaseUtils();

export const isString = util.isString;
export const isBoolean = util.isBoolean;
export const handleClassName = util.handleClassName.bind(util);
export const isObject = util.isObject;

export const createUUID = () => (Math.random() * 10000000).toString(16).substring(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substring(2, 5);

export const formatNumber = (n: number | string) => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};
export const formatTime = (date: Date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return (
        [year, month, day].map(formatNumber).join('-') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    );
}

export const isEmptyObject = <T>(v: T) => isObject(v) && Object.keys(v as object).length === 0;
export const toTop = (top: HTMLElement, scrollEl?: HTMLElement) => {
    let scrollElement = scrollEl
        ? scrollEl
        : document.documentElement || document.body,
        timer: ReturnType<typeof setTimeout> | null = null,
        backTop = true;
    const onScrollHandler = () => {
        const oTop = scrollElement.scrollTop;
        // 可能有10px的偏差
        const clientHeight = Math.max(scrollElement?.scrollHeight - scrollElement.offsetHeight - 10, 0);
        if (oTop > clientHeight) {
            top.style.visibility = 'visible';
        } else {
            top.style.visibility = 'hidden';
        }
        if (!backTop && timer) {
            clearTimeout(timer);
        }
        backTop = true;
    };
    const toTopHandler = () => {
        const oTop = scrollElement.scrollTop,
            speed = Math.floor(-oTop / 6);
        scrollElement.scrollTop = oTop + speed;
        if (oTop === 0) {
            timer && clearTimeout(timer);
            top.style.visibility = 'hidden';
            backTop = false;
        } else {
            timer = setTimeout(toTopHandler, 30);
        }
    };
    util.on(top, 'click', toTopHandler);
    util.on(scrollElement || window, 'scroll', onScrollHandler);
}

export const $ = util.$;