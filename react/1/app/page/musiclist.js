import React from 'react'
import MusicListItem from '../components/musicListItem'


let MusicList = React.createClass({
	render(){
		let listElement = null;
		listElement = this.props.musicList.map((item) => {
			return(
				<MusicListItem 
					focus = {item === this.props.currentMusicItem }
					key={item.id}
					musicItem = {item}
				>
				</MusicListItem>
			) 	
		});
		return(
			<ul>
				{listElement}
			</ul>
		)
	}
});

export default MusicList;