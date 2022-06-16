import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { on } from "./util";
type UpdateStateType = Dispatch<SetStateAction<boolean>>;
type RefType = MutableRefObject<HTMLElement | Element | null>;
const listenForOutsideClick = (listening:boolean,setListening:UpdateStateType,ref:RefType,setIsOpen:UpdateStateType) => {
    if(listening || !ref.current){
        return;
    }
    setListening(true);
    [`click`, `touchstart`].forEach(() => {
        on(document,"click",evt => {
            const current = ref.current  as HTMLElement,
                  node = evt.target as HTMLElement;
            if(current.contains(node)){
                return;
            }
            setIsOpen(false);
        })
    })
}
export default listenForOutsideClick;