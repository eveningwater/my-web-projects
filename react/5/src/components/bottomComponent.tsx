import React,{ FunctionComponent,ReactNode } from "react";
import "../style/bottom.css";
interface PropType {
    children?:ReactNode,
    lang?:string
}
const BottomComponent:FunctionComponent<PropType> = (props:PropType) => {
    return (
        <div className="bottom" id="bottom">{ props.children }</div>
    )
}
export default BottomComponent;