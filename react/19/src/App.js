import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "Animated Navigation";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: [
        {
          href: "/",
          text: "index"
        },
        {
          href: "https://eveningwater.github.io/#/",
          text: "blog"
        },
        {
          href: "https://github.com/eveningwater",
          text: "github"
        },
        {
          href: "https://gitee.com/eveningwater",
          text: "gitee"
        }
      ],
      currentActive:" active"
    };
    this.onActiveHandler = this.onActiveHandler.bind(this);
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {

  }
  onActiveHandler(){
      const { currentActive } = this.state;
      this.setState({ currentActive:(currentActive.trim() === 'active' ? '' : ' active')});
  }
  render() {
    const { currentActive,navList } = this.state;
    return (
      <div className="app">
          <nav className={`nav${currentActive}`}>
             <ul>
                {
                  navList.map((n,i) => (
                    <li key={n.href + i}>
                       <a href={ n.href } target="_blank" rel="noopener noreferrer">{ n.text }</a>
                    </li>
                  ))
                }
             </ul>
             <button type="button" className="btn" onClick={this.onActiveHandler}>
                {
                  [1,2].map((v,i) => (
                    <div className={`line line-${v}`} key={ v + i }></div>
                  ))
                }
             </button>
          </nav>
      </div>
    )
  }
};
