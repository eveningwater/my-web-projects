import './App.css';
import React, { Component } from "react";
import LoginForm from './views/login';
const DOCUMENT_TITLE = "form wave";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {
    
  }
  render() {
    return (
      <div className="app">
          <div className="container">
              <LoginForm></LoginForm>
          </div>
      </div>
    )
  }
};
