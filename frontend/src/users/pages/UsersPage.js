import React from 'react';

import UsersList from './../components/UsersList';

const UsersPage = () => {
	const usersArr = [
		{
			id: 'u1',
			name: 'Noer Paanakker',
			image: 'https://pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png',
			placeCount: 3,
		},
	];

	return (
		<>
			<UsersList users={usersArr} />
		</>
	);
};

export default UsersPage;
