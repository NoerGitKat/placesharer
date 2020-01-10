import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Components
import UsersPage from "./users/pages/UsersPage";
import NewPlace from "./places/pages/NewPlace";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UsersPage} />
        <Route exact path="/places/new" component={NewPlace} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
