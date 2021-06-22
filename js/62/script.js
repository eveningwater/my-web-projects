const searchBtn = document.querySelector("#searchBtn");
const searchContainer = document.querySelector(".search");
searchBtn.addEventListener('click',() => {
    const classList = searchContainer.classList
    if(classList.contains('active')){
        classList.remove('active');
    }else{
        classList.add('active');
    }
})