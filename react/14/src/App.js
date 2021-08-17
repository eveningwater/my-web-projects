import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "sound-board";
const sounds = ["applause","boo","gasp","tada","victory","wrong"];
const AUDIO_URL = "https://eveningwater.com/my-web-projects/js/67/audio/";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       audioRefs:[]
    };
    for(let i = 0,len = sounds.length;i < len;i++){
      this.state.audioRefs.push(React.createRef());
    }
  }
  onPlayHandler(index){
      const { audioRefs } = this.state;
      audioRefs.forEach(ref => {
        ref.current.pause();
        ref.current.currentTime = 0;
      });
      audioRefs[index].current.play();
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {
    
  }
  render() {
    const { audioRefs } = this.state;
    return (
      <div className="app">
          <div className="button-container">
             {
               sounds.map((sound,index) => (
                 <>
                    <button type="button" className="btn" key={sound + index} onClick={this.onPlayHandler.bind(this,index)}>{ sound }</button>
                    <audio src={AUDIO_URL + sound + '.mp3'} ref={audioRefs[index]}></audio>
                 </>
               ))
             }
          </div>
      </div>
    )
  }
};
