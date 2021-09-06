import './App.css';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Title from './components/Title';
const DOCUMENT_TITLE = "double-click-heart";
const Heart = (props) => (
  <div className="heart" {...props }></div>
); 
let clickTime = 0;
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            count:0
        }
        this.createHeart = this.createHeart.bind(this);
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    onLoveHandler(e){
        const { nativeEvent } = e;
        if(clickTime === 0){
            clickTime = Date.now();
        }else{
            if(Date.now() - clickTime < 400){
                this.createHeart(nativeEvent);
                clickTime = 0;
            }else {
                clickTime = Date.now();
            }
        }
    }
    createHeart(e){
        const { clientX,clientY,target:{ offsetLeft,offsetTop } } = e;
        const heartStyle = {
            left:clientX - offsetLeft + 'px',
            top:clientY - offsetTop + 'px'
        }
        const { count } = this.state;
        setTimeout(() => {
           const container = document.querySelector(".cs-love");
           this.setState({
               count:count + 1
           });
           ReactDOM.render(<Heart style={ heartStyle } className="heart grow"></Heart>,container);
           setTimeout(() => {
              ReactDOM.render(null,container);
           },2000);
        })
    }
    render(){
        const { count } = this.state;
        return (
            <div className="app">
                <Title level="3" className="cs-h3">
                    Double click on the image to <Heart className="cs-scale heart"></Heart> it
                </Title>
                <small className="cs-sm">
                  you loved it <span className="cs-count">{ count }</span> times
                </small>
                <div className="cs-love" onClick={this.onLoveHandler.bind(this)}></div>
                <button className="cs-button" onClick={this.onLoveHandler.bind(this)} type="button">Love this small Dog?</button>
            </div>
        )
    }
}
