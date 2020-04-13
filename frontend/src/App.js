import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Global
import MainNavigation from './shared/components/Navigation/MainNavigation';

// Pages
import UsersPage from './users/pages/UsersPage';
import AuthPage from './users/pages/AuthPage';
import NewPlace from './places/pages/NewPlace';
import EditPlace from './places/pages/EditPlace';
import UserPlaces from './places/pages/UserPlaces';

// Context
import AuthContext from './shared/context/auth-context';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={UsersPage} />
        <Route exact path="/:userId/places" component={UserPlaces} />
        <Route exact path="/places/new" component={NewPlace} />
        <Route exact path="/places/:placeId" component={EditPlace} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={UsersPage} />
        <Route exact path="/:userId/places" component={UserPlaces} />
        <Route exact path="/auth" component={AuthPage} />
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
