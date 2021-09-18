import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "verify-account-ui";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
           codeList:[]
        }
        for(let i = 0;i < 9;i++){
            this.state.codeList.push({
                value:"0"
            })
        }
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        const container = this.codeContainerRef.current;
        if(container){
            const codeNodeList = Array.from(container.children);
            codeNodeList.forEach((item,index) => {
                item.addEventListener("keydown",(e) => {
                    if(e.key >= 0 && e.key <= 9){
                        item.value = "";
                        setTimeout(() => this.onFocusHandler(codeNodeList[index + 1]),0);
                    }else{
                        setTimeout(() => this.onFocusHandler(codeNodeList[index - 1]),0);
                    }
                })
            })
        }
    }
    onFocusHandler(node){
        if(!node){
            return false;
        }
        const { nodeName } = node;
        if(nodeName && nodeName.toLowerCase() === "input"){
            node.focus();
        }
    }
    codeContainerRef = React.createRef()
    render(){
        const { codeList } = this.state;
        return (
            <div className="app">
                <div className="va-container">
                    <Title className="va-h2">Verify Your Account</Title>
                    <p className="va-content">
                        We emailed you the six digit code to cool_guy@email.com
                        <br/>
                        Enter the code below to confirm your email address. 
                    </p>
                    <div className="va-code-container" ref={this.codeContainerRef}>
                        {
                            codeList.map((code,index) => (
                                <input 
                                    className="va-code"
                                    required
                                    min="0"
                                    max="9"
                                    type="number"
                                    placeholder="0" 
                                    key={code.toString() + index} 
                                />
                            ))
                        }
                    </div>
                    <small className="va-footer">
                        This is design only. We didn't actually send you an email as we don't have your email, right?
                    </small>
                </div>
            </div>
        )
    }
}
