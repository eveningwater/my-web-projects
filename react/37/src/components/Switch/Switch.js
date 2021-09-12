import React, { Component } from "react";
import "./switch.css";
export default class Switch extends Component {
    static getDerivedStateFromProps(props,state){
        if(typeof props.value === "boolean"){
            state.checked = props.value;
        }
        return null;
    }
    constructor(props){
        super(props);
        this.state = {
            checked:false
        }
    }
    onChangeHandler(e){
        const { checked } = e.target;
        this.props.onChange && this.props.onChange(checked);
    }
    render(){
        const { children } = this.props;
        const { checked } = this.state;
        return (
            <label className={`ew-switch${ checked ? " active" : ""}`}>
                <input type="checkbox" className="ew-switch-checkbox" onChange={this.onChangeHandler.bind(this)} checked={checked}></input>
                <div className="ew-switch-inner"></div>
                { children }
            </label>
        )
    }
}