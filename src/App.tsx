import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './App.css';

type Params = {
  pseudo: string;
}

const App: React.FC<RouteComponentProps<Params>> = ({match}) => {
  return (
    <div className="box">
      <h2>Bonjour {match.params.pseudo}</h2>
    </div>
  );
}

export default App;
