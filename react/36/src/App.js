import './App.css';
import React, { Component } from "react";
import LangItem from './components/languageItem/langItem';
import Title from './components/title/Title';
import dataObject from "./data/data";
const DOCUMENT_TITLE = "password generator";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentLang:"en"
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    componentWillUnmount(){

    }
    onChangeLang(value){
        this.setState({ currentLang:value })
    }
    render(){
        const { currentLang } = this.state;
        return (
            <div className="app">
                <LangItem onChangeLang={ this.onChangeLang.bind(this) } currentLang={currentLang}></LangItem>
                <div className="password-generator">
                    <Title level="2">{ dataObject[currentLang].title }</Title>
                </div>
            </div>
        )
    }
}
