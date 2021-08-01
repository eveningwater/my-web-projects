import emitter from "tiny-emitter/instance";

interface EmitterType {
    $on:(event:string,handler?:Function,ctx?:any) => void,
    $off:(event:string,handler?:Function,ctx?:any) => void,
    $emit:(event:string,handler?:Function,ctx?:any) => void,
    $once:(event:string,handler?:Function,ctx?:any) => void,
}
const emitterInstance:EmitterType = {
    $on:(event:string,handler?:Function,ctx?:any) => emitter.on(event,handler,ctx),
    $once:(event:string,handler?:Function,ctx?:any) => emitter.once(event,handler,ctx),
    $off:(event:string,handler?:Function,ctx?:any) => emitter.off(event,handler,ctx),
    $emit:(event:string,handler?:Function,ctx?:any) => emitter.emit(event,handler,ctx)
}
export default emitterInstance;