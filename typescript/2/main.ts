import "./style.less";
const toTop:HTMLDivElement = document.querySelector(".toTop");
let timer:NodeJS.Timeout = null;
const element = document.documentElement || document.body;
window.addEventListener("scroll",() => {
   const { scrollTop } = element;
   toTop.style.display = scrollTop >= 100 ? "block" : "none";
});
const toTopHandler = () => {
  const { scrollTop } = element;
  const speed:number = (-scrollTop / 6);
  element.scrollTop = scrollTop + speed;
  if(scrollTop === 0){
     clearTimeout(timer);
  }else{
     timer = setTimeout(toTopHandler,60);
  }
}
toTop.addEventListener("click",() => {
  toTopHandler();
});