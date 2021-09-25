import './App.css';
import React,{ Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "random-image-feed";
const refreshURL = 'https://source.unsplash.com/random/';
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageList:[],
            backActive:"",
            currentURL:""
        }
        this.getRandomSize = this.getRandomSize.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.onScrollHandler = this.onScrollHandler.bind(this);
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        this.loadImage();
        window.addEventListener("scroll",this.onScrollHandler)
    }
    componentWillUnmount(){
        window.removeEventListener("scroll",this.onScrollHandler);
    }
    onScrollHandler(){
        const { scrollTop,clientHeight } = document.documentElement || document.body;
        return new Promise(resolve => resolve()).then(() => this.setState({ backActive:scrollTop >= clientHeight - 10 ? " show" : ""}))
    }
    loadImage(rows = 5){
        const imageList = [];
        for(let i = 0;i < rows * 3;i++){
            imageList.push({
                src:refreshURL + `${this.getRandomSize()}x${this.getRandomSize()}`,
                alt:"random image-" + (i + 1)
            })
        }
        return new Promise(resolve => resolve()).then(() => this.setState({ imageList }));
    }
    getRandomSize(){
        return Math.floor(Math.random() * 10) + 300;
    }
    onPreviewHandler(src){
        this.setState({ currentURL:src });
    }
    render(){
        const { imageList,backActive,currentURL } = this.state;
        return (
            <div className="app">
                <div className="rif-flex-center">
                    <Title className="rif-title" confirm-title="Clicked me to refresh the images" onClick={() => this.loadImage()}>{ DOCUMENT_TITLE }</Title>
                    <div className="rif-container">
                        {
                            imageList.map((image,index) => (
                                <img src={image.src} alt={image.alt} key={image.alt + index} className="rif-image" loading="lazy" onClick={this.onPreviewHandler.bind(this,image.src)}></img>
                            ))
                        }
                    </div>
                </div>
                <a href="#top" className={`rif-back-btn${backActive}`}>&nbsp;</a>
                <div className="rif-preview-image-mask" style={{ display:currentURL ? "flex" : "none" }} onClick={() => this.setState({currentURL:""})}>
                     <img src={currentURL} className="rif-preview-image" alt="the preview"></img>
                </div>
            </div>
        )
    }
}
