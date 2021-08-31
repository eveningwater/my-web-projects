import React from "react";
const TitleComponent = (props) => {
    let TagName = `h${ props.level || 1 }`;
    let newProps = {...props};
    delete newProps.level;
    return (
        <React.Fragment>
            <TagName {...newProps}></TagName>
        </React.Fragment>
    )
}
export default TitleComponent;