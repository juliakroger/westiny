import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import home from './containers/home';
import * as serviceWorker from './serviceWorker';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
	<Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/home" component={home} />
    </Switch>
	</ BrowserRouter>
	, document.getElementById('root'));


serviceWorker.unregister();
