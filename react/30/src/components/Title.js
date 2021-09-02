import React from "react";
const Title = (props) => {
    const ComponentName = `h${ props.level || 1 }`;
    const newProps = {...props};
    delete newProps.level;
    return (
        <React.Fragment>
            <ComponentName {...newProps}></ComponentName>
        </React.Fragment>
    )   
}
export default Title;