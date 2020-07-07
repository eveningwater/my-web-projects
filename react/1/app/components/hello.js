import React from 'react'
import './hello.less'


//创建组件
let Hello = React.createClass({
	render(){
		return(
			<div className='component-hello'>
				<h1>hello,world,react and webpack!</h1>
			</div>
		)
	}
})

export default Hello;