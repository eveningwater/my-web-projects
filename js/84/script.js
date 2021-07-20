// https://github.com//eveningwater/my-web-projects
const $  = v => document.querySelector(v);
const container = $("#toast-container");
const autoBtn = $("#autoBtn");
const notAutoBtn = $("#notAutoBtn");
const messages = [
    "消息内容1",
    "消息内容2",
    "消息内容3",
    "消息内容4",
    "消息内容5"
];
const types = ["success","info","error","default","warning"];
const getRandom = data => data[Math.floor(Math.random() * data.length)];
const createEle = el => document.createElement(el);
const randomRange = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;
const maxWidth = window.innerWidth,maxHeight = window.innerHeight - 60;
const leftPositions = [],topPositions = [];
for(let i = 0;i < 20;i++){
    leftPositions.push(randomRange(0,maxWidth));
    topPositions.push(randomRange(0,maxHeight));
}
autoBtn.addEventListener("click",() => {
    const randomType = getRandom(types);
    const randomMessage = getRandom(messages);
    const left = getRandom(leftPositions);
    const top = getRandom(topPositions);
    createNotification({
        message:randomMessage,
        type:randomType,
        auto:true,
        autoTime:3000,
        left,
        top
    });
});
notAutoBtn.addEventListener("click",() => {
    const randomType = getRandom(types);
    const randomMessage = getRandom(messages);
    const left = getRandom(leftPositions);
    const top = getRandom(topPositions);
    createNotification({
        message:randomMessage,
        type:randomType,
        autoTime:false,
        left,
        top
    });
});
function createNotification({message = null,type = null,auto = false,autoTime = 1000,left = 0,top = 0}){
    const toastItem = createEle("div");
    let closeItem = null;
    if(!auto){
        closeItem = createEle("span");
        closeItem.innerHTML = "&times;";
        closeItem.className = "toast-close-btn";
    }
    toastItem.className = `toast toast-${type}`;
    toastItem.textContent = message;
    if(closeItem)toastItem.appendChild(closeItem);
    container.appendChild(toastItem);
    const leftValue = (left - toastItem.clientWidth) <= 0 ? 0 : left - toastItem.clientWidth - 30;
    const topValue = (top - toastItem.clientHeight) <= 0 ? 0 : top - toastItem.clientHeight - 30;
    toastItem.style.left = leftValue + 'px';
    toastItem.style.top = topValue + 'px';
    if(auto){
        setTimeout(() => {
            toastItem.remove();
        },autoTime);
    }else{
        closeItem.addEventListener("click",() => {
            toastItem.remove();
        });
    }
    
}
