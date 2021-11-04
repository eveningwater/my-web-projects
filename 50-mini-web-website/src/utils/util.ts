export const isServer = typeof window === "undefined";
export type ElementType = HTMLElement | Document | Window;
export function on(element:ElementType,type:string,handler:EventListenerOrEventListenerObject,useCapture:boolean = false){
    if(element && type && handler){
        element.addEventListener(type,handler,useCapture);
    }
}
export function off(element:ElementType,type:string,handler:EventListenerOrEventListenerObject,useCapture:boolean = false){
    if(element && type && handler){
        element.removeEventListener(type,handler,useCapture);
    }
}