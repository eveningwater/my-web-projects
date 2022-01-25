import ToastVue from "./Toast.vue";
import { render } from "vue"
interface ToastOption {
    visible:Boolean;
    showClose:Boolean;
    message:string;
    left:number;
    top:number;
    closeTime:number;
}
export function Toast(options:ToastOption){

}