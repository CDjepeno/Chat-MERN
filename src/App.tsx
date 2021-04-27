import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Login from './component/Login';
import { HashRouter, Route, Switch } from 'react-router-dom';
import NotFound from './component/NotFound';
import Chat from './Chat';

export const App: React.FC = () => {
    return(
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/pseudo/:pseudo' component={Chat}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </HashRouter>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

