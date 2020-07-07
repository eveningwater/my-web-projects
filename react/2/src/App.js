import React from 'react';
import './css/App.css';
import Login from './views/login/login'
import Main from './views/main/main'

import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/' component={Login}></Route>
                    <Route path="/main" component={Main} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
