// https://github.com/eveningwater/my-web-projects/tree/master/js/108
const $ = (v,el = document) => el.querySelector(v);
const $$ = (v,el = document) => el.querySelectorAll(v);
const siblings = el => [].filter.call(el.parentElement.children,item => item !== el);
const filterZero = v => `0${v}`.slice(-2);
const screens = $$(".screen");
const tabItems = $$(".tab-container .tab-item");
const firstTitle = $("#firstTitle");
const play = $("#play");
const chooseItems = $$(".choose-btn",$("#inspect-list"));
const secondTitle = $("#secondTitle");
const time = $("#time");
const timeSpan = $("span",time);
const scoreEl = $("#score");
const scoreSpan = $("span",scoreEl);
const message = $("#message");
const continueBtn = $("#continue");
const restartPlayBtn = $("#restart");
let currentLang = "en";
let startInterval = null;
let seconds = 0;
let selectInsect = { };
let score = 0;
// https://stackoverflow.com/questions/12919074/js-replace-only-text-without-html-tags-and-codes
function replaceText(el,text,wrapSymbol = ""){
    let newText = [];
    if(wrapSymbol){
        // why not use split method?,because it can filter the wrap symbol.
        const getIndex = (txt) => txt.search(new RegExp("\\" + wrapSymbol));
        let searchIndex = getIndex(text),i = 0,len = text.length;
        while(searchIndex !== -1){
            newText.push(text.slice(i,searchIndex) + wrapSymbol);
            i = searchIndex;
            if(getIndex(text.slice(searchIndex + 1)) === -1){
                newText.push(text.slice(searchIndex + 1,len));
            }
            searchIndex = getIndex(text.slice(searchIndex + 1));
        }
    }
    const walk = (el,handler) => {
        const children = Array.from(el.childNodes);
        let wrapIndex = children.findIndex(node => node.nodeName.toLowerCase() === "br");
        children.forEach((node,index) => {
            if(node.nodeType === 3 && node.textContent.replace(/\s+/,"")){
                wrapSymbol ? handler(node,newText[index - wrapIndex < 0 ? 0 : index - wrapIndex]) : handler(node,text);;
            }
        });
    }
    walk(el,(node,txt) => {
        const parent = node.parentNode;
        parent.insertBefore(document.createTextNode(txt),node);
        parent.removeChild(node);
    });
}
function initLangText(){
    const initData = globalData[currentLang];
    const needReplaceElementTexts = [
        {
            node:time,
            data:initData.countTime,
            wrap:""
        },
        {
            node:scoreEl,
            data:initData.score,
            wrap:""
        },
        {
            node:message,
            data:initData.message,
            wrap:"?"
        }
    ];
    const needReplaceTexts = [
        {
            node:firstTitle,
            data:initData.firstTitle
        },
        {
            node:secondTitle,
            data:initData.secondTitle
        },
        {
            node:play,
            data:initData.playText
        },
        {
            node:continueBtn,
            data:initData.continueText
        },
        {
            node:restartPlayBtn,
            data:initData.restartPlayText
        }
    ];
    tabItems.forEach(item => {
        const attr = item.getAttribute("data-value");
        item.textContent = initData[attr];
    });
    needReplaceElementTexts.forEach(item => replaceText(item.node,item.data,item.wrap));
    needReplaceTexts.forEach(item => item.node.innerText = item.data);
    chooseItems.forEach((item,index) => {
        const content = $("p",item),image = $("img",item);
        image.setAttribute("alt",initData.insectNameList[index]);
        content.innerText = initData.insectNameList[index];
    })
    document.title = initData.documentTitle;
}
function getRandomLocation(){
    let w = window.innerWidth,h = window.innerHeight;
    let x = Math.random() * (w - 200) + 100;
    let y = Math.random() * (h - 200) + 100;
    return { x,y };
}
function startGame(){
    startInterval = setInterval(increaseTime,1000);
}
function increaseTime(){
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    timeSpan.textContent = `${ filterZero(m)} : ${ filterZero(s)}`;
    seconds++;
}
function createInsect(){
    const insectItem = document.createElement("div");
    insectItem.classList.add("insect");
    const {x,y} = getRandomLocation();
    insectItem.style.left = x + 'px';
    insectItem.style.top = y + 'px';
    insectItem.innerHTML = `
        <img src="${ selectInsect.src }" alt="${ selectInsect.alt }" style="transform:rotate(${ Math.random() * 360 }deg)"/>
    `;
    insectItem.addEventListener("click",catchInsect);
    screens[2].appendChild(insectItem);
}
function catchInsect(){
    if(message.classList.contains("show"))return;
    increaseScore();
    this.classList.add("caught");
    setTimeout(() => this.remove(),2000);
    addInsects();
}
function addInsects(){
    setTimeout(createInsect,1500);
    setTimeout(createInsect,2000);
}
function increaseScore(){
    score++;
    if(score > 20){
        message.classList.add("show");
        if(startInterval){
            clearInterval(startInterval);
        }
    }
    scoreSpan.innerHTML = `${score}`;
}
window.onload = () => {
    tabItems.forEach(item => {
        item.addEventListener("click",() => {
            item.classList.add("active");
            siblings(item).forEach(item => item.classList.remove("active"));
            currentLang = item.getAttribute("data-value");
            initLangText();
        });
    });
    play.addEventListener("click",() => {
        screens[0].classList.add("hidden");
    });
    chooseItems.forEach(item => {
        item.addEventListener("click",() => {
            const img = $('img',item);
            const src = img.getAttribute("src");
            const alt = img.getAttribute("alt");
            selectInsect = { src,alt };
            screens[1].classList.add("hidden");
            setTimeout(createInsect,1000);
            startGame();
        });
    });
    continueBtn.addEventListener("click",() => {
        message.classList.remove("show");
        startGame();
    });
    restartPlayBtn.addEventListener("click",() => window.location.reload());
}