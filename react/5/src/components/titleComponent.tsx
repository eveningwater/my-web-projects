import React, { FunctionComponent,ReactNode }from "react";
interface propType {
    level:number,
    children?:ReactNode
}
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
const TitleComponent:FunctionComponent<propType> = (props:propType) => {
    let TagName = `h${ props.level }` as HeadingTag;
    return (
        <React.Fragment>
            <TagName>{ props.children }</TagName>
        </React.Fragment>
    )
}
export default TitleComponent;