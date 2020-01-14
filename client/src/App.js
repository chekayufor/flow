import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register'
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivetRoute';
import setAuthToken from './utils/setAuthToken'
import AuthState from './components/context/auth/AuthState';
import AlertState from './components/context/alert/AlertState';
import FlowState from './components/context/flow/FlowState';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    M.AutoInit();
  })
  return (
    <AuthState>
      <AlertState>
        <FlowState>
          <Router>
            <Fragment>
              <NavBar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </FlowState>
      </AlertState>
    </AuthState>
  );
}

export default App;
