import './App.css';
import React,{ Fragment,Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "quiz-app";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            quizData:[
                {
                    question: "Which language runs in a web browser?",
                    a: "Java",
                    b: "C",
                    c: "Python",
                    d: "JavaScript",
                    correct: "d",
                },
                {
                    question: "What does CSS stand for?",
                    a: "Central Style Sheets",
                    b: "Cascading Style Sheets",
                    c: "Cascading Simple Sheets",
                    d: "Cars SUVs Sailboats",
                    correct: "b",
                },
                {
                    question: "What does HTML stand for?",
                    a: "Hypertext Markup Language",
                    b: "Hypertext Markdown Language",
                    c: "Hyperloop Machine Language",
                    d: "Helicopters Terminals Motorboats Lamborginis",
                    correct: "a",
                },
                {
                    question: "What year was JavaScript launched?",
                    a: "1996",
                    b: "1995",
                    c: "1994",
                    d: "none of the above",
                    correct: "b",
                },
            ],
            currentQuestion:0,
            score:0,
            currentSelect:""
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    onRestartHandler(){
        this.setState({ currentQuestion:0,score:0,currentSelect:"" });
    }
    onSelectItemHandler(item,index){
        let { quizData,currentQuestion,score } = this.state;
        if(item === quizData[currentQuestion].correct){
            score++;
        }
        this.setState({ score,currentQuestion,currentSelect:item })
    }
    onSubmitHandler(){
        let { currentQuestion,quizData,currentSelect } = this.state;
        if(!currentSelect){
            return;
        }
        if(currentQuestion <= quizData.length - 1){
            currentQuestion++;
        }
        this.setState({ currentQuestion,currentSelect:"" })
    }
    render(){
        const { currentQuestion,quizData,score,currentSelect } = this.state;
        return (
            <div className="app">
                <div className="quiz-container">
                    {
                        currentQuestion <= quizData.length - 1 ?
                        (
                            <Fragment>
                                <div className="quiz-content">
                                    <Title level="2" className="quiz-question-text">{ quizData[currentQuestion].question }</Title>
                                    <ul className="quiz-select-list">
                                        {
                                            Object.keys(quizData[currentQuestion]).filter(item => item.length === 1).map((item,index) => (
                                                <li className="quiz-select-item" key={item + index}>
                                                    <input 
                                                        type="radio" 
                                                        value={item} 
                                                        checked={currentSelect === item} 
                                                        onChange={this.onSelectItemHandler.bind(this,item,index)}
                                                        className="quiz-select-item-value"
                                                    ></input>
                                                    <label className="quiz-select-item-label" onClick={this.onSelectItemHandler.bind(this,item,index)}>{quizData[currentQuestion][item]}</label>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <button type="button" className="quiz-submit-btn quiz-btn" onClick={this.onSubmitHandler.bind(this)}>submit</button>
                                </div>
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <Title level="2" className="quiz-answer-text">You answered { score } / { quizData.length } questions correctly!</Title>
                                <button type="button" className="quiz-restart-btn quiz-btn" onClick={this.onRestartHandler.bind(this)}>reload</button>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        )
    }
}
