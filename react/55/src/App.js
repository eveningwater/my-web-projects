import './App.css';
import React,{ Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = (lang) => lang === "en" ? "insect-catch-game" : "捉虫小游戏";
const globalData = {
    "en":{
        firstTitle:"Catch The Insect",
        playText:"Play Game",
        secondTitle:"What is your \"favorite\" insect?",
        insectNameList:[
            "Fly",
            "Mosquito",
            "Spider",
            "Roach"
        ],
        countTime:"Time:",
        score:"Score:",
        message:"Tell you a bad news, will you be angry? Actually you are playing a game that never ends!!",
        continueText:"Continue Play",
        restartPlayText:"Restart Play",
        en:"en",
        zh:"zh"
    },
    "zh":{
        firstTitle:"捉虫",
        playText:"玩游戏",
        secondTitle:"你\"最喜欢\"的昆虫是什么?",
        insectNameList:[
            "苍蝇",
            "蚊子",
            "蜘蛛",
            "蟑螂"
        ],
        countTime:"时间:",
        score:"得分:",
        message:"告诉你一个不好的消息，你会不会生气呢?其实你在玩一个永远都不结束的游戏!!",
        continueText:"继续玩",
        restartPlayText:"重新玩",
        en:"英文",
        zh:"中文"
    }
};
const IMAGE_URL = "https://eveningwater.com/my-web-projects/js/108/images/";
const filterZero = v => `0${v}`.slice(-2);
let seconds = 0;
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentLang:"en",
            imageList:[
                { name:"fly"},
                { name:"mosquito"},
                { name:"spider"},
                { name:"roach"}
            ],
            currentScreen:null,
            currentInsect:"",
            time:"00:00",
            score:0,
            showMessage:false,
            insectList:[],
            caught:null
        }
        this.getRandomLocation = this.getRandomLocation.bind(this);
        this.timer = null;
        this.startGame = this.startGame.bind(this);
        this.increaseTime = this.increaseTime.bind(this);
        this.increaseScore = this.increaseScore.bind(this);
        this.createInsects = this.createInsects.bind(this);
        this.createInsect = this.createInsect.bind(this);
    }
    componentDidMount(){
        this.onChangeDocumentTitle();
    }
    componentWillUnmount(){
       clearInterval(this.timer);
    }
    increaseTime(){
        let m = Math.floor(seconds / 60),s = seconds % 60;
        this.setState({ time:`${filterZero(m)}:${filterZero(s)}`},() => seconds++);
    }
    increaseScore(){
        let { score } = this.state;
        score++;
        if(score > 20){
            clearInterval(this.timer);
            this.setState({ showMessage:true });
        }
        this.setState({ score });
    }
    createInsect(){
        const { insectList } = this.state;
        const {x,y} = this.getRandomLocation();
        insectList.push({
            left:x,
            top:y,
            rotate:Math.random() * 360
        });
        this.setState({ insectList })
    }
    createInsects(){
        const { currentInsect } = this.state;
        if(!currentInsect){
            return;
        }
        setTimeout(() => this.createInsect(),1500);
        setTimeout(() => this.createInsect(),2000);
    }
    startGame(){
        this.timer = setInterval(this.increaseTime,1000)
    }
    onChangeDocumentTitle(){
        if(document.title !== DOCUMENT_TITLE(this.state.currentLang)){
            document.title = DOCUMENT_TITLE(this.state.currentLang);
        }
    }
    onChangeLangHandler(key){
        this.setState({ currentLang:key },() => this.onChangeDocumentTitle());
    }
    onStartGameHandler(){
        this.setState({ currentScreen:1 })
    }
    onChooseInsectHandler(name){
        this.createInsect();
        this.setState({ currentScreen:2,currentInsect:name },() => this.startGame())
    }
    getRandomLocation(){
        const w = window.innerWidth,h = window.innerHeight;
        let x = Math.random() * (w - 200) + 100,y = Math.random() * (h - 200) + 100;
        return {
            x,
            y
        }
    }
    onContinueHandler(){
        this.setState({ showMessage:false},() => this.startGame())
    }
    onCatchInsect(index){
        const { showMessage,insectList } = this.state;
        if(showMessage){
            return;
        }
        this.increaseScore();
        this.setState({ caught:index },() => {
            insectList.splice(index,1);
            this.setState({ caught:null });
            setTimeout(() => this.setState({ insectList }),2000);
        })
        this.createInsects();
    }
    onRestartHandler(){
        clearInterval(this.timer);
        this.setState({ 
            currentScreen:null,
            score:0,
            time:"00:00",
            showMessage:false,
            caught:null
        },() => {
            // why need to delay?
            setTimeout(() => this.setState({insectList:[],currentInsect:""}),1000);
        });
    }
    render(){
        const { currentLang,imageList,currentScreen,time,score,showMessage,insectList,currentInsect,caught } = this.state;
        return (
            <div className="app">
                <div className="ci-tab-container">
                    <div className={`ci-tab-item${ currentLang==="en" ? " active" : ""}`} onClick={this.onChangeLangHandler.bind(this,"en")}>{globalData[currentLang]["en"]}</div>
                    <div className={`ci-tab-item${ currentLang==="zh" ? " active" : ""}`} onClick={this.onChangeLangHandler.bind(this,"zh")}>{globalData[currentLang]["zh"]}</div>
                </div>
                <div className={`ci-screen${ typeof currentScreen === "number" && currentScreen !== 0 ? " hidden" : ""}`}>
                    <Title className="ci-first-title">{ globalData[currentLang].firstTitle }</Title>
                    <button type="button" className="ci-start-btn ci-btn" onClick={this.onStartGameHandler.bind(this)}>{globalData[currentLang].playText }</button>
                </div>
                <div className={`ci-screen${ typeof currentScreen === "number" & currentScreen !== 1 ? " hidden" : ""}`}>
                    <Title level="2" className="ci-second-title">{globalData[currentLang].secondTitle}</Title>
                    <ul className="ci-insect-list">
                        {
                            imageList.map((item,index) => (
                                <li className="ci-insect-list-item" key={item.name + index}>
                                    <div className="ci-choose-btn" onClick={this.onChooseInsectHandler.bind(this,item.name)}>
                                        <p className="ci-choose-name">{globalData[currentLang].insectNameList[index]}</p>
                                        <img src={IMAGE_URL + item.name + ".png"} alt={item.name} className="ci-choose-img"></img>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="ci-screen">
                    <Title level="3" className="ci-time">{globalData[currentLang].countTime}<span>{ time }</span></Title>
                    <Title level="3" className="ci-score">{globalData[currentLang].score}<span>{ score }</span></Title>
                    <div className={`ci-message${showMessage ? " show" : ""}`}>
                        <p dangerouslySetInnerHTML={{ __html:globalData[currentLang]["message"].split("?").map((item,index) => (index === 0 ? item + "?<br />" : item)).join("") }}></p>
                        <button type="button" className="ci-btn ci-continue-btn" onClick={this.onContinueHandler.bind(this)}>{globalData[currentLang].continueText}</button>
                        <button type="button" className="ci-btn ci-restart-btn" onClick={this.onRestartHandler.bind(this)}>{globalData[currentLang].restartPlayText}</button>
                    </div>
                    {
                        insectList.map((insect,index) => (
                            <div className={`ci-insect${caught === index ? " caught" : ""}`} style={{ left:insect.left + 'px',top:insect.top + 'px'}} key={insect.left + index} onClick={this.onCatchInsect.bind(this,index)}>
                                <img 
                                    className="ci-choose-img" 
                                    src={IMAGE_URL + currentInsect + '.png'} 
                                    alt={currentInsect}
                                    style={{ transform:`rotate(${insect.rotate}deg)` }}
                                ></img>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
