import './App.css';
import React,{ useEffect,useState } from "react";
import Input from "./components/Input";
const DOCUMENT_TITLE = "hidden-search-widget";
function App() {
  const inputRef = React.createRef();
  useEffect(() => {
     if(document.title !== DOCUMENT_TITLE){
        document.title = DOCUMENT_TITLE;
     }
  });
  const [currentActive,setCurrentActive] = useState("");
  const changeActive = () => {
      let active = !currentActive ? " active" : "";
      setCurrentActive(active);
      // console.log(active)
      if(inputRef.current && active.trim().indexOf("active") > -1){
          inputRef.current.focus();
      }
  }
  return (
    <div className="app">
        <Input className={"search-container" + currentActive } placeholder="请输入需要搜索的内容" inputClassName="input" inputRef={inputRef}>
          <button type="button" className="search-btn" onClick={ changeActive }>
             <i className="search-icon"></i>
          </button>
        </Input>
    </div>
  );
}

export default App;
