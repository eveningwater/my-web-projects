import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
const DOCUMENT_TITLE = "movie-app";
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        movieList:[],
        searchValue:""
    };
  }
  componentDidMount() {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
    this.getMovies(API_URL);
  }
  async getMovies(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      this.setState({ movieList:data.results });
    } catch (error) {
      
    }
  }
  componentWillUnmount() {

  }
  setVoteFontColor(vote){
     if(vote >= 8){
        return { color:"#4ce21f"};
     }else if(vote >= 5){
        return { color:"#eba015"};
     }else{
        return { color:"#ec3d3d"};
     }
  }
  onSearchHandler(e){
      const { keyCode } = e;
      if(keyCode === 13){
         this.getMovies(SEARCH_API + this.state.searchValue);
         setTimeout(() => this.setState({ searchValue:""}),2000);
      }
  }
  onChangeHandler(e){
    const { value } = e.target;
    this.setState({ searchValue:value });
  }
  render() {
    const { movieList,searchValue } = this.state;
    return (
      <div className="app">
         <main className="main">
            <header className="header">
               <input type="text" className="search" placeholder="Search movies" onKeyDown={ this.onSearchHandler.bind(this)} value={searchValue} onChange={ this.onChangeHandler.bind(this)}/>
            </header>
            <ul className="movie-list">
               {
                  movieList.map((movie,index) => (
                    <li className="movie" key={movie.id + index}>
                        <img src={IMG_PATH + movie.poster_path } alt="图片加载中"></img>
                        <div className="movie-info">
                          <Title level="3" className="movie-name">{ movie.title }</Title>
                          <span className="movie-score" style={this.setVoteFontColor(movie.vote_average)}>{ movie.vote_average }</span>
                        </div>
                        <div className="movie-overview">
                          <Title level="3" className="movie-name">{ movie.title }</Title>
                          <p>{ movie.overview }</p>
                        </div>
                    </li>
                  ))
               }
            </ul>
         </main>
      </div>
    )
  }
};
