import './App.css';
import React,{ Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "todo-list";
const setLocalData = (key,value) => localStorage.setItem(key,JSON.stringify(value));
const getLocalData = (key) => {
    let data = [];
    try {
        data = JSON.parse(localStorage.getItem(key));
    } catch (error) {
        
    }
    return data;
}
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            todoList:[]
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        const data = getLocalData("todoList");
        Promise.resolve().then(() => {
            if(Array.isArray(data) && data.length){
                this.setState({ todoList:data });
            }
        })
    }
    componentWillUnmount(){
        
    }
    onAddToDoHandler(e){
        e.preventDefault();
        const { todoList  } = this.state;
        const input = Array.from(e.target.children).filter(child => child.tagName.toLowerCase() === "input")[0];
        if(!input.value){
            return;
        }
        todoList.push({ text:input.value,class:"" });
        this.updateTodoList(todoList).then(() => {
            setTimeout(() => {
                input.value = "";
            },1500);
        });
    }
    onDeleteToDoHandler(index,e){
        e.preventDefault();
        const { todoList } = this.state;
        if(todoList.length){
            todoList.splice(index,1);
        }
        this.updateTodoList(todoList);
    }
    updateTodoList(list){
        return new Promise(resolve => {
            this.setState({ todoList:list },() => setLocalData("todoList",list));
            resolve();
        })
    }
    onCompleteHandler(index){
        const { todoList } = this.state;
        if(todoList.length){
            todoList[index].class = !todoList[index].class.trim() ? " complete" : "";
        }
        this.updateTodoList(todoList);
    }
    render(){
        const { todoList } = this.state;
        return (
            <div className="app">
                <Title level="2" className="todo-title">{DOCUMENT_TITLE}</Title>
                <form className="todo-form" onSubmit={this.onAddToDoHandler.bind(this)}>
                    <input className="todo-input" type="text"  placeholder="Enter your todo"></input>
                    <ul className="todo-list">
                        {
                            todoList.map((todo,index) => (
                                <li 
                                    className={`todo-list-item${todo.class}`} 
                                    key={todo.text + index} 
                                    onContextMenu={this.onDeleteToDoHandler.bind(this,index)}
                                    onClick={this.onCompleteHandler.bind(this,index)}
                                >{ todo.text }</li>
                            ))
                        }
                    </ul>
                </form>
                <small className="todo-footer">
                    Left click to toggle completed.<br />
                    Right click to delete todo
                </small>
            </div>
        )
    }
}
