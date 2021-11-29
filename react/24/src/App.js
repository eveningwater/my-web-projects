import './App.css';
import React, { Component } from "react";
const DOCUMENT_TITLE = "theme-clock";
const langText = {
  'zh':{
      "mode-dark-text":"黑暗模式",
      "mode-light-text":"明亮模式",
      "lang-text":"中文",
      "time-before-text":"上午",
      "time-after-text":"下午",
      "date-day-text":"日",
      "days":["星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      "months":["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
  },
  'en':{
      "mode-dark-text":"dark mode",
      "mode-light-text":"light mode",
      "lang-text":"English",
      "time-before-text":"AM",
      "time-after-text":"PM",
      "date-day-text":"",
      "days":["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "months":["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }
};
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (n,inMin,inMax,outerMin,outerMax) => (n - inMin) * (outerMax - outerMin) / (inMax - inMin) + outerMin;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentLang:"zh",
        currentTheme:"light",
        hourTransform:"",
        minuteTransform:"",
        secondTransform:"",
        hour:"",
        minute:"",
        day:0,
        month:0,
        time:""
    };
    this.timer = null;
    this.startDate = this.startDate.bind(this);
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    this.startDate();
  }
  componentWillUnmount() {
      if(this.timer){
         clearTimeout(this.timer);
      }
  }
  startDate(){
    const date = new Date(),
          month = date.getMonth(),
          day = date.getDay(),
          time = date.getDate(),
          hour = date.getHours(),
          hourForClock = hour % 12,
          minute = date.getMinutes(),
          second = date.getSeconds();
    this.setState({
       hourTransform:`translate(-50%,-100%) rotate(${ scale(hourForClock,0,11,0,360) }deg)`,
       minuteTransform:`translate(-50%,-100%) rotate(${ scale(minute,0,59,0,360) }deg)`,
       secondTransform:`translate(-50%,-100%) rotate(${ scale(second,0,59,0,360) }deg)`,
       hour,
       minute,
       month,
       day,
       time
    });
    this.timer = setTimeout(this.startDate,1000);
  }
  changeTheme(){
     const theme = this.state.currentTheme;
     this.setState({
        currentTheme:theme === "dark" ? "light" : "dark"
     })
  }
  changeLang(){
    const { currentLang:lang } = this.state;
    this.setState({
      currentLang:lang === "en" ? "zh" : "en"
    })
  }
  render() {
    const { 
        currentLang,
        currentTheme,
        hourTransform,
        minuteTransform,
        secondTransform,
        hour,
        minute,
        month,
        day,
        time
    } = this.state;
    return (
      <div className={`app${ currentTheme === 'dark' ? ' dark' : ''}`}>
         <div className="btn-group">
             <button type="button" className="btn" onClick={ this.changeTheme.bind(this) }>{ langText[currentLang]['mode-' + (currentTheme === "dark" ? "light" : "dark") + '-text']}</button>
             <button type="button" className="btn" onClick={ this.changeLang.bind(this) }>{ langText[(currentLang === "zh" ? "en" : "zh")]['lang-text']}</button>
         </div>
         <div className="clock-container">
            <div className="clock">
                <div className="needle hour" style={{ transform:hourTransform}}></div>
                <div className="needle minute" style={{ transform:minuteTransform}}></div>
                <div className="needle second" style={{ transform:secondTransform}}></div>
                <div className="center-point"></div>
            </div>
            <div className="time">
              { hour }:{ minute >= 10 ? minute : '0' + minute }&nbsp;{ langText[currentLang]["time-"+(hour >= 12 ? "after" : "before")+"-text"] }
            </div>
            <div className="date">
               { langText[currentLang].days[day] },{ langText[currentLang].months[month]}
               <span className="circle">{ time }</span>
               { langText[currentLang]["date-day-text"]}
            </div>
         </div>
      </div>
    )
  }
};
