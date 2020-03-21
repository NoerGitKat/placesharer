import React from "react";

import PlaceForm from "./../components/PlaceForm";

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

  const addPlaceHandler = async event => {
    event.preventDefault();

    const { inputs } = formState;

    const url = "/api/places";

    const body = {
      title: inputs.title,
      description: inputs.description,
      address: inputs.address,
      creator: "5e6bc2b506c568d5eef0382e"
    };

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

    try {
      const responseData = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );
    } catch (err) {
      console.log("Error at creating place!", err);
    }
  };

  return (
    <PlaceForm
      formState={formState}
      inputHandler={inputHandler}
      formHandler={addPlaceHandler}
      isAdd={true}
    />
  );
};

export default NewPlace;
