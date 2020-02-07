import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import Card from "./../../shared/components/UIElements/Card";

import "./PlaceForm.css";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "./../../shared/utils/validators";
import useForm from "./../../shared/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State",
    description: "Famous shit right here!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: "u1"
  },
  {
    id: "p2",
    title: "Empire State 2",
    description: "Another famous shit right here!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: "u2"
  }
];

const EditPlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { placeId } = useParams();

  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

  const initInputs = {
    title: {
      value: "",
      isValid: true
    },
    description: {
      value: "",
      isValid: true
    }
  };
  const [formState, inputHandler, setFormData] = useForm(initInputs, false);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Couldn't find place!</h2>
        </Card>
      </div>
    );
  }

  const editPlaceSubmitHandler = e => {
    e.preventDefault();
  };

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  return (
    <form className="place-form" onSubmit={editPlaceSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="Please enter a valid title!"
        validators={[VALIDATOR_REQUIRE()]}
        onInputChange={inputHandler}
        initValue={formState.inputs.title.value}
        initIsValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        errorText="Please enter a valid description (at least 5 characters!"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInputChange={inputHandler}
        initValue={formState.inputs.description.value}
        initIsValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update place
      </Button>
    </form>
  );
};

export default EditPlace;
