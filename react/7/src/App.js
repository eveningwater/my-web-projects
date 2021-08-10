import { useState } from 'react';
import './App.css';
import Step from "./components/step";
function App() {
  const stepItems = [
    {
      text: "1"
    },
    {
      text: "2"
    },
    {
      text: "3"
    },
    {
      text: "4"
    }
  ];
  const secondStepItems = [
    {
      text: "活动未开始"
    },
    {
      text: "活动已开始"
    },
    {
      text: "活动快完成"
    },
    {
      text: "活动已结束"
    }
  ];
  const [currentActive, setCurrentActive] = useState(0);
  const prevHandler = () => {
    let count = currentActive;
    if (count > 0) {
        count--;
        setCurrentActive(count);
    }
  }
  const nextHandler = () => {
    let count = currentActive;
    if (count < stepItems.length - 1) {
        count++;
        setCurrentActive(count);
    }
  }
  const selectStep = (value) => {
    alert("请查看你的控制台以查看选中的值!");
    const consoleText = "你选择的是:" + value.text;
    console.log("%c " + consoleText,"background:#0ca6dc;padding:4px 10px;border-radius:3px;color:#fff");
  }
  return (
    <div className="app">
      <Step width="350px" stepItems={stepItems} currentActive={currentActive} onClickItem={selectStep}></Step>
      <Step width="350px" stepItems={secondStepItems} currentActive={currentActive} onClickItem={selectStep}></Step>
      <div>
        <button type="button" className="prev" onClick={prevHandler} disabled={currentActive === 0}>上一步</button>
        <button type="button" className="next" onClick={nextHandler} disabled={currentActive === stepItems.length - 1}>下一步</button>
      </div>
    </div>
  );
}

export default App;
