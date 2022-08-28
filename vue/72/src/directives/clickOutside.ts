
import { ComponentPublicInstance, DirectiveBinding, ObjectDirective } from 'vue';
import { isServer,on } from '../utils/util';
type DocumentHandler = <T extends MouseEvent|Event>(mouseup:T,mousedown:T) => void;
type FlushList = Map<HTMLElement,{ DocumentHandler:DocumentHandler,bindingFn:(...args:unknown[]) => unknown }>
const nodeList:FlushList = new Map();
let startClick:MouseEvent | Event;
if(!isServer){
    on(document,'mousedown',(e:MouseEvent | Event) => startClick = e);
    on(document,'mouseup',(e:MouseEvent | Event) => {
        for(const { DocumentHandler } of nodeList.values()){
            DocumentHandler(e,startClick);
        }
    });
}
const createDocumentHandler = (el:HTMLElement,binding:DirectiveBinding):DocumentHandler => {
    // the excluding elements
    let excludes:HTMLElement[] = [];
    if(binding.arg){
        if(Array.isArray(binding.arg)){
            excludes = binding.arg;
        }else{
            excludes.push(binding.arg as unknown as HTMLElement);
        }
    }
    return (mouseup,mousedown) => {
        // Maybe we can not considered the tooltip component,which is the popperRef type
        const popperRef = (binding.instance as ComponentPublicInstance<{ popperRef:NonNullable<HTMLElement> }>).popperRef;
        const mouseUpTarget = mouseup.target as Node;
        const mouseDownTarget = mousedown.target as Node;
        const isBinding = !binding || !binding.instance;
        const isExistTargets = !mouseUpTarget || !mouseDownTarget;
        const isContainerEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
        const isSelf = el === mouseUpTarget;
        const isContainByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
        const isTargetExcluded = excludes.length && (excludes.some(item => item.contains && item?.contains(mouseUpTarget)) || excludes.indexOf(mouseDownTarget as HTMLElement) > -1);
        if(isBinding || isExistTargets || isContainerEl || isSelf || isTargetExcluded || isContainByPopper)return;
        // the directive should binding a method or function
        binding.value();
    }
}
const setNodeList = (el:HTMLElement,binding:DirectiveBinding) => {
    nodeList.set(el,{
        DocumentHandler:createDocumentHandler(el,binding),
        bindingFn:binding.value
    })
}
const clickOutside:ObjectDirective = {
    beforeMount(el,binding){
        setNodeList(el,binding);
    },
    updated(el,binding){
        setNodeList(el,binding);
    },
    unmounted(el){
        nodeList.delete(el);
    }
}
export default clickOutside;