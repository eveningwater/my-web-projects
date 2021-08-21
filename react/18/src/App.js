import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "random-choice-picker";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title:"Enter all of the choices divided by a comma (','),if there is no comma (','), they will be separated by space,Press enter when you're done",
        choices:"",
        storeChoices:[]
    };
    this.randomTag = this.randomTag.bind(this);
    this.pickerRandomTag = this.pickerRandomTag.bind(this);
    this.interval = 50;
    this.timer = null;
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {
    
  }
  pickerRandomTag(){
    const { storeChoices } = this.state;
    return Math.floor(Math.random() * storeChoices.length);
  }
  randomTag(){
      const { storeChoices:newStoreChoices } = this.state;
      let randomHighLight = () => {
          const randomIndex = this.pickerRandomTag();
          newStoreChoices[randomIndex].activeClass = " active";
          this.setState({storeChoices:newStoreChoices });
          this.timer = setTimeout(randomHighLight,this.interval);
          setTimeout(() => {
            newStoreChoices[randomIndex].activeClass = "";
            this.setState({storeChoices:newStoreChoices});
          },100)
      }
      randomHighLight();
      setTimeout(() => {
         clearTimeout(this.timer);
         setTimeout(() => {
            const randomIndex = this.pickerRandomTag();
            newStoreChoices[randomIndex].activeClass = " active";
            this.setState({storeChoices:newStoreChoices });
         },100);
      },this.interval * 100)
  }
  onInputHandler(e){
    const { target:{value}} = e;
    const newChoices = value.split(value.indexOf(',') > -1 ? ',' : '').filter(v => v.trim()).map(v => ({ text:v,activeClass:"" }));
    this.setState({ choices:value,storeChoices:newChoices });
  }
  onKeyUpHandler(e){
    const { keyCode } = e;
    if(keyCode === 13){
        setTimeout(() => this.setState({ choices:"" }),200);
        this.randomTag();
    }
  }
  render() {
    const { title,choices,storeChoices } = this.state;
    return (
      <div className="app">
         <Title>{ title }</Title>
         <textarea 
            placeholder="enter some choices here" 
            className="choicesTextarea" 
            value={choices}
            onInput={this.onInputHandler.bind(this)} 
            onKeyUp={this.onKeyUpHandler.bind(this)}
          ></textarea>
         <div className="tag-container">
             {
                storeChoices.map((v,index)=> (
                   <span className={`tag${ v.activeClass }`} key={ v.text + index }>{ v.text }</span>
                ))
             }
         </div>
      </div>
    )
  }
};
