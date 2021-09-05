import './App.css';
import React, { Component } from "react";
import LeftSlide from './components/leftSlide';
import RightSlide from './components/rightSlide';
const DOCUMENT_TITLE = "double-slider";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      width: window.innerWidth,
      position: "",
      leftTransform: {
        translate: "translateX",
        value: ""
      },
      rightTransform: {
        translate: "translateX",
        value: ""
      },
      slideStyle:{
          itemWidth:"",
          slideLeftWidth:"",
          slideRightWidth:"",
          left:0,
          top:0
      }
    }
    this.onChangeSlide = this.onChangeSlide.bind(this);
    this.isHorizontal = this.isHorizontal.bind(this);
    this.setTransform = this.setTransform.bind(this);
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    Promise.resolve().then(() => {
      this.setPositionValue();
      this.setPosition();
    });
    window.addEventListener("resize", this.resizeHandler.bind(this))
  }
  setPositionValue() {
    const { width } = this.state;
    this.setState({
      position: this.isHorizontal() ? width : window.innerHeight,
      width: window.innerWidth
    })
  }
  setPosition(){
     const { width } = this.state;
     this.setState({
        slideStyle:{
           itemWidth:this.isHorizontal() ? width + 'px' : "100%",
           slideLeftWidth:this.isHorizontal() ? width * 4 + 'px' : "35%",
           slideRightWidth:this.isHorizontal() ? width * 4 + 'px' : "65%",
           left:this.isHorizontal() ? -(width * 3) + 'px' : 0,
           top:this.isHorizontal() ? 0 : "-" + 300 + 'vh'
        }
     })
  }
  resizeHandler() {
    Promise.resolve().then(() => {
      this.setPositionValue();
      this.setTransform();
      this.setPosition();
    })
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler.bind(this))
  }
  isHorizontal() {
    return this.state.width <= 869;
  }
  onChangeSlide(direction) {
    let { currentIndex } = this.state;
    if (direction === 'up') {
      currentIndex++;
      if (currentIndex > 3) {
        currentIndex = 0;
      }
    } else if (direction === 'down') {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = 3;
      }
    }
    this.setState({currentIndex: currentIndex},() => {
      this.setTransform();
    });
  }
  setTransform() {
    const { currentIndex,position } = this.state;
    this.setState({
      leftTransform: {
        translate: this.isHorizontal() ? "translateX" : "translateY",
        value: position * currentIndex + 'px'
      },
      rightTransform: {
        translate: this.isHorizontal() ? "translateX" : "translateY",
        value: -(position * currentIndex) + 'px'
      }
    })
  }
  arrowDownHandler() {
    this.onChangeSlide("down");
  }
  arrowUpHandler() {
    this.onChangeSlide("up");
  }
  render() {
    const { leftTransform,rightTransform,slideStyle } = this.state;
    return (
      <div className="app">
        <div className="slide-container">
          <LeftSlide transform={leftTransform} slideStyle={slideStyle}></LeftSlide>
          <RightSlide transform={rightTransform} slideStyle={slideStyle}></RightSlide>
          <div className="action-button">
            <button type="button" className="arrow-down-btn btn" onClick={this.arrowDownHandler.bind(this)}>
              <svg t="1626355990435" className="arrow-icon arrow-down-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2560">
                <path
                  d="M555.989333 171.221333v573.696c0 0.085333 0.213333 0.170667 0.213334 0.085334l208-216.405334a43.946667 43.946667 0 1 1 63.402666 61.013334l-283.093333 294.570666a44.032 44.032 0 0 1-63.402667 0L196.266667 587.989333a43.818667 43.818667 0 0 1 1.194666-62.208 44.032 44.032 0 0 1 62.208 1.237334l208 216.362666c0.085333 0.128 0.170667 0 0.170667-0.085333V170.24c0-23.381333 18.346667-42.496 41.301333-43.904 25.6-1.493333 46.805333 19.413333 46.805334 44.885333z"
                  fill="#535455" p-id="2561"></path>
              </svg>
            </button>
            <button className="btn arrow-up-btn" type="button" onClick={this.arrowUpHandler.bind(this)}>
              <svg t="1626356013541" className="arrow-icon arrow-up-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2709">
                <path
                  d="M468.010667 852.821333V279.04c0-0.085333-0.213333-0.170667-0.213334-0.085333L259.84 495.402667a43.946667 43.946667 0 1 1-63.402667-61.013334l283.221334-294.698666a44.032 44.032 0 0 1 63.402666 0l284.672 296.32a43.818667 43.818667 0 0 1-1.194666 62.208 44.032 44.032 0 0 1-62.208-1.237334l-208-216.362666c-0.085333-0.128-0.170667 0-0.170667 0.085333V853.76c0 23.381333-18.346667 42.496-41.301333 43.904a44.672 44.672 0 0 1-46.805334-44.885333z"
                  fill="#535455" p-id="2710"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
};
