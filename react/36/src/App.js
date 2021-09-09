import './App.css';
import React, { Component } from "react";
import LangItem from './components/languageItem/langItem';
import Title from './components/title/Title';
import dataObject from "./data/data";
const DOCUMENT_TITLE = "password generator";
const getRandom = (total,end) => () => String.fromCharCode(Math.floor(Math.random() * total) + end);
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentLang:"en",
            password:"",
            settingValues:[
                20,
                false,
                false,
                false,
                false
            ]
        }
        this.generatePasswordFunction = this.generatePasswordFunction.bind(this);
        this.randomFunc = {
            upper:getRandom(26,65),//26 letters,the first letter code (eg:A) is 65
            lower:getRandom(26,97),//26 letters,the first letter code (eg:a) is 97
            number:getRandom(10,48),//10 numbers,the first number code (eg:0) is 48
            symbol:() => {
                const symbols = '!@#$%^&*(){}[]=<>/,.';
                return symbols[Math.floor(Math.random() * symbols.length)];
            }
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
        this.setState({ currentLang:value });
    }
    onSettingHandler(index,e){
        const { settingValues } = this.state;
        let value = null;
        if(index === 0){
            value = e.target.value;
            if(Number(value) <= 0){
                value = 1;
            }else if(Number(value) >= 20){
                value = 20;
            }
        }else{
            value = e.target.checked;
        }
        settingValues[index] = value;
        this.setState({
            settingValues
        })
    }
    copyPasswordHandler(){
        const { password,currentLang } = this.state;
        if(!password){
            return window.$message.warning(dataObject[currentLang].confirmWarning);
        }
        const input = document.createElement("input");
        input.value = password;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
        window.ewConfirm({
            title:dataObject[currentLang].confirmTitle,
            content:dataObject[currentLang].confirmContent,
            showCancel:false
        });
    }
    generatePasswordFunction(upper,lower,number,symbol,length){
        let generate_password = "";
        const typeCount = upper + lower + number + symbol;
        const typeFunc = [{upper},{lower},{number},{symbol}].filter(v => Object.values(v)[0]);
        const { currentLang } = this.state;
        if(typeCount === 0){
            return window.$message.warning(dataObject[currentLang].typeText);
        }
        for(let i = 0;i < length;i += typeCount){
            // eslint-disable-next-line no-loop-func
            typeFunc.forEach(type => {
                const funcName = Object.keys(type)[0];
                generate_password += this.randomFunc[funcName]();
            })
        }
        this.setState({
            password:generate_password.slice(0,length)
        });
    }
    generatePasswordHandler(){
        const { settingValues:[length,upper,lower,number,symbol] } = this.state;
        this.generatePasswordFunction(upper,lower,number,symbol,length);
    }
    render(){
        const { currentLang,password,settingValues } = this.state;
        return (
            <div className="app">
                <LangItem onChangeLang={ this.onChangeLang.bind(this) } currentLang={currentLang}></LangItem>
                <div className="password-generator">
                    <Title level="2">{ dataObject[currentLang].title }</Title>
                    <div className="result-container">
                        <span className="result">{ password }</span>
                        <button type="button" className="clipboard-btn" onClick={this.copyPasswordHandler.bind(this)}>
                            <svg t="1626782853164" className="clipboard-icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2946">
                                <path
                                    d="M109.44512 1024l800.01024 0c27.81184 0 48.00512-20.19328 48.00512-48.00512l0-896c0-27.81184-20.19328-48.00512-48.00512-48.00512l-128 0c-8.82688 0-15.99488 7.168-15.99488 15.99488s7.168 15.99488 15.99488 15.99488l128 0c10.01472 0 15.99488 5.98016 15.99488 15.99488l0 896c0 10.01472-5.98016 15.99488-15.99488 15.99488l-800.01024 0c-10.01472 0-15.99488-5.98016-15.99488-15.99488l0-896c0-10.01472 5.98016-15.99488 15.99488-15.99488l128 0c8.82688 0 15.99488-7.168 15.99488-15.99488s-7.168-15.99488-15.99488-15.99488l-128 0c-27.81184 0-48.00512 20.19328-48.00512 48.00512l0 896c0 27.81184 20.19328 48.00512 48.00512 48.00512zM237.44512 160.01024c8.82688 0 15.99488-7.168 15.99488-15.99488s-7.168-15.99488-15.99488-15.99488l-64 0c-8.82688 0-15.99488 7.168-15.99488 15.99488l0 768c0 8.82688 7.168 15.99488 15.99488 15.99488l672.01024 0c8.82688 0 15.99488-7.168 15.99488-15.99488l0-768c0-8.82688-7.168-15.99488-15.99488-15.99488l-64 0c-8.82688 0-15.99488 7.168-15.99488 15.99488s7.168 15.99488 15.99488 15.99488l48.00512 0 0 736.01024-640 0 0-736.01024 48.00512 0zM349.45024 224.01024l320 0c38.87104 0 64-25.12896 64-64l0-143.99488c0-8.82688-7.168-15.99488-15.99488-15.99488l-416.01024 0c-8.82688 0-15.99488 7.168-15.99488 15.99488l0 143.99488c0 38.87104 25.12896 64 64 64zM317.44 32.01024l384 0 0 128c0 21.23776-10.79296 32.01024-32.01024 32.01024l-320 0c-21.21728 0-32.01024-10.752-32.01024-32.01024l0-128zM333.43488 512l352.01024 0c8.82688 0 15.99488-7.168 15.99488-15.99488s-7.168-15.99488-15.99488-15.99488l-352.01024 0c-8.82688 0-15.99488 7.168-15.99488 15.99488s7.168 15.99488 15.99488 15.99488zM333.43488 384l352.01024 0c8.82688 0 15.99488-7.168 15.99488-15.99488s-7.168-15.99488-15.99488-15.99488l-352.01024 0c-8.82688 0-15.99488 7.168-15.99488 15.99488s7.168 15.99488 15.99488 15.99488zM333.43488 640l352.01024 0c8.82688 0 15.99488-7.168 15.99488-15.99488s-7.168-15.99488-15.99488-15.99488l-352.01024 0c-8.82688 0-15.99488 7.168-15.99488 15.99488s7.168 15.99488 15.99488 15.99488zM333.43488 768l352.01024 0c8.82688 0 15.99488-7.168 15.99488-15.99488s-7.168-15.99488-15.99488-15.99488l-352.01024 0c-8.82688 0-15.99488 7.168-15.99488 15.99488s7.168 15.99488 15.99488 15.99488z"
                                    p-id="2947" fill="#ffffff"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="setting-container">
                        {
                            dataObject[currentLang].settings.map((item,index) => (
                                <div className="setting-item" key={item.type + index}>
                                    <label>{ item.label }</label>
                                    <input type={item.type} value={settingValues[index]} onChange={ this.onSettingHandler.bind(this,index) }></input>
                                </div>
                            ))
                        }
                    </div>
                    <button type="button" className="generate-btn" onClick={ this.generatePasswordHandler.bind(this)}>{ dataObject[currentLang].btnContent }</button>
                </div>
            </div>
        )
    }
}
