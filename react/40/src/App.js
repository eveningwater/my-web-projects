import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "image-carousel";
const IMAGE_URL = "https://www.eveningwater.com/static/page/CSS/css-code-50-image/comic-girl-";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageData:[
                { name:"01"},
                { name:"02"},
                { name:"03"},
                { name:"04"}
            ],
            currentActiveIndex:0,
            carouseStyle:{
                transform:""
            }
        }
        this.runCarouselHandler = this.runCarouselHandler.bind(this);
        this.changeCarousel = this.changeCarousel.bind(this);
        this.timer = null;
        this.carouselRef = React.createRef();
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        this.timer = setInterval(this.runCarouselHandler,1000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    resetInterval(){
        clearInterval(this.timer);
        this.timer = setInterval(this.runCarouselHandler,1000);
    }
    runCarouselHandler(){
        let { currentActiveIndex } = this.state;
        currentActiveIndex++;
        this.setState({currentActiveIndex},() => this.changeCarousel());
    }
    changeCarousel(){
        let { currentActiveIndex,imageData } = this.state;
        if(currentActiveIndex > imageData.length - 1){
            currentActiveIndex = 0;
        }else if(currentActiveIndex < 0){
            currentActiveIndex = imageData.length - 1;
        }
        this.setState({ currentActiveIndex,carouseStyle:{ 
            transform:`translateX(-${ currentActiveIndex * this.carouselRef.current.offsetWidth }px)`
        }})
    }
    prevHandler(){
        let { currentActiveIndex } = this.state;
        currentActiveIndex--;
        this.setState({currentActiveIndex},() => this.changeCarousel());
        this.resetInterval();
    }
    nextHandler(){
        let { currentActiveIndex } = this.state;
        currentActiveIndex++;
        this.setState({currentActiveIndex},() => this.changeCarousel());
        this.resetInterval();
    }
    render(){
        const { imageData,carouseStyle } = this.state;
        return (
            <div className="app">
                <div className="carousel-container">
                    <div className="carousel" ref={this.carouselRef} style={carouseStyle}>
                        {
                            imageData.map((item,index) => (
                                <img src={ IMAGE_URL + item.name + '.jpg'} alt="图片加载中" key={item.name + index} />
                            ))
                        }
                    </div>
                    <div className="button-group">
                        <button type="button" className="btn prev-btn" onClick={this.prevHandler.bind(this)}>prev</button>
                        <button type="button" className="btn next-btn" onClick={this.nextHandler.bind(this)}>next</button>
                    </div>
                </div>
            </div>
        )
    }
}
