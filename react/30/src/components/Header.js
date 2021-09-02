import React from "react";
import Title from "./Title";
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [
                {
                    url: "https://www.eveningwater.com/my-web-projects/home/",
                    text: "项目"
                },
                {
                    url: "https://eveningwater.github.io/#/",
                    text: "博客"
                },
                {
                    url: "https://www.eveningwater.com/vue-resume/vue3.0/",
                    text: "关于我"
                },
                {
                    url: "https://github.com/eveningwater/",
                    text: "源码仓库"
                }
            ],
            navActive:""
        }
    }
    showNavList(){
        const { navActive } = this.state;
        this.setState({
            navActive:navActive ? "" : " show"
        });
    }
    render() {
        const { navList,navActive } = this.state;
        const { currentActive,headerRef } = this.props;
        return (
            <header className={`header${currentActive}`} ref={headerRef}>
                <div className="flex-between container">
                    <svg t="1626271706368" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1961"
                        width="48" height="48" className="nav-menu" onClick={this.showNavList.bind(this)}>
                        <path
                            d="M128 768h768v-85.333333H128v85.333333z m0-213.333333h768v-85.333334H128v85.333334z m0-298.666667v85.333333h768V256H128z"
                            p-id="1962" fill="#ffffff"></path>
                    </svg>
                    <Title className="left-logo">
                        <a href="https://www.eveningwater.com/" target="_blank" rel="noopener noreferrer">个人网页</a>
                    </Title>
                    <ul className={`nav-list${navActive}`}>
                        {
                            navList.map((nav, index) => (
                                <li key={nav.text + index}>
                                    <a href={nav.url} target="_blank" rel="noopener noreferrer">{nav.text}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </header>
        )
    }
}