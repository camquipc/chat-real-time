import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


//sttle global
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


//props global
import { API_URL , APP_NAME } from './config';

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
            <Chat url={API_URL} name={APP_NAME}/>
          </Route>
          <Route path="/register">
            <Register url={API_URL}/>
          </Route>
          <Route exact path="/">
            <Login url={API_URL} />
          </Route>
        </Switch>
    </Router>
    </>
  );
}

export default Root;


