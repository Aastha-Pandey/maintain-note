import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './../../src/components/Login';
import Notes from './../../src/components/Notes';

const Routes = () => {
  return (
    <>
      <Router basename='/app'>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/:status'>
            <Notes />
          </Route>
          <Route exact path='/label/:status'>
            <Notes />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
