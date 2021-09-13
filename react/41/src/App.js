import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "hover board";
const colors = ["#2396ef","#2396ef","#4097ef","#fff","#9744ee",
'#ff4500','#ff8c00','#ffd700','#90ee90','#00ced1','#1e90ff','#c71585','rgba(255, 69, 0, 0.68)',
'rgba(255, 120, 0, 1)','rgba(51, 100, 98, 1)','rgba(120, 40, 94, 0.5)','hsla(209, 100%, 56%, 0.73)','#c7158577'];
const squares = 500;
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            squareElements:[]
        }
        for(let i = 0;i < squares;i += 1){
            this.state.squareElements.push({ key:randomColor() });
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        // why not use SyntheticEvent?
        // `this.setState` update the state like asynchronous,
        // but use `this.setState` in `setTimeout` to update the state like synchronous,
        // This will cause the view to behave abnormally
        Array.from(this.containerRef.current.children).forEach(item => {
            item.addEventListener("mouseover",() => this.setSquareColor(item));
            item.addEventListener("mouseout",() => setTimeout(() => this.removeSquareColor(item),600));
        })
    }
    setSquareColor(element){
        const style = {
            background:`linear-gradient(135deg, ${ randomColor() } 10%, ${ randomColor() } 100%)`,
            "box-shadow":`0 0 2px ${ randomColor() },0 0 10px ${ randomColor() }`
        };
        Object.keys(style).forEach(key => element.style[key] = style[key]);
    }
    removeSquareColor(element){
        const style = {
            background:`linear-gradient(135deg, #6a6ab4 10%, #8023c7 100%)`,
            "box-shadow":`0 0 2px #610ca1`
        };
        Object.keys(style).forEach(key => element.style[key] = style[key]);
    }
    componentWillUnmount(){
        
    }
    containerRef = React.createRef()
    render(){
        const { squareElements } = this.state;
        return (
            <div className="app">
                <div className="container" ref={this.containerRef}>
                    {
                        squareElements.map((item,index) => (
                            <div className="square" key={item.key + index}></div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
