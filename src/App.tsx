import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import './App.css';
import {MainPage} from './main-page/main-page';
import {Cards} from "./cards/cards";

function App() {
  const [play, setPlay] = useState(false);
  return (
    <Router>
      <div>
        <input type="checkbox" id="play" onChange={() => setPlay(!play)} checked={play} />
        <label htmlFor="play">{play ? 'Train' : 'Play'}</label>
      </div>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/:type">
        <Cards play={play} />
      </Route>
    </Router>
  );
}

export default App;
