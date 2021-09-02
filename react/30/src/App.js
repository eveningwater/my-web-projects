import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
import Header from "./components/Header";
import { marked } from './utils/util';
const DOCUMENT_TITLE = "sticky-navbar";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [
        {
          title: "朝闻雨记",
          content: ""
        },
        {
          title: "剑阁游记",
          content: ""
        }
      ],
      fixActive:""
    }
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }

    Promise.all([this.request("./sources/1.md"), this.request("./sources/2.md")]).then(res => {
      const { articles } = this.state;
      const result = res.map((item, index) => ({ title: articles[index].title, content: marked(item) }));
      this.setState({ articles: result })
    })
  }
  async request(url) {
    const res = await fetch(url);
    //Don't use `res.json`!
    const data = await res.text();
    return data;
  }
  componentWillUnmount() {

  }
  onScrollHandler(e){
     const { current } = this.headerRef;
     if(current){
        const { offsetHeight } = current;
        const { scrollTop } = e.target;
        this.setState({ 
          fixActive:scrollTop >= offsetHeight + 100 ? " active" : ""
        });
     }
  }
  headerRef = React.createRef();
  render() {
    const { articles,fixActive } = this.state;
    return (
      <div className="app">
        <Header currentActive={fixActive} headerRef={this.headerRef}></Header>
        <main className="main" onScroll={this.onScrollHandler.bind(this)}>
          <section className="intro">
            <div className="container">
              <Title>欢迎来到我的个人网站</Title>
              <p>
                总把自己当作一朵花，其实自己什么也不是。当你觉得自己就是一朵花时，问问自己有开出美丽的芬芳吗？
              </p>
              <p>
                总把自己当作一盏灯，其实自己什么也不是。当你觉得自己就是一盏灯时，问问自己有没有照出一席光明？
              </p>
            </div>
          </section>
          <section className="container content">
            {
              articles.map((art, index) => (
                <React.Fragment key={art.title + index} >
                  <Title level="2">{art.title}</Title>
                  <article dangerouslySetInnerHTML={{ __html: art.content }}></article>
                </React.Fragment>
              ))
            }
          </section>
        </main>
      </div >
    )
  }
};
