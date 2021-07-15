import React from "react";
import { QuestionArray } from "../data/data";
import ButtonComponent from './buttonComponent';
import TitleComponent from './titleComponent';
import "../style/quiz-wrapper.css";
interface PropType {
    onSelect?:Function;
    question:QuestionArray;
}
interface PropState {
    selectActiveIndex?:number | null | undefined
}
export default class QuizWrapperComponent extends React.Component<PropType,PropState> {
    constructor(props:PropType){
        super(props);
        this.state = {
            selectActiveIndex:null
        }
    }
    onSelectHandler(select:string){
        this.props.onSelect && this.props.onSelect(select);
    }
    render(){
        const { question } = this.props;
        return (
            <div className="quiz-wrapper flex-center flex-direction-column">
                <TitleComponent level={1}>{ question.question }</TitleComponent>
                <div className="button-wrapper flex-center flex-direction-column">
                    {
                        question.answer.map((select:string,index:number) => (
                            <ButtonComponent 
                                nativeType="button" 
                                onClick={ this.onSelectHandler.bind(this,select)}
                                className="mt-10 btn-no-hover btn-no-active"
                                key={select}
                                long
                            >{ select }</ButtonComponent>
                        ))
                    }
                </div>
            </div>
        )
    }
}