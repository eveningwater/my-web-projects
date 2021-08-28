import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "button-ripple-effect";
const debounce = (handler,awaitTime = 100) => {
    return function(args) {
        handler.timer = setTimeout(() => handler.call(this,args),awaitTime);
    }
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       circleList:[]
    }
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {
      
  }
  createCircle(e){
    const { circleList } = this.state;
    const { clientX:x,clientY:y } = e;
    const { offsetLeft:left,offsetTop:top} = e.target;
    circleList.push({
        style:{
          left:(x - left) + 'px',
          top:(y - top) + 'px'
        }
    });
    this.setState({ circleList:circleList },() => { if(circleList.length){circleList.pop();} });
    setTimeout(() => {
       this.setState({ circleList:circleList })
    },200);
  }
  render() {
    const { circleList } = this.state;
    const renderCircle = (circle,index) => <span className="circle" key={circle.toString() + index} style={ circle.style }></span>;
    return (
      <div className="app">
         <div className="container">
           <button type="button" className="btn" onClick={ debounce(this.createCircle.bind(this)) }>
              clicked me!
              {
                  circleList.map((circle,index) => renderCircle(circle,index))
              }
           </button>
         </div>
      </div>
    )
  }
};
