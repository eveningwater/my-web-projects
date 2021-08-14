import React from "react";
const TitleComponent = (props) => {
    let TagName = `h${ props.level }`;
    return (
        <React.Fragment>
            <TagName>{ props.children }</TagName>
        </React.Fragment>
    )
}
export default TitleComponent;