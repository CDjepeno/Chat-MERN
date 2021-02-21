import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import Connexion from './component/Login';
import { HashRouter, Route, Switch } from 'react-router-dom';
import NotFound from './component/NotFound';

const Root: React.FC = () => {
    return(
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Connexion}></Route>
        <Route exact path='/pseudo/:pseudo' component={App}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </HashRouter>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

