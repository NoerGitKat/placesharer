import React from 'react';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from './../../shared/utils/validators';

import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';

import './AuthForm.css';

const AuthForm = ({ isLoginMode, formState, inputHandler, login, setIsLoading, setError }) => {
	const authSubmitHandler = async e => {
		e.preventDefault();

		const { name, email, password } = formState.inputs;

		if (isLoginMode) {
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
				setIsLoading(true);
				const response = await fetch('http://localhost:5000/api/users/login', request);
				const responseData = await response.json();
				console.log('responseData in auth', responseData);

				if (!response.ok) {
					throw new Error(responseData.msg);
				}
				setIsLoading(false);
				login();
			} catch (err) {
				setIsLoading(false);
				setError(err.message || 'Something went wrong, please try again.');
				console.log(err);
			}
		} else {
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
				setIsLoading(true);
				const response = await fetch('/api/users/signup', request);

				const responseData = await response.json();

				if (!response.ok) {
					throw new Error(responseData.msg);
				}

				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				setError(err.message || 'Something went wrong, please try again.');
				console.log(err);
			}
		}

		setIsLoading(false);
	};

	return (
		<form onSubmit={authSubmitHandler}>
			{!isLoginMode && (
				<Input
					element="input"
					id="name"
					type="text"
					placeholder="Your Name"
					label="Your Name"
					errorText="Your name is required!"
					validators={[VALIDATOR_REQUIRE()]}
					onInputChange={inputHandler}
				/>
			)}

			<Input
				id="email"
				element="input"
				type="email"
				placeholder="Your Email"
				label="Email"
				errorText="Please enter a valid email!"
				validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
				onInputChange={inputHandler}
			/>
			<Input
				id="password"
				element="input"
				type="password"
				placeholder="Your Password"
				label="Password"
				errorText="Please enter a valid password!"
				validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
				onInputChange={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				{isLoginMode ? 'Login' : 'Signup'}
			</Button>
		</form>
	);
};

export default AuthForm;
