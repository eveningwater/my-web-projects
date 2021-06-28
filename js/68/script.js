const $ = v => document.querySelector(v);
const content = $("#joke-content");
const getJokeBtn = $("#getJoke");
const translateBtn = $("#translate");
const headerConfig = {
    headers: {
        Accept: 'application/json',
    }
};
const api = 'https://icanhazdadjoke.com';
const on = (el,type,handler,useCapture = false) => {
    if(el && type && handler){
        el.addEventListener(type,handler,useCapture);
    }
}
on(translateBtn,'click',() => {
    window.open("https://www.eveningwater.com/my-web-projects/js/34/");
});
on(getJokeBtn,'click',request);
request();
async function request(){
    const res = await fetch(api,headerConfig);
    const data = await res.json();
    content.innerHTML = data.joke;
}
// function request(){
//     fetch(api,headerConfig).then(res => res.json()).then(data => {
//         content.innerHTML = data.joke;
//     })
// }