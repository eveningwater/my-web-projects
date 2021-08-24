import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "incrementing-counter";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counterList: [
        {
          class: "fa-youtube",
          value: 5000,
          initValue: 0,
          text: "YouTube Subscribers",
          timer: null
        },
        {
          class: "fa-facebook",
          value: 7500,
          initValue: 0,
          text: "Facebook Fans",
          timer: null
        },
        {
          class: "fa-twitter",
          value: 12000,
          initValue: 0,
          text: "Twitter Followers",
          timer: null
        }
      ],
    };
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    this.startCounter();
  }
  startCounter() {
    const counterList = [...this.state.counterList];
    // https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
    // https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-react-js
    counterList.forEach(counter => {
      const updateCounter = () => {
          const value = counter.value;
          const increment = value / 100;
          if (counter.initValue < value) {
            counter.initValue = Math.ceil(counter.initValue + increment);
            // use setTimeout or setInterval ?
            counter.timer = setTimeout(updateCounter, 60);
          } else {
            counter.initValue = value;
            clearTimeout(counter.timer);
          }
          // update the array,maybe it's not a best way,is there any other way?
          this.setState({ counterList });
      }
      updateCounter();
    })
  }
  componentWillUnmount() {

  }
  render() {
    const { counterList } = this.state;
    return (
      <div className="app">
        {
          counterList.map((counter, index) => (
            <div className="counter" key={counter.class + index}>
              <i className={`fab fa-3x ${counter.class}`}></i>
              <div className="counter-value">{counter.initValue}</div>
              <span className="counter-text">{counter.text}</span>
            </div>
          ))
        }
      </div>
    )
  }
};
