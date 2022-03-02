import React, { useEffect } from "react";
import { SyntheticEvent, useState } from "react";
import { FunctionComponent, ReactNode } from "react";
import "./checkbox.css";
interface PropType {
    disabled?:boolean;
    children?:ReactNode;
    value:boolean;
    onChange?:Function;
}
const CheckBox:FunctionComponent<PropType> = (props:PropType) => {
    const { value,disabled } = props;
    const [checkValue,setCheckValue] = useState(value);
    const onClickHandler = (e:SyntheticEvent) => {
        if(disabled)return;
        const { nativeEvent:{ target } } = e;
        const { checked } = target as HTMLInputElement;
        if(typeof checked !== "undefined"){
            setCheckValue(checked);
            props.onChange && props.onChange(checked);
        }
    }
    useEffect(() => {
        if(value !== checkValue){
            setCheckValue(value);
        }
    },[value])
    return (
        <label className={`checkbox-wrapper ${ disabled ? "is-disabled" : ''}`} onClick={ onClickHandler }>
            <span className={`checkbox ${ checkValue ? 'checkbox-checked' : ''}`}>
                <input type="checkbox" checked={checkValue} disabled={props.disabled} onChange={onClickHandler} />
                <span className="checkbox-inner"></span>
            </span>
            { props.children }
        </label>
    )
}
export default CheckBox;