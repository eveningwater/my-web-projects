import './App.css';
import React, { Component } from "react";
import Title from "./components/Title"; 
import { throttle,setBoxShow } from "./utils/util";
const DOCUMENT_TITLE = "scroll animation";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boxes:[],
        triggerBottom:0
    };
    for(let i = 0;i < 30;i++){
        this.state.boxes.push({ text:"content",boxRef:React.createRef() });
    }
  }
  commonShow = (boxes,triggerBottom) => {
    boxes.forEach(box => {
      const { boxRef:{ current }} = box;
      setBoxShow(current,triggerBottom);
    });
  }
  showBox = () => {
     const { boxes,triggerBottom } = this.state;
     this.commonShow(boxes,triggerBottom);
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    const triggerBottom = window.innerHeight * 4 / 5;
    this.setState({
        triggerBottom:triggerBottom
    });
    this.commonShow(this.state.boxes,triggerBottom);
    window.addEventListener("scroll",throttle(this.showBox))
  }
  componentWillUnmount() {
    
  }
  render() {
    const { boxes } = this.state;
    return (
      <div className="app">
          <Title level="1">scroll to see animation</Title>
          {
              boxes.map((box,index) => (
                 <div className="box" ref={box.boxRef} key={box.text + index}>
                    <Title level="3">{ box.text }</Title>
                 </div>
              ))
          }
      </div>
    )
  }
};
