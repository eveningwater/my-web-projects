import { Component } from "react";
import "./style.css";
const langText = {
    en:[
        {
            text:"English",
            value:"en"
        },
        {
            text:"chinese",
            value:"zh"
        }
    ],
    zh:[
        {
            text:"英文",
            value:"en"
        },
        {
            text:"中文",
            value:"zh"
        }
    ]
}
export default class LangItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            current:props.currentLang
        }
    }
    changeLangHandler(item){
        this.setState({current:item.value });
        this.props.onChangeLang && this.props.onChangeLang(item.value);
    }
    render(){
        const { current } = this.state;
        return (
            <div className="lang-container">
                {
                    langText[current].map((item,index) => (
                        <div 
                            className={`lang-item${ current === item.value ? " active" : ""}`} 
                            key={item.value + index}
                            onClick={this.changeLangHandler.bind(this,item)}
                        >{item.text}</div>
                    ))
                }
            </div>
        )
    }
}