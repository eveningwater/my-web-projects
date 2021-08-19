import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "Event keyCodes";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        content:`<div class="key">Press any key to get the keyCode</div>`
    };
  }
  componentDidMount() {
      if (document.title !== DOCUMENT_TITLE) {
        document.title = DOCUMENT_TITLE;
      }
      window.addEventListener("keydown",this.keydownHandler.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener("keydown",this.keydownHandler.bind(this))
  }
  keydownHandler(e){
      const { key,keyCode,code } = e;
      const keyString = [
           {
               title:"event.key",
               content:key === " " ? "Space" : key
           },
           {
               title:"event.keyCode",
               content:keyCode
           },
           {
               title:"event.code",
               content:code
           }
      ].map(item => `<div class="key"><small>${ item.title }</small>${ item.content }</div>`).join("");
      this.setState({ content:keyString });
  }
  render() {
    return (
      <div className="app">
          <div className="container" dangerouslySetInnerHTML={{ __html:this.state.content }}></div>
      </div>
    )
  }
};
