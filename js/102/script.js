const $ = (v,el = document) => el.querySelector(v);
const $$ = (v,el = document) => el.querySelectorAll(v);
const closeBtn = $(".close-btn");
const openBtn = $(".open-btn");
const navList = $$(".nav");
openBtn.addEventListener("click",() => changeNav("open"));
closeBtn.addEventListener("click",() => changeNav("close"));
function changeNav(type){
    navList.forEach(nav => nav.classList[type === "open" ? "add" : "remove"]("visible"));
}