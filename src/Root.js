import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//componentes
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

function Root() {
  return (
    <>
    <Router>
        <Switch>
          <Route path="/chat">
            <Chat/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route exact path="/">
            <Login/>
          </Route>
        </Switch>
    </Router>
    </>
  );
}

export default Root;


