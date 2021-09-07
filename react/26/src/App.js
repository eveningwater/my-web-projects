import './App.css';
import React, { Component } from "react";
import ewColorPicker from "ew-color-picker";
import "ew-color-picker/dist/ew-color-picker.min.css";
const DOCUMENT_TITLE = "drawing-app";
const ColorPicker = (props) => {
  const option = props.colorOption;
  React.useEffect(() => {
    new ewColorPicker({
      el: props.colorPickerRef.current,
      ...option,
      isLog: false
    });
  });
  return (
    <div ref={props.colorPickerRef} className="color-picker"></div>
  )
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "black",
      size: 5,
      canvasStyle: {
        width: 800,
        height: 700
      },
      position: {
        x: undefined,
        y: undefined
      },
      colorOption: {
        pickerAnimation: "height",
        pickerAnimationTime: 300,
        predefineColor: [
          "red",
          "orange",
          "#2396ef",
          "#4097ef",
          "#fff",
          {
            color: "#9744ee"
          },
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgba(255, 120, 0, 1)',
          'rgba(51, 100, 98, 1)',
          'rgba(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ],
        alpha: true,
        size: {
          width: 35,
          height: 35
        },
        alphaDirection: "horizontal",
        clear: () => {
          this.setState({ color: "black" })
        },
        sure: (value) => {
          this.setState({ color: value })
        }
      }
    }
    this.isPressed = false;
    this.drawCircle = this.drawCircle.bind(this);
    this.drawLine = this.drawLine.bind(this);
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    this.ctx = this.canvasRef.current.getContext("2d");
  }
  componentWillUnmount() {

  }
  onChangeSize(e) {
    const { value } = e.target;
    let newValue = value;
    if(Number.isNaN(Number(newValue))){
      newValue = 5;
    }else {
       if(Number(newValue) < 5){
          newValue = 5;
       }
       if(Number(newValue) > 50){
         newValue = 50;
       }
    }
    this.setState({ size: newValue });
  }
  onMouseDownHandler(e) {
    this.isPressed = true;
    const { nativeEvent } = e;
    this.setState({
      position: {
        x: nativeEvent.offsetX,
        y: nativeEvent.offsetY
      }
    });
  }
  onMouseUpHandler() {
    this.isPressed = false;
    this.setState({
      position: {
        x: undefined,
        y: undefined
      }
    });
  }
  onMouseMoveHandler(e) {
    const { nativeEvent } = e;
    const { position: { x, y } } = this.state;
    if (this.isPressed) {
      const x2 = nativeEvent.offsetX,
        y2 = nativeEvent.offsetY;
      this.drawCircle(x2, y2);
      this.drawLine(x, y, x2, y2);
      this.setState({
        position: {
          x: x2,
          y: y2
        }
      });
    }
  }
  drawCircle(x2, y2) {
    if (!this.ctx) return;
    const { size, color } = this.state;
    this.ctx.beginPath();
    this.ctx.arc(x2, y2, size, 0, Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
  drawLine(x1, y1, x2, y2) {
    if (!this.ctx) return;
    const { size, color } = this.state;
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = size * 2;
    // this.ctx.lineJoin = "round";
    // If you don't set the `lineCap` to `round`,the line style is a bit range,like gears.
    this.ctx.lineCap = "round";
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
  decreaseHandler() {
    let { size } = this.state;
    size -= 5;
    if (size < 5) {
      size = 5;
    }
    this.setState({
      size: size
    });
  }
  increaseHandler() {
    let { size } = this.state;
    size += 5;
    if (size > 50) {
      size = 50;
    }
    this.setState({
      size: size
    });
  }
  clearCtxHandler() {
    if (!this.ctx) return;
    const { canvasStyle: { width, height } } = this.state;
    this.ctx.clearRect(0, 0, width, height);
  }
  colorPickerRef = React.createRef();
  canvasRef = React.createRef();
  render() {
    const { size, canvasStyle: { width, height } } = this.state;
    return (
      <div className="app">
        <div className="tool-box">
          <button type="button" className="btn decrease" onClick={this.decreaseHandler.bind(this)}>-</button>
          <input type="text" className="size" value={size} onInput={this.onChangeSize.bind(this)}></input>
          <button type="button" className="btn increase" onClick={this.increaseHandler.bind(this)}>+</button>
          <ColorPicker colorOption={this.state.colorOption} colorPickerRef={this.colorPickerRef}></ColorPicker>
          <button type="button" className="btn clear" onClick={this.clearCtxHandler.bind(this)}>&times;</button>
        </div>
        <canvas
          width={width}
          height={height}
          className="board"
          ref={this.canvasRef}
          onMouseDown={this.onMouseDownHandler.bind(this)}
          onMouseUp={this.onMouseUpHandler.bind(this)}
          onMouseMove={this.onMouseMoveHandler.bind(this)}
        ></canvas>
      </div>
    )
  }
};
