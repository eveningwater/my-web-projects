import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "Drink Water";
// const selectItem = { text:250,isActive:false };
const selectCups = [
  [{ text: 250, isActive: false }, { text: 250, isActive: false }, { text: 250, isActive: false }, { text: 250, isActive: false }],
  [{ text: 250, isActive: false }, { text: 250, isActive: false }, { text: 250, isActive: false }, { text: 250, isActive: false }]
];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        remindLiters:2,
        remindStyle:{
            height:"350px",
            visibility:"visible"
        },
        percentStyle:{
          height:"0px",
          visibility:"hidden"
        },
        percent:0,
        //a stranger effect about using the code as follows,this is bug about `new Array or fill`?
        // see this to get the answers
        // https://stackoverflow.com/questions/39396411/if-we-create-an-array-of-objects-using-new-arraylen-fil-and-then-add-a-ke
        // selectCups:new Array(2).fill([selectItem,selectItem,selectItem,selectItem]),
        selectCups:selectCups,
    };
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  }
  componentWillUnmount() {

  }
  filterTotal(value){
     return value >= 100 ? 100 : value <= 0 ? 0 : value;
  }
  onSelectHandler(rowIndex,index){
     let newSelectCups = [...this.state.selectCups];
     if(rowIndex === 1 && index === 3){
        if(!newSelectCups[rowIndex][index].isActive){
          newSelectCups.forEach(row => row.forEach(cup => cup.isActive = true));
        }
     }else if(rowIndex === 1 && index < 3){
        newSelectCups[rowIndex - 1].forEach(cup => cup.isActive = true);
        const next = newSelectCups[rowIndex][index + 1];
        newSelectCups[rowIndex].forEach((cup,cupIndex) => cup.isActive = cupIndex > index ? false : cupIndex === index ? (next.isActive ? true : !cup.isActive) : true);
     }else {
        const next = index === 3 ? newSelectCups[rowIndex + 1][0] : newSelectCups[rowIndex][index + 1];
        newSelectCups[rowIndex].forEach((cup,cupIndex) => cup.isActive = cupIndex > index ? false : cupIndex === index ? (next.isActive ? true : !cup.isActive) : true);
        newSelectCups[rowIndex + 1].forEach(cup => cup.isActive = false);
     }
     const activeCups = [...newSelectCups].flat().filter(cup => cup.isActive);
     //computed the total
     const activeCupTotal = activeCups.reduce((v,i) => v + i.text,0);
     const newPercent = this.filterTotal((activeCupTotal / 1000 / 2));
    // compute the height
     this.setState({ 
        selectCups:newSelectCups,
        percent: newPercent * 100,
        remindLiters:2 - activeCupTotal / 1000,
        remindStyle:{
           height:newPercent * 100 === 100 ? "0px" : 350 * (1 - newPercent) + 'px',
           visibility:newPercent * 100 === 100 ? "hidden" : "visible"
        },
        percentStyle:{
          height:newPercent === 0 ? "0px" : 350 * newPercent + 'px',
          visibility:newPercent === 0 ? "hidden" : "visible"
        }
     });
  }
  render() {
    const { remindLiters,remindStyle,percentStyle,percent,selectCups } = this.state;
    return (
      <div className="app">
         <div className="container">
            <Title level="2">{ DOCUMENT_TITLE }</Title>
            <div className="total">Goal: 2 Liters</div>
            <div className="class-cup">
               <div className="remind" style={ remindStyle }>
                   <span className="cup-total">{ remindLiters }L</span>
                   <span>Remained</span>
               </div>
               <div className="percent" style={ percentStyle }>{ percent }%</div>
            </div>
            <p>Select how many glasses of water that you have drank</p>
            <div className="select-cup">
               {
                 selectCups.map((row,rowIndex) => (
                   <div className="row" key={ row + rowIndex }>
                      {
                        row.map((cup,index) => (
                          <div className={`cup${ cup.isActive ? " active" : "" }`} key={ cup + index } onClick={ this.onSelectHandler.bind(this,rowIndex,index)}>{ cup.text } ml</div>
                        ))
                      }
                   </div>
                 ))
               }
            </div>
         </div>
      </div>
    )
  }
};
