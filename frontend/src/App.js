import React, { useState, useCallback, useEffect } from 'react';
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

let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token, expirationTime) => {
    setToken(token);
    setUserId(userId);

    // Set expiration time or create new one (for 1 hour) for auto logout
    const tokenExpires =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationTime(tokenExpires);

    // Save token in browser for auto login
    const cookies = JSON.stringify({
      userId,
      token,
      expirationTime: tokenExpires.toISOString(),
    });
    localStorage.setItem('userSession', cookies);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationTime(null);
    setUserId(null);
    // Removes userSession
    localStorage.removeItem('userSession');
  }, []);

  useEffect(() => {
    // Only set time if there's a token and remaining token time
    if (token && tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
        // Auto logout user if token expiration time has passed
      logoutTimer = setTimeout(logout, tokenExpirationTime);
    } else {
      // If user manually logs out we clear timer
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationTime]);

  useEffect(() => {
    // Check localStorage for userSession
    const storedSession = JSON.parse(localStorage.getItem('userSession'));

    // If token and expiration time hasn't passed yet auto-login
    if (
      storedSession &&
      storedSession.token &&
      new Date(storedSession.expirationTime) > new Date()
    ) {
      login(
        storedSession.userId,
        storedSession.token,
        new Date(storedSession.expirationTime)
      );
    }
  }, [login]);

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
