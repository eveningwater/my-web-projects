const $ = v => document.querySelector(v);
const $$ = v => document.querySelectorAll(v);
const cardHeader = $("#card-header");
const cardTitle = $("#card-title");
const cardMessage = $("#card-message");
const cardAuthorAvatar = $("#card-author-avatar");
const cardAuthorName = $("#card-author-name");
const cardAuthorDate = $("#card-author-date");

const animated_bgs = $$(".animated-bg");
const animated_bgs_texts = $$(".animated-bg-text");

const cardObject = {
    cardHeader:"https://www.eveningwater.com/my-web-projects/js/81/images/header.png",
    cardTitle:"草帽小子",
    cardMessage:"外号“草帽”路飞，是草帽一伙、草帽大船团船长，极恶的世代之一。橡胶果实能力者，悬赏金<mark>15</mark>亿贝里。梦想是找到传说中的<mark>One Piece</mark>，成为海贼王。",
    cardAuthorAvatar:"https://www.eveningwater.com/my-web-projects/js/81/images/avatar.png",
    cardAuthorName:"蒙奇·D·路飞",
    cardAuthorDate:"2021-07-12"
}

setTimeout(initCardHTML,200);
function setAttr(url,el,prop = "src"){
    console.log(url)
    return el.querySelector("img").setAttribute(prop,url);
}
function setHTML(html,el,prop = "innerHTML"){
    return el[prop] = html;
}
function initCardHTML(){
    [ 
        {
            el:cardHeader,
            prop:"cardHeader"
        },
        {
            el:cardAuthorAvatar,
            prop:"cardAuthorAvatar"
        }
    ].forEach(item => setAttr(cardObject[item.prop],item.el));
    [
        {
            el:cardTitle,
            prop:"cardTitle"
        },
        {
            el:cardMessage,
            prop:"cardMessage"
        },
        {
            el:cardAuthorName,
            prop:"cardAuthorName"
        },
        {
            el:cardAuthorDate,
            prop:"cardAuthorDate"
        }
    ].forEach(item => setHTML(cardObject[item.prop],item.el));
    animated_bgs.forEach(bg => bg.classList.remove("animated-bg"));
    animated_bgs_texts.forEach(text => text.classList.remove("animated-bg-text"));
}