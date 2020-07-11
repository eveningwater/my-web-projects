import React from 'react'
import './musicListItem.less'
import { Link } from 'react-router'
import Pubsub from 'pubsub-js'

let MusicListItem = React.createClass({
	playMusic(musicItem){
		Pubsub.publish('PLAY_MUSIC',musicItem);
	},
	deleteMusic(musicItem,e){
		e.stopPropagation();
		Pubsub.publish('DELETE_MUSIC',musicItem);
	},
	detailMusic(musicItem,e){
		e.stopPropagation();
	},
	render(){
		let musicItem = this.props.musicItem;
		return(
			<li onClick = {this.playMusic.bind(this,musicItem)} className = {`components-musicListItem row ${ this.props.focus ? 'focus' : ''}`}>
				<p><strong>{musicItem.title}</strong>-{musicItem.artist}</p>
				<p className = '-col-auto detail' onClick = {this.detailMusic.bind(this,musicItem)}><Link to='/'>详细</Link></p>
				<p onClick = {this.deleteMusic.bind(this,musicItem)} className="-col-auto delete"></p>
			</li>
		)
	}
});


export default MusicListItem;