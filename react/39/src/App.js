import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "animated-countdown";
const COUNT = 10;
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            counterDisplay:" show",
            finalDisplay:" hide",
            numArr:[]
        }
        for(let i = COUNT - 1;i > 0;i--){
            this.state.numArr.push({
                className:"",
                text:i
            })
        }
        this.resetAnimation = this.resetAnimation.bind(this);
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        this.startRunAnimation();
    }
    componentWillUnmount(){
        
    }
    startRunAnimation(){
        const { numArr } = this.state;
        const updateNewArr = Object.assign([...numArr],{
            0:{ className:" in",text:numArr[0].text }
        })
        Promise.resolve().then(() => this.setState({ numArr:updateNewArr }));
    }
    resetAnimation(){
        const { numArr } = this.state;
        numArr.forEach((item,index) => item.className = "");
        numArr[0].className = "in";
        this.setState({
            counterDisplay:"",
            finalDisplay:"",
            numArr:numArr
        })
    }
    runAnimation(index,e){
        let { numArr,counterDisplay,finalDisplay } = this.state;
        const { animationName } = e,nextToLast = numArr.length - 1;   
        if(animationName === "goIn" && index !== nextToLast){
            numArr[index].className="out";
        }else if(animationName === "goOut" && numArr[index + 1]){
            numArr[index + 1].className="in";
        }else{
            counterDisplay = " hide";
            finalDisplay = " show";
        }
        this.setState({ counterDisplay,finalDisplay,numArr });
    }
    replayHandler(){
        this.resetAnimation();
        this.startRunAnimation();
    }
    render(){
        const { counterDisplay,finalDisplay,numArr } = this.state;
        return (
            <div className="app">
                <div className={`counter${counterDisplay}`}>
                    <div className="num-group">
                        {
                            numArr.map((num,index) => (
                                <span 
                                    className={num.className} 
                                    key={num.text.toString() + index} 
                                    onAnimationEnd={this.runAnimation.bind(this,index)}
                                >{ num.text }</span>
                            ))
                        }
                    </div>
                    <Title level="4">ready go</Title>
                </div>
                <div className={`final${finalDisplay}`}>
                    <Title>Go</Title>
                    <button type="button" className="replay-btn" onClick={this.replayHandler.bind(this)}>replay</button>
                </div>
            </div>
        )
    }
}
