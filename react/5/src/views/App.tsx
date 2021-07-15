import React, { RefObject, useReducer, useState } from "react";
import "../style/App.css";
import LangComponent from "../components/langComponent";
import TitleComponent from "../components/titleComponent";
import ContentComponent from "../components/contentComponent";
import ButtonComponent from "../components/buttonComponent";
import BottomComponent from "../components/bottomComponent";
import QuizWrapperComponent from "../components/quizWrapper";
import ParseComponent from "../components/parseComponent";
import RenderHTMLComponent from '../components/renderHTML';
import TopComponent from '../components/topComponent';
import { getCurrentQuestion, parseObject,questions,getCurrentAnswers,QuestionArray } from "../data/data";
import { LangContext, lang } from "../store/lang";
import { OrderReducer, initOrder } from "../store/count";
import { marked } from "../utils/marked";
import { computeSameAnswer } from "../utils/same";
let collectionUsersAnswers:string [] = [];
let collectionCorrectAnswers:string [] = questions.reduce<string []>((v,r:QuestionArray) => {
  v.push(r.correct);
  return v;
},[]);
let correctNum = 0;
function App() {
  const [langValue, setLangValue] = useState(lang);
  const [usersAnswers,setUsersAnswers] = useState(collectionUsersAnswers);
  const [correctTotal,setCorrectTotal] = useState(0);
  const [orderState,orderDispatch] = useReducer(OrderReducer,0,initOrder);
  const changeLangHandler = (index: number) => {
    const value = index === 0 ? "en" : "zh";
    setLangValue(value);
  };
  const startQuestionHandler = () => orderDispatch({ type:"reset",payload:1 });
  const endQuestionHandler = () => {
    orderDispatch({ type:"reset",payload:0 });
    correctNum = 0;
  };
  const onSelectHandler = (select:string) => {
    // console.log(select)
    orderDispatch({ type:"increment"});
    if(orderState.count > 25){
        orderDispatch({ type:"reset",payload:25 });
    }
    if(select){
      collectionUsersAnswers.push(select);
    }
    correctNum = computeSameAnswer(correctNum,select,collectionCorrectAnswers,orderState.count);
    setCorrectTotal(correctNum);
    setUsersAnswers(collectionUsersAnswers);
  }
  const { count:order } = orderState;
  const wrapperRef:RefObject<HTMLDivElement> = React.createRef();
  return (
    <div className="App flex-center">
      <LangContext.Provider value={langValue}>
        <LangComponent lang={langValue} changeLang={changeLangHandler}></LangComponent>
        {
          order > 0 ? order <= 25 ? 
            (
                <div className="flex-center flex-direction-column w-100p">
                  <QuizWrapperComponent 
                      question={ questions[(order - 1 < 0 ? 0 : order - 1)] } 
                      onSelect={ onSelectHandler }
                    >
                    </QuizWrapperComponent>
                  <BottomComponent lang={langValue}>{getCurrentQuestion(langValue, order)}</BottomComponent>
                </div>
            ) 
            : 
            (
              <div className="w-100p result-wrapper" ref={wrapperRef}>
                 <div className="flex-center flex-direction-column result-content">
                    <TitleComponent level={1}>{ getCurrentAnswers(langValue,correctTotal)}</TitleComponent>
                    <ParseComponent lang={langValue} userAnswers={ usersAnswers }></ParseComponent>
                    <RenderHTMLComponent template={marked(parseObject[langValue].endContent)}></RenderHTMLComponent>
                    <div className="button-wrapper mt-10">
                      <ButtonComponent nativeType="button" long onClick={endQuestionHandler}>
                        {parseObject[langValue].endBtn}
                      </ButtonComponent>
                    </div>
                 </div>
                 <TopComponent scrollElement={wrapperRef} color="#ffffff"></TopComponent>
              </div>
            )
            : 
            (
              <div className="flex-center flex-direction-column">
                <TitleComponent level={1}>{parseObject[langValue].title}</TitleComponent>
                <ContentComponent>{parseObject[langValue].startContent}</ContentComponent>
                <div className="button-wrapper mt-10">
                  <ButtonComponent nativeType="button" long onClick={startQuestionHandler}>
                    {parseObject[langValue].startBtn}
                  </ButtonComponent>
                </div>
              </div>
            )
        }
      </LangContext.Provider>
    </div>
  );
}

export default App;
