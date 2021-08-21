import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "faq-collapse";
const questions = [
  {
      title:"Why shouldn't we trust atoms?",
      text:"They make up everything."
  },
  {
      title:"What do you call someone with no body and no nose?",
      text:"Nobody knows."
  },
  {
      title:"What's the object-oriented way to become wealthy?",
      text:"Inheritance."
  },
  {
      title:"How many tickles does it take to tickle an octopus?",
      text:"Ten-tickles!"
  },
  {
      title:"What is: 1 + 1?",
      text:"Depends on who are you asking."
  }
];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeClass:[]
    };
    let len = questions.length,i = 0;
    while(i < len){
      this.state.activeClass.push("");
      i++;
    }
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {
    
  }
  onFoldHandler(index){
      const { activeClass:newActiveClass } = this.state;
      newActiveClass[index] = newActiveClass[index] ? "" : " active";
      this.setState({ activeClass:newActiveClass });
  }
  render() {
    const { activeClass } = this.state;
    return (
      <div className="app">
          <Title>Frequently Asked Questions</Title>
          <div className="faq-container">
              {
                questions.map((ques,index) => (
                  <div className={`faq${activeClass[index]}`} key={ques.text + index}>
                      <Title level="3" className="faq-title">{ ques.title }</Title>
                      <p className="faq-text">{ ques.text }</p>
                      <i className="faq-icon" onClick={this.onFoldHandler.bind(this,index)}></i>
                  </div>
                ))
              }
          </div>
      </div>
    )
  }
};
