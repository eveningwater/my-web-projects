import './App.css';
import { useEffect, useState } from "react";
const imageItems = [
  'https://www.eveningwater.com/my-web-projects/js/26/img/1.jpg',
  'https://www.eveningwater.com/my-web-projects/js/26/img/2.jpg',
  'https://www.eveningwater.com/my-web-projects/js/26/img/3.jpg',
  'https://www.eveningwater.com/my-web-projects/js/26/img/6.jpg',
  'https://www.eveningwater.com/my-web-projects/js/26/img/7.jpg',
  'https://www.eveningwater.com/my-web-projects/js/26/img/8.jpg',
];
const DOCUMENT_TITLE = "Expanding Cards";
function App() {
  const [currentActive,setCurrentActive] = useState(0);
  const onChangeHandler = (index) => setCurrentActive(index);
  useEffect(() => {
      if(document.title !== DOCUMENT_TITLE){
         document.title = DOCUMENT_TITLE;
      }
  });
  return (
    <div className="app">
       {
         imageItems.map((item,index) => (
           <div 
              className={`panel ${currentActive === index ? "active" : "" }`} 
              style={{ backgroundImage:`url(${ item })`}} 
              onClick={ onChangeHandler.bind(this,index) }
              key={ item + index}
            >
              girl { item.slice(-5,item.length - 4)}
          </div>
         ))
       }
    </div>
  );
}

export default App;
