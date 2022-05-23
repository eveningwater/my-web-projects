import ToastConstructor from "./Toast.vue";
import { createVNode,render } from "vue"
interface ToastOption {
    visible:boolean;
    showClose:boolean;
    message:string;
    left:number;
    top:number;
    closeTime:number;
    el:Element | string;
    type:string;
}
let timer:number | null = null;
export function Toast(option:Partial<ToastOption> | string){
    const defaultOption = {
        showClose:false,
        closeTime:200,
        visible:true,
        type:"default"
    }
    let container:Element = document.querySelector("#tn-toast-container") || document.body;
    if(typeof option !== "string" && typeof option.el === "string"){
        const mountEl = document.querySelector(option.el);
        if(mountEl){
            container = mountEl;
        }
    }else if(typeof option !== "string" && option.el instanceof Element){
        container = option.el;
    }
    let finalOption:Partial<ToastOption> = {};
    if(typeof option === "object" && option){
        const { el,...rest } = option;
        finalOption = { ...defaultOption,...rest };
    }else{
        finalOption = { ...defaultOption,message:option };
    }
    const node = createVNode(ToastConstructor,finalOption);
    const div = document.createElement("div");
    container.appendChild(div);
    render(node,div);
    if(typeof finalOption.closeTime === "number" && finalOption.closeTime > 0 && !finalOption.showClose){
        timer = window.setTimeout(() => {
            render(null,div);
            div.remove();
        },finalOption.closeTime * 10);
    }else{
        return () => { 
            render(null,div);
            div.remove();
        };
    }
}