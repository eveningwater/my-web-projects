import './App.css';
import React, { Component,lazy, Suspense } from "react";
import Title from "./components/Title";
import Loading from './components/Loading';
const DOCUMENT_TITLE = "dad jokes";
const headerConfig = {
  headers: {
      Accept: 'application/json',
  }
};
const api = 'https://icanhazdadjoke.com';
const Content = lazy(() => import("./components/Content"));
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        content:"// Joke goes here",
        isLoading:false
    };
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    this.request();
  }
  componentWillUnmount() {
      
  }
  async request(){
      this.setState({ isLoading:true })
      const res = await fetch(api,headerConfig);
      const data = await res.json();
      this.setState({ content:data.joke });
      this.setState({ isLoading:false });
  }
  onChangeJoke(){
     this.request();
  }
  onTranslate(){
     window.open("https://www.eveningwater.com/my-web-projects/js/34/");
  }
  render() {
    return (
      <div className="app">
          <div className="container">
              <Title>Don't Laugh Challenge</Title>
              <Suspense fallback={<Loading isLoading={ this.state.isLoading }></Loading>}>
                <Content>{ this.state.content }</Content>
                <Loading isLoading={ this.state.isLoading }></Loading>
              </Suspense>
              <button type="button" className="btn" onClick={this.onChangeJoke.bind(this)}>Get Another Joke</button>
              <button type="button" className="btn" onClick={this.onTranslate.bind(this)}>need to translate?</button>
          </div>
      </div>
    )
  }
};
