import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
	const userId = 'u1';
	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					All Users
				</NavLink>
			</li>
			<li>
				<NavLink to={`/${userId}/places`}>My Places</NavLink>
			</li>
			<li>
				<NavLink to="/places/new">Add New Place</NavLink>
			</li>
			<li>
				<NavLink to="/auth">Authentication</NavLink>
			</li>
		</ul>
	);
};

export default NavLinks;
