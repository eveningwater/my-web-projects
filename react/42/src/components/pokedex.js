import { Component } from "react";
import Title from "./Title";
const IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
export default class Pokedex extends Component {
     constructor(props){
         super(props);
         this.state = {

         }
     }
     render(){
         const { style,number,name,type,avatar } = this.props;
         return (
            <div className="pokedex" style={style}>
                <div className="pokedex-avatar">
                    <img src={ IMAGE_URL + avatar + '.png' } alt="the pokemon" />
                </div>
                <div className="pokedex-info">
                    <span className="pokedex-number">#{ number }</span>
                    <Title level="3" className="pokedex-name">{ name }</Title>
                    <small className="pokedex-type">Type:<span>{ type }</span></small>
                </div>
            </div>
         )
     }
}