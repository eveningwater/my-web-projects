const $ = (v,el = document) => el.querySelector(v);
const $$ = (v,el = document) => el.querySelectorAll(v);
const ratingItem = $$(".ratings-container .rating");
const send = $("#send");
const back = $("#back");
const sendPage = $(".send-page");
const receivePage = $(".receive-page");
const selectRatingItem = $("#selectRating");
const siblings = el => [].filter.call(el.parentElement.children,item => el !== item);
let selectRating = $(".rating.active").innerText;
ratingItem.forEach(item => {
    item.addEventListener("click",e => {
        siblings(item).forEach(sib => sib.classList.remove("active"));
        item.classList.add("active");
        selectRating = item.innerText;
    })
});
send.addEventListener("click",() => {
    selectRatingItem.innerText = selectRating;
    sendPage.classList.add("hide");
    receivePage.classList.remove("hide");
});
back.addEventListener("click",() => {
    selectRating = $(".rating.active").innerText;
    selectRatingItem.innerText = $(".rating.active").innerText;
    sendPage.classList.remove("hide");
    receivePage.classList.add("hide");
});