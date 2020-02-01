import React, { useReducer } from 'react';

import { validate } from '../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
	// Works just like Redux
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators),
			};
		case 'TOUCH':
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

const INITIAL_INPUT = { value: '', isValid: false, isTouched: false };

const Input = ({ element, label, id, type, placeholder, rows, errorText, validators }) => {
	const [inputState, dispatch] = useReducer(inputReducer, INITIAL_INPUT);

	const changeHandler = event => {
		dispatch({ type: 'CHANGE', value: event.target.value, validators });
	};

	const touchHandler = () => {
		dispatch({ type: 'TOUCH' });
	};

	const inputEl =
		element === 'input' ? (
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onBlur={touchHandler}
				onChange={changeHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={id}
				rows={rows || 3}
				onBlur={touchHandler}
				onChange={changeHandler}
				value={inputState.value}
			/>
		);

	return (
		<div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
			<label htmlFor={id}>{label}</label>
			{inputEl}
			{!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
		</div>
	);
};

export default Input;
