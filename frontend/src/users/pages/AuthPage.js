import React, { useState, useContext, Fragment } from 'react';
import useForm from './../../shared/hooks/form-hook';
import useHttpRequest from './../../shared/hooks/http-hook';

import AuthContext from './../../shared/context/auth-context';

import Card from './../../shared/components/UIElements/Card';
import AuthForm from './../components/AuthForm';
import Button from './../../shared/components/FormElements/Button';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from './../../shared/components/UIElements/Modal/ErrorModal';

const AuthPage = () => {
	const { isLoggedIn, login, logout } = useContext(AuthContext);

	const INITIAL_INPUTS = {
		email: {
			value: '',
			isValid: false,
		},
		password: {
			value: '',
			isValid: false,
		},
	};

	const [formState, inputHandler, setFormData] = useForm(INITIAL_INPUTS, false);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, clearError, sendRequest } = useHttpRequest();

	const authSubmitHandler = async e => {
		e.preventDefault();

		const { name, email, password } = formState.inputs;

		if (isLoginMode) {
			const url = '/api/users/login';

			const body = {
				email: email.value,
				password: password.value,
			};

			const request = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			};

			try {
				const responseData = await sendRequest(url, request.method, request.body, request.headers);
				login();
			} catch (err) {
				console.log('Error at login!', err);
			}
		} else {
			const url = '/api/users/signup';

			const body = {
				name: name.value,
				email: email.value,
				password: password.value,
			};

			const request = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			};

			try {
				const responseData = await sendRequest(url, request.method, request.body, request.headers);
				login();
			} catch (err) {
				console.log('Error at login!', err);
			}
		}
	};

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					// Make copy of prev formState
					...formState.inputs,
					// Set name field to undefined, so the form validator can continue
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode(prevState => !prevState);
	};

	return (
		<Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Card className="authentication">
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Authentication Required!</h2>
				<hr />
				<AuthForm
					formState={formState}
					inputHandler={inputHandler}
					authSubmitHandler={authSubmitHandler}
					isLoginMode={isLoginMode}
				/>
				<Button inverse onClick={switchModeHandler}>
					SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
				</Button>
			</Card>
		</Fragment>
	);
};

export default AuthPage;
