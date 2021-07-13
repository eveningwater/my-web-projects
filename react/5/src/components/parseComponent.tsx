import React from "react";
import { parseObject,questions } from "../data/data";
import { marked } from "../utils/marked";
import RenderHTMLComponent from './renderHTML';
import "../style/parse.css";
interface PropType {
    lang:string,
    userAnswers:string []
};
interface StateType {};
export default class ParseComponent extends React.Component<PropType,StateType> {
    constructor(props:PropType){
        super(props);
        this.state = {};
    }
    render(){
        const { lang,userAnswers } = this.props;
        const setTypeClassName = (index:number):string => 
        `answered-${ questions[index].correct === userAnswers[index] ? 'correctly' : 'incorrectly'}`;
        return (
            <ul className="result-list">
                {
                    parseObject[lang].detail.map((content:string,index:number) => (
                        <li 
                            className={`result-item ${ setTypeClassName(index) }`} key={content}>
                            <span className="result-question">
                                <span className="order">{(index + 1)}.</span>
                                { questions[index].question }
                            </span>
                            <div className="result-item-wrapper">
                                <span className="result-correct-answer">
                                    { parseObject[lang].output }:<span className="ml-5 result-correct-answer-value">{ questions[index].correct }</span>
                                </span>
                                <span className="result-user-answer">
                                    {parseObject[lang].answer }:<span className="ml-5 result-user-answer-value">{userAnswers[index]}</span>
                                </span>
                                <span 
                                    className={`inline-answer ${ setTypeClassName(index) }`}>
                                    {
                                        questions[index].correct === userAnswers[index] 
                                        ? parseObject[lang].successMsg 
                                        : parseObject[lang].errorMsg
                                    }
                                </span>
                                <RenderHTMLComponent template={ marked(content) }></RenderHTMLComponent>
                            </div>
                        </li>
                    ))
                }
            </ul>
        )
    }
}