import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "3d-background-boxes";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            boxes:[],
            isBig:false
        }
        for(let i = 0;i < 4;i++){
            for(let j = 0;j < 4;j++){
                this.state.boxes.push({ backgroundPosition:`${ -j * 15 }vw ${ -i * 15 }vh`});
            }
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    render(){
        const { boxes,isBig } = this.state;
        return (
            <div className="app">
                <button type="button" className="back-box-btn" onClick={() => this.setState({ isBig:!isBig })}>Magic 🎩</button>
                <div className={`back-box-boxes${ isBig ? " big" : ""}`}>
                    {
                        boxes.map((item,index) => (
                            <div className="back-box-box" style={item} key={item.backgroundPosition + index }></div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
