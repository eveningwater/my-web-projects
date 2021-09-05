import './App.css';
import React, { Component } from "react";
import axios from "axios";
const DOCUMENT_TITLE = "github-profiles";
const githubAPI = 'https://api.github.com/users/';
const renderCard = (cardInfo, linkList,errorMsg) => {
  if (typeof cardInfo !== "object" || !cardInfo) return errorMsg ? (<div className="card error-card"><p>{errorMsg}</p></div>) : null;
  return (
    <div className="card">
      <div>
        <img src={cardInfo.avatar_url} alt={cardInfo.name} className="avatar" />
      </div>
      <div className="user-info">
        <h2>{cardInfo.name}</h2>
        <p>{cardInfo.bio}</p>
        <ul>
          <li>{cardInfo.followers}<strong>Followers</strong></li>
          <li>{cardInfo.following}<strong>Following</strong></li>
          <li>{cardInfo.public_repos}<strong>Repos</strong></li>
        </ul>
        <div id="repo-container">
          {
            linkList.map((item, index) => (
              <a
                className="repo"
                href={item.href}
                target="_blank" key={item.text + index}
                rel="noopener noreferrer"
              >{item.text}</a>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardInfo: null,
      linkList: [],
      errorMsg:""
    }
    this.getRepoList = this.getRepoList.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.createErrorCard = this.createErrorCard.bind(this);
    this.setCardData = this.setCardData.bind(this);
    this.addRepoList = this.addRepoList.bind(this);
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {

  }
  setCardData(user) {
    this.setState({
      cardInfo: user
    })
  }
  async getUsers(username) {
    try {
      const res = await fetch(githubAPI + username);
      const data = await res.json();
      if (!data.id){
        return this.createErrorCard("查无此用户");
      }
      this.setCardData(data);
      this.getRepoList(username);
    } catch (error) {
      if (error.response.status === 404) {
        this.createErrorCard("查无此用户");
      }
    }
  }
  async getRepoList(username) {
    try {
      const { data } = await axios(githubAPI + username + '/repos?sort=created');
      this.addRepoList(data);
    } catch (error) {
      if (error.response.status === 404) {
        this.createErrorCard("查找仓库出错!");
      }
    }
  }
  addRepoList(repoList) {
    this.setState({
      linkList: repoList.slice(0, 5).map(repo => ({ href: repo.html_url, text: repo.name }))
    })
  }
  createErrorCard(msg) {
    this.setState({
      errorMsg:msg
    });
  }
  queryUser(e) {
    if (e.keyCode === 13) {
      this.getUsers(e.target.value.trim());
      setTimeout(() => e.target.value = "");
    }
  }
  render() {
    const { cardInfo, linkList,errorMsg } = this.state;
    return (
      <div className="app">
        <div className="search-input-container">
          <input type="text" placeholder="请输入需要搜索的github用户" className="search" onKeyDown={this.queryUser.bind(this)} />
        </div>
        <main className="main">
          {renderCard(cardInfo, linkList,errorMsg)}
        </main>
      </div>
    )
  }
};
