import React, { ReactNode } from "react";
import "../style/button.css";
interface PropType {
    nativeType?:"button" | "submit" | "reset" | undefined,
    type?:string,
    children?:ReactNode,
    size?:string,
    long?:boolean,
    onClick?:Function,
    className?:string
}
interface StateType {
    typeArr:string [],
    sizeArr:string []
}
export default class ButtonComponent extends React.Component<PropType,StateType> {
    constructor(props:PropType){
        super(props);
        this.state = {
            typeArr:["primary","default","danger","success","info"],
            sizeArr:["mini",'default',"medium","normal","small"]
        }
    }
    onClickHandler(){
        this.props.onClick && this.props.onClick();
    }
    render(){
        const { nativeType,type,long,size,className } = this.props;
        const { typeArr,sizeArr } = this.state;
        const buttonType:string = type && typeArr.indexOf(type) > -1 ? type : 'default';
        const buttonSize:string = size && sizeArr.indexOf(size) > -1 ? size : 'default';
        let longClassName:string = '';
        let parentClassName:string = '';
        if(className){
            parentClassName = className;
        }
        if(long){
            longClassName = "long-btn";
        }
        return (
            <button 
                type={nativeType} 
                className={ `btn btn-${ buttonType } ${ longClassName } btn-size-${buttonSize} ${parentClassName}`} 
                onClick={ this.onClickHandler.bind(this)}
            >{ this.props.children }</button>
        )
    }
}