import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "./../../shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

// Custom hooks
import useHttpRequest from "./../../shared/hooks/http-hook";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const userId = useParams().userId;
  const [userPlaces, setUserPlaces] = useState([]);

  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const url = `/api/places/user/${userId}`;

        const request = {
          method: "GET"
        };

        const response = await sendRequest(url, request.method);

        setUserPlaces(response);
      } catch (err) {
        console.log("Could not get all user places!", err);
      }
    };
    fetchPlaces();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <PlaceList items={userPlaces} />
    </Fragment>
  );
};

export default UserPlaces;
