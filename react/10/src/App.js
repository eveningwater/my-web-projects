import './App.css';
import React, { Component } from "react";
import { scale } from "./utils/util";
const DOCUMENT_TITLE = "blurry loading";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgStyle: 20,
      loadStyle: 1,
      load: 100
    };
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    let count = 0;
    let runLoad = () => {
      count++;
      this.setState({
        load: count,
        bgStyle: scale(count, 0, 100, 20, 0),
        loadStyle: scale(count, 0, 100, 1, 0)
      });
      if (count > 99) {
        clearTimeout(this.timer);
      } else {
        this.timer = setTimeout(runLoad, 20);
      }
    }
    runLoad();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    const { bgStyle, loadStyle, load } = this.state;
    return (
      <div className="app">
        <div className="background" style={{ filter: `blur(${bgStyle}px)` }}></div>
        <p className="loading-text" style={{ opacity: loadStyle }}>页面加载{load}%中</p>
      </div>
    )
  }
};
