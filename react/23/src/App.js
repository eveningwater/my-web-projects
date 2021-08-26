import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "background-slider";
const IMAGE_URL = "https://www.eveningwater.com/my-web-projects/jQuery/7/img/";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        imgList:[
           { name:"2" },
           { name:"3" },
           { name:"4" },
           { name:"5" },
           { name:"6" }
        ],
        current:0
    };
    
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {

  }
  onPrevHandler(){
      let newCurrent = this.state.current;
      if(newCurrent <= 0){
          newCurrent = this.state.imgList.length - 1;
      }else{
          newCurrent--;
      }
      this.setState({ current:newCurrent });
  }
  onNextHandler(){
     let newCurrent = this.state.current;
     if(newCurrent >= this.state.imgList.length - 1){
        newCurrent = 0;
     }else{
        newCurrent++;
     }
     this.setState({ current:newCurrent });
  }
  render() {
    const { imgList,current } = this.state;
    return (
      <div className="app" style={{ backgroundImage:`url(${ IMAGE_URL + imgList[current].name + '.jpg'})`}}>
         <div className="slider-container">
             {
               imgList.map((img,index) => (
                  <div 
                    className={`slider-item${ index === current ? ' active' : '' }`} 
                    style={{ backgroundImage:`url(${ IMAGE_URL + img.name + '.jpg'})` }} key={ img.name + index }></div>
               ))
             }
         </div>
         <button type="button" className="btn prev" onClick={ this.onPrevHandler.bind(this) }>&larr;</button>
         <button type="button" className="btn next" onClick={ this.onNextHandler.bind(this) }>&rarr;</button>
      </div>
    )
  }
};
