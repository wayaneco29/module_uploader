import React from 'react';
import styled from 'styled-components';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { auth } from './firebase';

import 'bulma/css/bulma.css'

import './App.css';

import Banner from './containers/App';
import Dashboard from './containers/Dashboard';
import ModuleList from './containers/ModuleList';


function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged(xUser => {
      setUser(xUser);
    })
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}><Banner /></Route>
        <Route path="/dashboard" exact><Dashboard user={user} /></Route>
        <Route path="/dashboard/:subject"><ModuleList user={user} /></Route>
      </Switch>
    </Router>
  );
}

export default App;
