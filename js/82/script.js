const nav = document.querySelector("#nav");

window.addEventListener("scroll",e => {
    if(window.scrollY > nav.offsetHeight + 100) {
        nav.classList.add("active");
    }else{
        nav.classList.remove("active");
    }
})