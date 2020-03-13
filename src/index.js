import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import './App.css';
import App from './App';
import Inicio from './components/navbarCadastroLogin'
import Home from './components/Home'

const routes = (
    <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/home" component={Home}/>
    </Switch>
);

ReactDOM.render((
    <Router>
        {routes}
    </Router>

), document.getElementById('root'));
