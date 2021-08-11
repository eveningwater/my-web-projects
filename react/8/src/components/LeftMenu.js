import { useState } from "react";
const LeftMenu = (props) => {
    const icons = ["open","close"];
    const [status,setStatus] = useState("close");
    const onChangeHandler = (value) => {
        const changeValue = icons.filter(v => v !== value)[0];
        setStatus(changeValue);
        props.onClick && props.onClick(changeValue);
    }
    return (
        <div className="circle-container">
            <div className="circle">
                {
                    icons.map((icon,index) => (
                        <i key={icon + index} className={`${ icon } ${ status !== icon ? 'hidden' : ''}`} onClick={ onChangeHandler.bind(this,icon) }></i>
                    ))
                }
            </div>
        </div>
    )
}
export default LeftMenu;