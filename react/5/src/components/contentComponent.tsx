import React, { FunctionComponent,ReactNode } from "react";
import "../style/content.css";
interface propType {
    children?:ReactNode
}
const ContentComponent:FunctionComponent<propType> = (props:propType) => {
    return (
        <p className="content">{ props.children }</p>
    )
}
export default ContentComponent;