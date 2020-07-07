/*var react = require('react');
console.log(react.version);*/
import React from 'react'
/*import './index.less'*/
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
/*import Hello from './components/hello'*/
import Root from './root'



/*render(
	<Hello></Hello>,
	document.getElementById('app')
);*/

/*render(
	<AppContainer>
		<Hello />
	</AppContainer>,
	document.getElementById('app')
)*/
render(
	<AppContainer>
		<Root />
	</AppContainer>,
	document.getElementById('app')
)

/*if(module.hot){
	module.hot.accept('./components/hello',() => {
		const NewHello = require('./components/hello').default;
		render(
			<AppContainer>
				<NewHello />
			</AppContainer>,
			document.getElementById('app')
		)
	});
}*/
if(module.hot){
	module.hot.accept('./root',() => {
		const NewRoot = require('./root').default;
		render(
			<AppContainer>
				<NewRoot />
			</AppContainer>,
			document.getElementById('app')
		)
	});
}



