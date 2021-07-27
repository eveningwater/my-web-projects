const $ = (v,el = document) => el.querySelector(v);
const $$ = (v,el = document) => el.querySelectorAll(v);
const carouselItems = $$(".carousel-item");
const navItems = $$(".nav li");
function hideAllElement(nodeList){
    nodeList.forEach(item => item.classList.remove("active"));
}
navItems.forEach((item,index) => {
    item.addEventListener("click",() => {
        hideAllElement(navItems);
        hideAllElement(carouselItems);
        item.classList.add("active");
        carouselItems[index].classList.add("active");
    })
})