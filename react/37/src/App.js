import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
import Switch from './components/Switch/Switch';
const DOCUMENT_TITLE = "good-cheap-fast";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkedArr:[
                {
                    value:false,
                    text:"Good"
                },
                {
                    value:false,
                    text:"cheap"
                },
                {
                    value:false,
                    text:"fast"
                }
            ]
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    componentWillUnmount(){
        
    }
    onChangeHandler(index,status){
        const { checkedArr } = this.state;
        checkedArr[index].value = status;
        if(checkedArr.every(v => v.value)){
            if(index === 0){
                checkedArr[2].value = false;
            }else if(index === 1){
                checkedArr[0].value = false;
            }else{
                checkedArr[1].value = false;
            }
        }
        this.setState({ checkedArr:checkedArr });
    }
    render(){
        const { checkedArr } = this.state;
        return (
            <div className="app">
                <Title>How do you want your project to be?</Title>
                {
                    checkedArr.map((item,index) => (
                        <div className="flex-center" key={item.text + index}>
                            <Switch value={item.value} onChange={this.onChangeHandler.bind(this,index)}>{ item.text }</Switch>
                        </div>
                    ))
                }
            </div>
        )
    }
}
