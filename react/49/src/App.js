import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "custom-range-slider";
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
const getStyle = (el,prop) => window.getComputedStyle(el).getPropertyValue(prop);
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            value:50,
            left:125
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    onInputHandler(e){
        const { value } = e.target;
        const numValue = +value;
        const label = e.target.nextElementSibling;
        const rangeWidth = getStyle(e.target,"width"),
              labelWidth = getStyle(label,"width");
        const numWidth = +rangeWidth.slice(0,-2),
              numLabelWidth = +labelWidth.slice(0,-2);
        const min = +e.target.min,
              max = +e.target.max;
        const left = value * (numWidth / max) - numLabelWidth / 2 + scale(numValue,min,max,10,-10);
        this.setState({ value,left });
    }
    render(){
        const { value,left } = this.state;
        return (
            <div className="app">
                <Title level="2" className="crs-title">{ DOCUMENT_TITLE }</Title>
                <div className="crs-range-container">
                    <input type="range" className="crs-range-input" value={value} min="0" max="100" onInput={this.onInputHandler.bind(this)}></input>
                    <label className="crs-range-label" style={{ left:left + "px" }}>{ value }</label>
                </div>
            </div>
        )
    }
}
