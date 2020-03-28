import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from './../../shared/components/UIElements/Card';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from './../../shared/components/UIElements/Modal/ErrorModal';
import PlaceForm from './../components/PlaceForm';

import useForm from './../../shared/hooks/form-hook';
import useHttpRequest from '../../shared/hooks/http-hook';

const EditPlace = () => {
  const { placeId } = useParams();
  const { push } = useHistory();

  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const [loadedPlace, setLoadedPlace] = useState({});

  const initInputs = {
    title: {
      value: '',
      isValid: true
    },
    description: {
      value: '',
      isValid: true
    }
  };
  const [formState, inputHandler, setFormData] = useForm(initInputs, false);

  useEffect(() => {
    const getPlace = async () => {
      const url = `/api/places/${placeId}`;
      try {
        const identifiedPlace = await sendRequest(url);

        setLoadedPlace(identifiedPlace);
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
      } catch (err) {
        console.log('Could fetch place!', err);
      }
    };
    getPlace();
  }, [sendRequest, placeId, setFormData]);

  const editPlaceSubmitHandler = async e => {
    e.preventDefault();

    const { title, description } = loadedPlace;

    const url = `/api/places/${placeId}`;

    const body = {
      title,
      description
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    const request = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers
    };

    try {
      const response = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );

      push('/');
    } catch (err) {
      console.log('Could not edit place!', err);
    }
  };

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <PlaceForm
          formState={formState}
          inputHandler={inputHandler}
          formHandler={editPlaceSubmitHandler}
          isAdd={false}
        />
      )}
    </Fragment>
  );
};

export default EditPlace;
