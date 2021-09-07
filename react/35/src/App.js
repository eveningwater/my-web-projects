import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "auto-text-effect";
const allText = "我爱程序，程序使我快乐!";
const time = 300;
let charIndex = 0;
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:"",
            speed:1
        }
        this.timer = null;
        this.onPrintChar = this.onPrintChar.bind(this);
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        Promise.resolve().then(() => this.onPrintChar());
    }
    componentWillUnmount(){
        if(this.timer){
            clearTimeout(this.timer);
        }
    }
    onPrintChar(){
        const { speed } = this.state;
        this.setState({ text:allText.slice(0,charIndex)});
        charIndex++;
        if(charIndex > allText.length){
            charIndex = 1;
        }
        this.timer = setTimeout(this.onPrintChar,time / speed);
    }
    onChangeSpeed(e){
        const num = Number(e.target.value);
        this.setState({ speed:num < 1 ? 1 : num > 10 ? 10 : num })
    }
    render(){
        const { text,speed } = this.state;
        return (
            <div className="app">
                <div className="text">{ text }</div>
                <div className="speed">
                    speed:
                    <input type="number" min="1" max="10" value={speed} className="speed-input" onChange={this.onChangeSpeed.bind(this)}></input>
                </div>
            </div>
        )
    }
}
