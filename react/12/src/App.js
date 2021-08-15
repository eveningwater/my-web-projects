import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "split panel";
const splitList = [
   {
      text:"Shirahoshi",
      type:"left",
      href:"https://baike.baidu.com/item/%E7%99%BD%E6%98%9F/34180?fromtitle=%E7%99%BD%E6%98%9F%E5%85%AC%E4%B8%BB&fromid=4377673&fr=aladdin"
   },
   {
     text:"Zanilia",
     type:"right",
     href:"https://baike.baidu.com/item/%E8%B5%B5%E4%B8%BD%E9%A2%96/10075976?fr=aladdin"
   }
]
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hoverClass:""
    };
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {
    
  }
  onMouseEnterHandler(item){
     this.setState({
       hoverClass:" hover-" + item.type
     })
  }
  onMouseLeaveHandler(item){
    this.setState({
      hoverClass:""
    })
  }
  render() {
    const { hoverClass } = this.state;
    return (
      <div className="app">
          <div className={`container${ hoverClass }`}>
              {
                 splitList.map((item,index) => (
                    <div 
                      className={`split ${ "split-" + item.type }`} 
                      onMouseEnter={ this.onMouseEnterHandler.bind(this,item)} 
                      onMouseLeave={ this.onMouseLeaveHandler.bind(this,item)}
                      key={item.type + index}>
                       <Title level="3">the { item.type } panel</Title>
                       <a href={ item.href } className="btn" target="blank">{ item.text }</a>
                    </div>
                 ))
              }
          </div>
      </div>
    )
  }
};
