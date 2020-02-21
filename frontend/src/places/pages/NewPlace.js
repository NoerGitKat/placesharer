import React from 'react';
import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from './../../shared/utils/validators';
// Custom hook
import useForm from './../../shared/hooks/form-hook';
import './PlaceForm.css';

const NewPlace = () => {
	const initInputs = {
		title: {
			value: '',
			isValid: false,
		},
		description: {
			value: '',
			isValid: false,
		},
		address: {
			value: '',
			isValid: false,
		},
	};
	const [formState, inputHandler] = useForm(initInputs, false);

	const addPlaceHandler = event => {
		event.preventDefault();
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
