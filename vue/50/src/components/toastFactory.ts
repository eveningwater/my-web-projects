import ToastConstructor from "./Toast.vue";
import { render } from "vue"
interface ToastOption {
    visible:boolean;
    showClose:boolean;
    message:string;
    left:number;
    top:number;
    closeTime:number;
    isRenderHTML:boolean;
}
type ToastInstance = {
    onClose:Function;
}
const toastInstances:Array<ToastInstance> = [];
let seed = 1;
export function Toast(option:ToastOption){
    const defaultOption = {
        showClose:false,
        closeTime:200,
        visible:true,
        isRenderHTML:false,
        type:"default"
    }
    const finalOption = { ...defaultOption,...option };
}