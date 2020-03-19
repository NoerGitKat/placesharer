import React from 'react';
import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from './../../shared/utils/validators';

import './PlaceForm.css';

const PlaceForm = ({ isAdd, formState, inputHandler, formHandler }) => {
	return (
		<form className="place-form" onSubmit={formHandler}>
			{isAdd && (
				<Input
					id="title"
					element="input"
					type="text"
					label="Title"
					errorText="Please enter a valid title!"
					validators={[VALIDATOR_REQUIRE()]}
					onInputChange={inputHandler}
				/>
			)}
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
				{isAdd ? 'Add' : 'Edit'} place
			</Button>
		</form>
	);
};

export default PlaceForm;
