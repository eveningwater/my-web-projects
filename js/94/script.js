const container = document.querySelector("#pokedex-container");
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
const fetchPokemon = async () => {
    for(let i = 1;i <= pokemon_count;i++){
        await getPokemon(i);
    }
}
function randomColor(){
    return colors[main_types[Math.floor(Math.random() * main_types.length)]];
}
async function getPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemon(data);
}
function createPokemon(pokemon){
    const pokemonItem = document.createElement("div");
    pokemonItem.classList.add("pokedex");

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1).toLowerCase();
    const id = pokemon.id.toString().padStart(3,"0");
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];
    pokemonItem.style.background = `linear-gradient(135deg, ${ color } 10%, ${ randomColor() } 100%)`;
    pokemonItem.innerHTML = `
    <div class="pokedex-avatar">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="the pokemon">
    </div>
    <div class="info">
        <span class="number">#${ id }</span>
        <h3 class="name">${ name }</h3>
        <small class="type">Type:<span>${ type }</span></small>
    </div>`;
    container.appendChild(pokemonItem);
}
window.onload = () => fetchPokemon();