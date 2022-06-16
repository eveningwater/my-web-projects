import { FC, useState } from "react";
interface PropType {
    onClick:Function;
}
const Footer:FC<PropType> = (props:PropType) => {
    const typeList = [
        {
            label:"翻译",
            value:"translate"
        },
        {
            label:"清除",
            value:"clear"
        }
    ];
    const [currentValue,setCurrentValue] = useState("");
    const onClickHandler = (value:string) => {
        setCurrentValue(value);
        props.onClick && props.onClick(value);
    }
    return (
        <footer className="rt-footer">
            {
                typeList.map((item,index) => (
                    <button 
                        type="button" 
                        className={`rt-btn${currentValue === item.value ? ' checked' : ''}`} 
                        onClick={onClickHandler.bind(this,item.value)} 
                        key={item.value + index}
                    >{ item.label }</button>
                ))
            }
        </footer>
    )
}
export default Footer;