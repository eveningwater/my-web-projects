import React from 'react'
import ReactDOM from 'react-dom'

import App from './App';
const container = document.createElement("div");
container.id = "app";
document.body.appendChild(container);
// just to remove the warning
ReactDOM.render(<App/>, container);
