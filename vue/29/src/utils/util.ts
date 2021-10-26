/**
 * 
 * @param fn 
 * @param delay 
 * @returns 
 */
export function throttle(fn:Function,delay:number){
    let timer:any = null,last:number = 0;
    return function<T>(this:Function,...args:Array<T>) {
        let now = +new Date();
        if(last && now < last + delay){
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this,args);
            },delay);
        }else{
            last = now;
            fn.apply(this,args);
        }
    }
}