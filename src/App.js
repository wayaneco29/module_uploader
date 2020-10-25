import React from 'react';
import styled from 'styled-components';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { auth } from './firebase';

import 'bulma/css/bulma.css'

import './App.css';

import Banner from './containers/App';
import Dashboard from './containers/Dashboard';
import ModuleList from './containers/ModuleList';
import Profile from './containers/Profile';
import NotFound from './components/NotFound';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            const { email, displayName, photoURL } = user;
            setUser({
                email,
                displayName,
                photoURL,
            })
        } else {
            setUser(null);
        }
        
    })
}, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}><Banner /></Route>
        <Route path="/dashboard" exact><Dashboard user={user} /></Route>
        <Route path="/profile"><Profile user={user} /></Route>
        <Route path="/dashboard/:subject" exact><ModuleList user={user} /></Route>
        <Route path="*" exact><NotFound /></Route>
      </Switch>
    </Router>
  );
}

export default App;
