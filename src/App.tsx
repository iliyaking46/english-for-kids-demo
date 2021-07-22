import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import {MainPage} from './main-page/main-page';
import {Cards} from "./cards/cards";
import { AdminWorkplace } from './admin/admin-workplace';

const Main = () => {
  const [play, setPlay] = useState(false);

  return (
    <>
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
    </>
  )
}

const App = () => (
  <Router>
    <Switch>
      <Route path="/admin">
        <AdminWorkplace />
      </Route>
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  </Router>
);

export default App;
