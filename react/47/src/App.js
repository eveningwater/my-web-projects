import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "live-user-filter";
const requestURL = "https://randomuser.me/api?results=50";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
           userList:[],
           originUserList:[],
           search:""
        }
        this.requestUserList = this.requestUserList.bind(this);
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        this.requestUserList();
    }
    async requestUserList(){
        const res = await fetch(requestURL);
        const data = await res.json();
        const userList = data.results.map(item => {
            const { picture:{large},name:{ first,last },location:{city,country}} = item;
            return {
                image:large,
                name:first + ' ' + last,
                location:city + ',' + country
            }
        });
        Promise.resolve().then(() => this.setState({ userList,originUserList:userList }))
    }
    onSearchHandler(e){
        const { value } = e.target;
        const { originUserList } = this.state;
        const newUserList = originUserList.filter(item => (item.name + item.location).toLowerCase().indexOf(value.trim().toLowerCase()) > -1);
        this.setState({search:value,userList:newUserList})
    }
    render(){
        const { userList,search } = this.state;
        return (
            <div className="app">
               <div className="luf-container">
                   <header className="luf-header">
                        <Title level="3" className="luf-header-title">Live User Filter</Title>
                        <small className="luf-header-subtitle">Search by name and/or location</small>
                        <input 
                            className="luf-search-input" 
                            type="text" 
                            value={search} 
                            onInput={this.onSearchHandler.bind(this)}
                            placeholder="enter the user name or location"
                        ></input>
                   </header>
                   <ul className="luf-user-list">
                       {
                           userList.map((item,index) => (
                               <li className="luf-user-list-li" key={item.name + index}>
                                   <img src={item.image} alt={item.name} className="luf-user-avatar"></img>
                                   <div className="luf-user-info">
                                       <Title level="4" className="luf-user-info-name">{item.name}</Title>
                                       <p className="luf-user-info-location">{item.location}</p>
                                   </div>
                               </li>
                           ))
                       }
                   </ul>
               </div>
            </div>
        )
    }
}
