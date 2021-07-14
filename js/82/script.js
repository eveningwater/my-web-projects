const nav = document.querySelector("#nav");
const menu = nav.querySelector(".nav-menu");
const navList = nav.querySelector(".nav-list");
menu.addEventListener("click",() => {
     const display = window.getComputedStyle(navList,null).getPropertyValue("display");
     if(display === "none"){
         navList.style.display = "block";
         navList.style.width = "100%";
         navList.style.height = "200px";
     }else{
        navList.style.display = "none";
        navList.style.width = "0";
        navList.style.height = "0";
     }
})
window.addEventListener("scroll",e => {
    if(window.scrollY > nav.offsetHeight + 100) {
        nav.classList.add("active");
    }else{
        nav.classList.remove("active");
    }
})