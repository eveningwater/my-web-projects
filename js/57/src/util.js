
import axios from 'axios';

export let token = null;

let getTokenPromise = null;
/**
 * 获取token
 * @returns 
 */
export const getToken = () => {
    if(!getTokenPromise){
        getTokenPromise = axios.get('/api/token').then(res => {
            token = res.data.token;
            return token;
        })
    }
    return getTokenPromise;
}
/**
 * 获取兄弟元素
 * @param {*} el 
 * @returns 
 */
export const siblings = el => [].filter.call(el.parentElement.children,ele => el !== ele); 
/**
 * 判断是否含有类名
 * @param {*} el 
 * @param {*} className 
 * @returns 
 */
export const hasClass = (el,className) => {
    return new RegExp(" " + el.className + "").test(" " + className + " ");
}
/**
 * 节流
 * @param {*} fn 
 * @param {*} time 
 * @returns 
 */
export const throttle = (fn,time = 1000) => {
    let done = false;
    return (...args) => {
        if(!done){
            fn.call(this,...args);
            done = true;
        }
        setTimeout(() => {
            done = false;
        },time)
    }
}

/**
 * 装饰器函数节流
 * @param {*} time 
 * @returns 
 */
export const decoratorThrottle = (time = 1000) => {
    return (target,prop) => {
        const oldMethod = target[prop];
        let lastActionTime = 0;

        target[prop] = function(...args){
            let currentTime = Date.now();

            if(currentTime - lastActionTime > time){
                oldMethod.call(this,...args);
                lastActionTime = currentTime;
            }
        }
        return target;
    }
}