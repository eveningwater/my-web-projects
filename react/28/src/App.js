import './App.css';
import React, { Component } from "react";
import Card from './components/Card/Card';
const cover = "https://www.eveningwater.com/my-web-projects/js/81/images/header.png";
const avatar = "https://www.eveningwater.com/my-web-projects/js/81/images/avatar.png";

const DOCUMENT_TITLE = "content-placeholder";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       loading:true
    }
  }
  is_mounted = false;
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    this.is_mounted = true;
    if(this.is_mounted){
       Promise.resolve().then(() => {
          this.setState({ loading:true });
          setTimeout(() => this.setState({ loading:false }),1000);
       })
    }
  }
  componentWillUnmount() {
      this.is_mounted = false;
      this.setState = (state,callback) => null;
  }
  render() {
    const { loading } = this.state;
    return (
      <div className="app">
          <Card cover={cover} title="草帽小子" titleLevel="3" name="蒙奇·D·路飞" avatar={avatar} isLoading={loading} date="2021-08-31">
            外号“草帽”路飞，是草帽一伙、草帽大船团船长，极恶的世代之一。
            橡胶果实能力者，悬赏金<mark>15</mark>亿贝里。
            梦想是找到传说中的<mark>One Piece</mark>，成为海贼王。
          </Card>
          <Card cover={cover} title="草帽小子" titleLevel="3" name="蒙奇·D·路飞" avatar={avatar} isLoading={loading} date="2021-08-31">
            外号“草帽”路飞，是草帽一伙、草帽大船团船长，极恶的世代之一。
            橡胶果实能力者，悬赏金<mark>15</mark>亿贝里。
            梦想是找到传说中的<mark>One Piece</mark>，成为海贼王。
          </Card>
      </div>
    )
  }
};
