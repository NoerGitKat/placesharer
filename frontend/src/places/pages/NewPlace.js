import React, { useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "./../../shared/context/auth-context";

import PlaceForm from "./../components/PlaceForm";
import ErrorModal from "./../../shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

// Custom hook
import useForm from "./../../shared/hooks/form-hook";
import useHttpRequest from "./../../shared/hooks/http-hook";

const NewPlace = () => {
  const initInputs = {
    title: {
      value: "",
      isValid: false
    },
    description: {
      value: "",
      isValid: false
    },
    address: {
      value: "",
      isValid: false
    }
  };
  const [formState, inputHandler] = useForm(initInputs, false);
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const { userId } = useContext(AuthContext);
  const { push } = useHistory();

  const addPlaceHandler = async event => {
    event.preventDefault();

    const { inputs } = formState;

    const url = "/api/places";

    const headers = {
      "Content-Type": "application/json"
    };

    const body = {
      title: inputs.title,
      description: inputs.description,
      address: inputs.address,
      creator: userId
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers
    };

    try {
      const responseData = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );

      // Redirect to homepage
      push("/");
    } catch (err) {
      console.log("Error at creating place!", err);
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <PlaceForm
        formState={formState}
        inputHandler={inputHandler}
        formHandler={addPlaceHandler}
        isAdd={true}
      />
    </Fragment>
  );
};

export default NewPlace;
