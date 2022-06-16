import { useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './style/app.scss';
import $message from './utils/message';
import { translate,$ } from './utils/util';

function App() {
  const [lang,setLang] = useState("en");
  const [word,setWord] = useState("");
  const onChangeHandler = (v:string) => setLang(v);
  const onChangeWordHandler = (v:string) => setWord(v);
  const onClickHandler = (type:string) => {
      if(type === "clear"){
        setWord("");
      }
      if(type === "translate"){
          if(!word){
             return $message.warning("请输入需要翻译的单词或语句!");
          }
          const s = $("#translateScript");
          if (s) {
            (s.parentElement as HTMLElement).removeChild(s);
          }
          translate(word, lang);
      }
  }
  return (
    <div className="app">
       <main className="rt-main">
           <Header onChange={onChangeHandler}></Header>
           <Content onChangeWord={onChangeWordHandler} propWord={word}></Content>
           <Footer onClick={onClickHandler}></Footer>
       </main>
    </div>
  );
}

export default App;
