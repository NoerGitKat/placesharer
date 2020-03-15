import React, { useState, useEffect } from 'react';
import useHttpRequest from './../../shared/hooks/http-hook';

import UsersList from './../components/UsersList';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from './../../shared/components/UIElements/Modal/ErrorModal';

const UsersPage = () => {
	const [users, setUsers] = useState([]);
	const { isLoading, error, clearError, sendRequest } = useHttpRequest();

	const fetchUsers = async () => {
		const url = '/api/users';
		const responseData = await sendRequest(url);
		setUsers(responseData);
	};

	// Fetch users before page loads, with empty [] only runs once
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			<UsersList users={users} />
		</>
	);
};

export default UsersPage;
