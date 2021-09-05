import './App.css';
import React, { Component } from "react";
import { createToast } from './components/Toast';
const messages = [
  "消息内容1",
  "消息内容2",
  "消息内容3",
  "消息内容4",
  "消息内容5"
];
const types = ["success", "info", "error", "default", "warning"];
const getRandom = data => data[Math.floor(Math.random() * data.length)];
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const DOCUMENT_TITLE = "toast-notification";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftPositions: [],
      topPositions: []
    }
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    this.initPositions();
    window.addEventListener("resize", this.onResizeHandler.bind(this));
  }
  onResizeHandler() {
    this.initPositions();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeHandler.bind(this));
  }
  initPositions() {
    let maxWidth = window.innerWidth - 230, maxHeight = window.innerHeight - 160;
    const leftPositions = [], topPositions = [];
    for (let i = 0; i < 20; i++) {
      leftPositions.push(randomRange(0, maxWidth));
      topPositions.push(randomRange(0, maxHeight));
    }
    Promise.resolve().then(() => {
      this.setState({
        leftPositions,
        topPositions
      })
    })
  }
  createAutoNotification() {
    const randomType = getRandom(types);
    const randomMessage = getRandom(messages);
    const left = getRandom(this.state.leftPositions);
    const top = getRandom(this.state.topPositions);
    createToast({
      message: randomMessage,
      type: randomType,
      autoCloseTime: 3000,
      // showClose: true,
      left,
      top
    });
  }
  createNotAutoNotification() {
    const randomType = getRandom(types);
    const randomMessage = getRandom(messages);
    const left = getRandom(this.state.leftPositions);
    const top = getRandom(this.state.topPositions);
    createToast({
      message: randomMessage,
      type: randomType,
      showClose: true,
      left,
      top
    });
  }
  render() {
    return (
      <div className="app">
        <div className="btn-group">
          <button id="autoBtn" className="createToastBtn" type="button" onClick={this.createAutoNotification.bind(this)}>show Notification(auto close)</button>
          <h2>Notification</h2>
          <button id="notAutoBtn" className="createToastBtn" type="button" onClick={this.createNotAutoNotification.bind(this)}>show Notification(not auto close)</button>
        </div>
        <div className="toast-container"></div>
      </div>
    )
  }
};
