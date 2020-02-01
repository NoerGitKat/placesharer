import React, { useCallback, useReducer } from 'react';
import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from './../../shared/utils/validators';
import './NewPlace.css';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			// Loop through input fields by id
			for (const inputId in state.inputs) {
				if (inputId === action.inputId) {
					// If a field is updated, only make form valid if that input field is valid as well
					formIsValid = formIsValid && action.isValid;
				} else {
					// Else reset the key to the already stored state value
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid,
					},
				},
				isValid: formIsValid,
			};
		default:
			return state;
	}
};

const INITIAL_FORM_STATE = {
	inputs: {
		title: {
			value: '',
			isValid: false,
		},
		address: {
			value: '',
			isValid: false,
		},
		description: {
			value: '',
			isValid: false,
		},
	},
	isValid: false,
};

const NewPlace = () => {
	const [formState, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);

	// Brings state up from child component
	const inputHandler = useCallback((inputId, value, isValid) => {
		dispatch({ type: 'INPUT_CHANGE', inputId, value, isValid });
	}, []);

	const addPlaceHandler = event => {
		event.preventDefault();
		console.log(formState.inputs);
	};

	return (
		<form className="place-form" onSubmit={addPlaceHandler}>
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				errorText="Please enter a valid title!"
				validators={[VALIDATOR_REQUIRE()]}
				onInputChange={inputHandler}
			/>
			<Input
				id="address"
				element="input"
				type="text"
				label="Address"
				errorText="Please enter a valid address!"
				validators={[VALIDATOR_REQUIRE()]}
				onInputChange={inputHandler}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				errorText="Please enter a valid description (at least 5 characters)!"
				validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
				onInputChange={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				Add place
			</Button>
		</form>
	);
};

export default NewPlace;
