import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "feedback-ui-design";
const BASE_SRC = "https://image.flaticon.com/icons/svg/187/";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedBackList:[
                {
                    src:"187150.svg",
                    text:"Unhappy"
                },
                {
                    src:"187136.svg",
                    text:"Neutral"
                },
                {
                    src:"187133.svg",
                    text:"Satisfied"
                }
            ],
            currentActive:" fd-send-show",
            receiveFeedBackImage:"187150.svg",
            receiveFeedBackText:"Unhappy"
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    changeRatingHandler(item){
        this.setState({
            receiveFeedBackText:item.text,
            receiveFeedBackImage:item.src
        });
    }
    onHandler(key){
        this.setState({ currentActive:" " + key});
    }
    render(){
        const { currentActive,feedBackList,receiveFeedBackText,receiveFeedBackImage } = this.state;
        return (
            <div className="app">
               <div className="fd-panel">
                   <div className={`fd-send-page${currentActive}`}>
                       <strong className="fd-send-title">
                            How satisfied are you with our <br /> customer support performance?
                       </strong>
                       <div className="fd-send-rating-container">
                           {
                               feedBackList.map((feed,index) => (
                                    <div 
                                        className={`fd-send-rating${receiveFeedBackImage === feed.src ? " fd-send-rating-active" : ""}`} 
                                        key={feed.text + index}
                                        onClick={this.changeRatingHandler.bind(this,feed)}
                                    >
                                       <img src={BASE_SRC + feed.src} alt={feed.text} className="fd-send-rating-icon"></img>
                                       <small className="fd-send-text">{feed.text}</small>
                                    </div>
                               ))
                           }
                       </div>
                       <button className="fd-send-btn fd-btn" type="button" onClick={this.onHandler.bind(this,"fd-receive-show")}>Send Review</button>
                   </div>
                   <div className={`fd-receive-page${currentActive}`}>
                       <div className="fd-receive-heart"></div>
                       <strong className="fd-receive-title">Thank You!</strong>
                       <br/>
                       <strong className="fd-receive-text">
                           Feedback:
                           <span className="fd-receive-mark-text">{ receiveFeedBackText }</span>
                        </strong>
                       <p className="fd-receive-content">We'll use your feedback to improve our customer support</p>
                       <button className="fd-receive-btn fd-btn" type="button" onClick={this.onHandler.bind(this,"fd-send-show")}>back Send</button>
                   </div>
               </div>
            </div>
        )
    }
}
