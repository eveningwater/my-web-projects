import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "kinetic-loader";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphics: [
        {
          type: "square"
        },
        {
          type: "angle"
        }
      ]
    }
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {

  }
  render() {
    const { graphics } = this.state;
    return (
      <div className="app">
          {
            graphics.map((gra,index) => (
              <div className={`kinetic ${gra.type}`} key={gra.type + index}></div>
            ))
          }
      </div>
    )
  }
};
