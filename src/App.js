import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { auth } from './firebase';

import 'bulma/css/bulma.css'

import './App.css';

import Banner from './containers/App';
import Dashboard from './containers/Dashboard';
import ModuleList from './containers/ModuleList';
import Profile from './containers/Profile';
import NotFound from './components/NotFound';

function PrivateRoute({ user, ...props }) {
  if (user) {
    return <Redirect to="/dashboard" />
  }

  return <Route user={user} {...props} />
}

function RedirectToHome({ user, ...props }) {
  if (!user) {
    return <Redirect to="/" user={user} />
  }

  return <Route user={user} {...props} />
}

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
        <PrivateRoute path="/" user={user} exact={true}><Banner /></PrivateRoute>
        <Route path="/dashboard" exact><Dashboard user={user} /></Route>
        <RedirectToHome user={user} path="/profile"><Profile user={user} /></RedirectToHome>
        <Route path="/dashboard/:subject" exact><ModuleList user={user} /></Route>
        <Route path="*" exact><NotFound /></Route>
      </Switch>
    </Router>
  );
}

export default App;
