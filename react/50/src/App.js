import './App.css';
import React, { Component, Fragment } from "react";
const DOCUMENT_TITLE = "netflix-mobile-navigation";
const LOGO_URL = "https://www.eveningwater.com/my-web-projects/website/images/logo.png";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            navList:[
                {
                    href:"https://www.eveningwater.com/",
                    text:"个人网页"
                },
                {
                    href:"https://www.eveningwater.com/docs/",
                    text:"个人文档"
                },
                {
                    href:"https://www.eveningwater.com/my-web-projects/home/",
                    text:"个人项目集合"
                },
                {
                    href:"",
                    text:"个人简历",
                    children:[
                        {
                            href:"https://www.eveningwater.com/my-web-projects/react/3/",
                            text:"react版本"
                        },
                        {
                            href:"https://www.eveningwater.com/vue-resume/vue3.2/",
                            text:"vue3.2版本"
                        },
                        {
                            href:"https://www.eveningwater.com/vue-resume/vue3.0/",
                            text:"vue3.0版本"
                        },
                        {
                            href:"https://www.eveningwater.com/vue-resume/new/",
                            text:"vue2.x-vue-cli3.x版本"
                        },
                        {
                            href:"https://www.eveningwater.com/vue-resume/old/",
                            text:"vue2.x-vue-cli2.x版本"
                        },
                    ]
                }
            ],
            active:""
        }
        this.onchangeNavState = this.onchangeNavState.bind(this);
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    onOpenNavHandler(){
        this.onchangeNavState(" active");
    }
    onchangeNavState(status){
        this.setState({active:status });
    }
    onCloseNavHandler(){
        this.onchangeNavState("");
    }
    render(){
        const { navList,active } = this.state;
        const RenderList = (props) => {
            const { list } = props;
            return (
                <Fragment>
                    {
                        list.map((nav,index) => (
                            <li className="nmn-nav-list-item" key={nav.text + index}>
                                {
                                    nav.href ? (
                                        <a 
                                            href={nav.href} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="nmn-nav-list-item-link"
                                        >{nav.text}</a>
                                    ) : (
                                        <Fragment>
                                            { nav.text }
                                            { props.children }
                                        </Fragment>
                                    )
                                }
                            </li>
                        ))
                    }
                </Fragment>
            )
        }
        return (
            <div className="app">
                <button type="button" className="nmn-open-btn nmn-btn" onClick={ this.onOpenNavHandler.bind(this)}>
                    <i className="fa fa-bars"></i>
                </button>
                <div className={`nmn-nav nmn-nav-first${active}`}>
                    <div className={`nmn-nav nmn-nav-second${active}`}>
                        <div className={`nmn-nav nmn-nav-third${active}`}>
                            <button className="nmn-btn nmn-close-btn" type="button" onClick={this.onCloseNavHandler.bind(this)}>
                                <i className="fa fa-times"></i>
                            </button>
                            <img alt="logo" src={LOGO_URL} className="nmn-nav-avatar"></img>
                            <ul className="nmn-nav-list">
                                <RenderList list={navList}>
                                    <ul className="nmn-nav-list">
                                        <RenderList list={navList.map(item => item.children).filter(v => v).flat()}></RenderList>
                                    </ul>
                                </RenderList>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="nmn-content">
                    <img alt="logo" src={LOGO_URL} className="nmn-content-avatar"></img>
                    <p className="nmn-content-text">this is content</p>
                </section>
            </div>
        )
    }
}
