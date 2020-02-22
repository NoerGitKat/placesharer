import React, { useState, useContext } from 'react';
import useForm from './../../shared/hooks/form-hook';

import AuthContext from './../../shared/context/auth-context';

import Card from './../../shared/components/UIElements/Card';
import AuthForm from './../components/AuthForm';
import Button from './../../shared/components/FormElements/Button';

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
		<Card className="authentication">
			<h2>Authentication Required!</h2>
			<hr />
			<AuthForm formState={formState} inputHandler={inputHandler} isLoginMode={isLoginMode} login={login} />
			<Button inverse onClick={switchModeHandler}>
				SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
			</Button>
		</Card>
	);
};

export default AuthPage;
