import React from 'react'
import './header.less'


let Header = React.createClass({
	render(){
		return(
			<div className="components-header row">
				<img src="static/images/logo.png" width="40" alt="图片加载中" className="-col-auto" />
				<h1 className='caption'>React music player</h1>
			</div>
		)
	}
});

export default Header;