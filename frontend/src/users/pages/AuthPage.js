import React, { useState, useContext, Fragment } from 'react';
import useForm from './../../shared/hooks/form-hook';

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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

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

	const errorHandler = () => {
		setError(null);
	};

	return (
		<Fragment>
			<ErrorModal error={error} onClear={errorHandler} />
			<Card className="authentication">
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Authentication Required!</h2>
				<hr />
				<AuthForm
					formState={formState}
					inputHandler={inputHandler}
					isLoginMode={isLoginMode}
					login={login}
					setIsLoading={setIsLoading}
					setError={setError}
				/>
				<Button inverse onClick={switchModeHandler}>
					SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
				</Button>
			</Card>
		</Fragment>
	);
};

export default AuthPage;
