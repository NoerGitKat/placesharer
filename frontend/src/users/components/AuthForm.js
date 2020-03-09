import React from "react";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "./../../shared/utils/validators";

import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";

import "./AuthForm.css";

const AuthForm = ({ isLoginMode, formState, inputHandler, login }) => {
  const authSubmitHandler = async e => {
    e.preventDefault();

    const { name, email, password } = formState.inputs;

    if (isLoginMode) {
      const body = {
        email: email.value,
        password: password.value
      };

      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      };

      try {
        const response = await fetch("/api/users/login", request);
        const responseData = await response.json();
        console.log("responseData", responseData);
      } catch (err) {
        console.log(err);
      }
    } else {
      const body = {
        name: name.value,
        email: email.value,
        password: password.value
      };

      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      };

      try {
        const response = await fetch("api/users/signup", request);
        const responseData = await response.json();
        console.log("responseData", responseData);
      } catch (err) {
        console.log(err);
      }
    }

    login();
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
        Login
      </Button>
    </form>
  );
};

export default AuthForm;
