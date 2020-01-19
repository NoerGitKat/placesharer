import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Global
import MainNavigation from './shared/components/Navigation/MainNavigation';

// Pages
import UsersPage from './users/pages/UsersPage';
import NewPlace from './places/pages/NewPlace';

function App() {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Switch>
					<Route exact path="/" component={UsersPage} />
					<Route exact path="/places/new" component={NewPlace} />
					<Redirect to="/" />
				</Switch>
			</main>
		</Router>
	);
}

export default App;
