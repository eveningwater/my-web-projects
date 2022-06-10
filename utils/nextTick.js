// 判断是否是一个函数
const isNative  = Ctor => typeof Ctor === 'function' && /native code/.test(Ctor.toString());
const callbacks = [];//存储回调
let pending = false;//执行任务的状态
const runCallback = () => {
    pending = true;//任务执行时将状态设置为true，代表任务已执行完成
    const newCallbacks = callbacks.slice(0);//获取存储回调函数的数组
    callbacks.length = 0;//清空回调函数任务队列
    //执行每一个任务
    newCallbacks.forEach(cb => cb());
}
// 每一个回调即一个微任务，利用Promise.then来添加
let microTimeFunc = function(){};//定义微任务
let macroTimeFunc = function(){};//定义宏任务
//有时候还是需要将回调函数当做宏任务执行的，设定一个标识代表是添加到宏任务队列当中去
let useMacroTask = false;

// 默认使用setImmediate来实现宏任务,这里还省略了一个判断分支
// 如果不支持setImmediate，则使用MessageChannel或者MutationObserver来实现
if(typeof setImmediate !== "undefined" && isNative(setImmediate)){
    macroTimeFunc = setImmediate(runCallback,0)
}else {
    macroTimeFunc = () => setTimeout(runCallback,0);
}


// 这里是当成微任务添加
if(typeof Promise !== "undefined" && isNative(Promise)){
    const p = Promise.resolve();
    microTimeFunc = () => p.then(runCallback); //因此将执行回调函数的的函数添加到微任务队列中
}else{
    microTimeFunc = macroTimeFunc;
}
// 回调函数如果有_withTask则当成宏任务执行
const withMacroTask = (handler) => {
    return handler._withTask || (handler._withTask = function(){
        useMacroTask = true;
        const res = handler.apply(null,arguments);
        useMacroTask = false;
        return res;
    })
}
export const nextTick = (cb,ctx) => {
    let _resolve;
    callbacks.push(() => {
        if(cb){
            try {
                cb.call(ctx);
            } catch (error) {
                //处理异常
            }
        }else if(_resolve){
            _resolve(ctx);
        }
    });//将回调添加到队列中
    // 执行回调
    if(!pending){
        pending = true;
        // 根据useMacroTask标识来代表是执行宏任务还是微任务
        if(useMacroTask){
            macroTimeFunc()
        }else{
            microTimeFunc();
        }
    }
    // 如果传入的回调不存在并且原生支持Promise则返回一个Promise
    if(!cb && typeof Promise !== "undefined"){
        return new Promise(resolve => (_resolve = resolve));
    }
}
// let name = "xiaoming";
// // 测试代码
// nextTick(() => console.log(name));
// name = "eveningwater"