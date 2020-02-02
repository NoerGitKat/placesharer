import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Global
import MainNavigation from './shared/components/Navigation/MainNavigation';

// Pages
import UsersPage from './users/pages/UsersPage';
import NewPlace from './places/pages/NewPlace';
import EditPlace from './places/pages/EditPlace';
import UserPlaces from './places/pages/UserPlaces';

function App() {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Switch>
					<Route exact path="/" component={UsersPage} />
					<Route exact path="/:userId/places" component={UserPlaces} />
					<Route exact path="/places/new" component={NewPlace} />
					<Route exact path="/places/:placeId" component={EditPlace} />
					<Redirect to="/" />
				</Switch>
			</main>
		</Router>
	);
}

export default App;
