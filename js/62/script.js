const $ = v => document.querySelector(v);
const searchBtn = $("#searchBtn");
const searchContainer = $(".search");
const searchInput = $(".input");
searchBtn.addEventListener('click',() => {
    searchContainer.classList.toggle('active');
    searchInput.focus();
})