import './App.css';
import React, { Component } from "react";
import Title from "./components/Title";
import Pokedex from './components/pokedex';
const DOCUMENT_TITLE = "pokedex";
const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);
const randomColor = () => colors[main_types[Math.floor(Math.random() * main_types.length)]];
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemonList:[]
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        for(let i = 1;i <= pokemon_count;i += 1){
            Promise.resolve().then(() => this.getPokemon(i));
        }
    }
    async getPokemon(id){
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const { pokemonList } = this.state;
        pokemonList.push(this.pokemonData(data));
        this.setState({pokemonList});
    }
    pokemonData(pokemon){
        const poke_types = pokemon.types.map(type => type.type.name);
        const type = main_types.find(type => poke_types.indexOf(type) > -1);
        const color = colors[type];
        return {
            style:{
                background:`linear-gradient(135deg, ${ color } 10%, ${ randomColor() } 100%)`
            },
            name:pokemon.name[0].toUpperCase() + pokemon.name.slice(1).toLowerCase(),
            number:pokemon.id.toString().padStart(3,"0"),
            avatar:pokemon.id,
            type
        }
    }
    render(){
        const { pokemonList } = this.state;
        return (
            <div className="app">
                <Title className="pokedex-title">{ DOCUMENT_TITLE }</Title>
                <div className="pokedex-container">
                    {
                        pokemonList.map((item,index) => (
                            <Pokedex { ...item } key={ item.number + index }></Pokedex>
                        ))
                    }
                </div>
            </div>
        )
    }
}
