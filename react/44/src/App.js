import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "password-strength-background";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
           loginForm:{
               email:"",
               password:""
           },
           blurStyle:{ }
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    onChangeHandler(key,e){
        const { value } = e.target;
        const blur = 20 - value.length * 2;
        const loginForm = Object.assign({...this.state.loginForm},{
            [key]:value
        });
        this.setState({ loginForm,blurStyle:key === "password" ? { filter:`blur(${blur}px)`} : {} });
    }
    render(){
        const { loginForm:{ email,password },blurStyle } = this.state;
        return (
            <div className="app">
                <div className="background" style={blurStyle}></div>
                <div className="bg-white rounded p-10 text-center shadow-md">
                    <Title className="text-3xl text-blue-300">Image Password Strength</Title>
                    <p className="text-sm text-gray-700 mt-2">Change the password to see the effect</p>
                    <div className="my-4 text-left">
                        <label className="text-gray-900">Email</label>
                        <input className="border block w-full p-2 mt-2 rounded" placeholder="enter email" value={email} onChange={this.onChangeHandler.bind(this,"email")}></input>
                    </div>
                    <div className="my-4 text-left">
                        <label className="text-gray-900">Password</label>
                        <input className="border block w-full p-2 mt-2 rounded" placeholder="enter password" value={password} onChange={this.onChangeHandler.bind(this,"password")}></input>
                    </div>
                    <button type="button" className="bg-black text-white py-2 inline-block mt-4 w-full rounded">Submit</button>
                </div>
            </div>
        )
    }
}
