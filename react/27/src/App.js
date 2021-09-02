import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "drag-n-drop";
const image_url = "https://www.eveningwater.com/my-web-projects/js/26/img/";
const random = () => Math.floor(Math.random() * 15);
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       dragItems:[
          {
            dragItem:"div",
            dragClass:"drag-item"
          },
          {
            dragItem:"div",
            dragClass:"drag-item"
          },
          {
            dragItem:"div",
            dragClass:"drag-item"
          },
          {
            dragItem:"div",
            dragClass:"drag-item"
          },
          {
            dragItem:"div",
            dragClass:"drag-item"
          }
       ],
       imageIndex:random(),
       currentIndex:0,
       fillClass:"drag-fill"
    }
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {
      
  }
  dragOverHandler(e){
      e.preventDefault();
  }
  dragEnterHandler(index,e){
      e.preventDefault();
      const { dragItems } = this.state;
      if(dragItems[index].dragClass.indexOf("drag-active") === -1){
        dragItems[index].dragClass += " drag-active";
      }
      this.setState({ dragItems:dragItems });
  }
  dragLeaveHandler(index){
    const { dragItems } = this.state;
    dragItems[index].dragClass = "drag-item";
    this.setState({ dragItems:dragItems });
  }
  dropHandler(index){
    const { dragItems } = this.state;
    dragItems[index].dragClass = "drag-item";
    this.setState({ dragItems:dragItems });
    // If you don't use setTimeout to delay the React element render,
    // this will make the children element's `onDragEnd` event not firing!
    // see `dragEndHandler` as follows:
    setTimeout(() => {
      this.setState({currentIndex:index});
    },0)
  }
  dragStartHandler(){
      let { fillClass } = this.state;
      if(fillClass.indexOf("drag-move") === -1){
         fillClass += " drag-move";
      }
      this.setState({ fillClass:fillClass });
      setTimeout(() => {
        this.setState({ fillClass:"invisible" });
      },200);
  }
  dragEndHandler(){
    // `onDragEnd` not firing when you attempt to drag item,why?
    // so this is the bug of react.js?
    // console.log("dragend triggered")
    this.setState({ fillClass:"drag-fill" });
  }
  render() {
    const { dragItems,imageIndex,currentIndex,fillClass } = this.state;
    const context = this;
    const renderDragFill = (props) => {
       return (
        <div 
          className={fillClass}
          draggable={true} 
          style={{ backgroundImage:`url(${ image_url + imageIndex + '.jpg'})`}}
          onDragStart={context.dragStartHandler.bind(context)}
          onDragEnd={context.dragEndHandler.bind(context)}
        ></div>
       )
    };
    return (
      <div className="app">
          <div className="drag-list">
              <React.Fragment>
                 { 
                  dragItems.map((item,index) => (
                    <item.dragItem 
                      key={item.dragItem + index} 
                      className={ item.dragClass }
                      onDragOver={this.dragOverHandler.bind(this)}
                      onDragEnter={this.dragEnterHandler.bind(this,index)}
                      onDragLeave={this.dragLeaveHandler.bind(this,index)}
                      onDrop={this.dropHandler.bind(this,index)}
                    >
                      {
                        index === currentIndex ? renderDragFill() : null
                      }
                    </item.dragItem>
                  ))
                 }
              </React.Fragment>
          </div>
      </div>
    )
  }
};
