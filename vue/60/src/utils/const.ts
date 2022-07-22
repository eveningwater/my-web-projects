export const pokeCount = 150;
export const colors = {
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
export type ColorsType = typeof colors;
export type KeysColorsType = keyof ColorsType;
export const mainColors = Object.keys(colors);
export const randomColor = () => {
    const colorKey = mainColors[Math.floor(Math.random() * mainColors.length)] as KeysColorsType;
    return colors[colorKey]
}
export const requestURL = "https://pokeapi.co/api/v2/pokemon/";
export const imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
export type PokeListItem = {
    avatar: number,
    number:string,
    name:string,
    type:KeysColorsType,
    background:string
}
export const handleData = (data: PokeRequestData.PokeDataType) => {
    const pokeTypes = data.types.map(t => t.type.name);
	const type = mainColors.find(key => pokeTypes.includes(key)) as KeysColorsType;
	const color = colors[type];	
	return {
		background: `linear-gradient(135deg, ${ color } 10%, ${ randomColor() } 100%)`,
		number: data.id.toString().padStart(3,"0"),
		name:data.name[0].toUpperCase() + data.name.slice(1).toLowerCase(),
		avatar:data.id,
		type
	}
}