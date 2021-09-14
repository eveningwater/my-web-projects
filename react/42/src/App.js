import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "hover board";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    render(){
        return (
            <div className="app">
                
            </div>
        )
    }
}
