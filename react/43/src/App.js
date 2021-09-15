import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "mobile-tab-navigation";
const IMAGE_URL = "https://eveningwater.com/my-web-projects/js/95/images/";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            navList:[
                {
                    icon:"fa-home",
                    text:"航海王"
                },
                {
                    icon:"fa-box",
                    text:"犬夜叉"
                },
                {
                    icon:"fa-book-open",
                    text:"火影忍者"
                },
                {
                    icon:"fa-users",
                    text:"名侦探柯南"
                }
            ],
            currentActive:0
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    render(){
        const { navList,currentActive } = this.state;
        return (
            <div className="app">
                <div className="cs-mobile">
                    <div className="cs-carousel">
                        {
                            navList.map((item,index) => (
                                <img 
                                    src={IMAGE_URL + (index + 1) + ".png"} 
                                    alt={item.text} 
                                    className={`cs-carousel-item${ currentActive === index ? " active" : ""}`} 
                                    key={item.icon + index }
                                />
                            ))
                        }
                    </div>
                    <nav className="cs-mobile-nav">
                        <ul>
                            {
                                navList.map((item,index) => (
                                    <li 
                                        className={`cs-mobile-li${ currentActive === index ? " active" : ""}`} 
                                        key={item.icon + index} 
                                        onClick={() => this.setState({ currentActive:index })}
                                    >
                                        <i className={`fas ${item.icon}`}></i>
                                        <p>{ item.text }</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
