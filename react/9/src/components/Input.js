import { Component } from "react";
import "./input.css";
import { filterClassName } from "../utils/util"
export default class Input extends Component {
    constructor(props){
        super(props);
        this.state = {
            nativeType:this.props.nativeType || "text",
            placeholder:this.props.placeholder || "请输入"
        }
    }
    render(){
        const { children,className,inputClassName,inputRef } = this.props;
        const { nativeType,placeholder } = this.state;
        return (
            <div className={`input-container ${ filterClassName(className) }`}>
                <input type={nativeType} placeholder={placeholder} className={filterClassName(inputClassName)} ref={inputRef} />
                { children }
            </div>
        )
    }
}