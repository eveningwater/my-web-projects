const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
const $ = v => document.querySelector(v);
const search = $("#search");
const list = $("#movie-list");
async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}
function showMovies(movies){
    list.innerHTML = "";
    let html = "";
    movies.forEach(movie => {
        const { title,vote_average,overview,poster_path } = movie;
        html += `
            <li class="movie">
                <img src="${ IMG_PATH + poster_path }" alt="图片加载中">
                <div class="movie-info">
                    <h3 class="movie-name">${ title }</h3>
                    <span class="movie-score ${ setVoteClass(vote_average) }">${ vote_average }</span>
                </div>
                <div class="movie-overview">
                    <h3>${ title }</h3>
                    <p>${ overview }</p>
                </div>
            </li>
        `;
    });
    list.innerHTML = html;
}
function setVoteClass(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}
function searchMovies(){
    search.addEventListener('keydown',e => {
        if(e.keyCode === 13){
            let value = e.target.value.replace(/\s+/,"");
            if(value){
                getMovies(SEARCH_API + value);
                setTimeout(() => {
                    e.target.value = "";
                },1000);
            }else{
                window.location.reload(true);
            }
        }
    })
}
window.onload = () => {
    getMovies(API_URL);
    searchMovies();
}