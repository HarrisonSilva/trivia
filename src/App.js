import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

// <Route path="/ranking" component={ Ranking } />
// <Route path="/feedback" component={ Feedback } />
