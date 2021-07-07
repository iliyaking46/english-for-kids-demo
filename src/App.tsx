import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import './App.css';
import {MainPage} from './main-page/container';
import {Cards} from "./cards/cards";

function App() {
  return (
      <Router>
        <Route path="/" exact>
            <MainPage />
        </Route>
        <Route path="/:category">
            <Cards />
        </Route>
      </Router>
  );
}

export default App;
