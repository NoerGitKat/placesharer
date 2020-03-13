import React, { useState, useContext, Fragment } from 'react';

import AuthContext from './../../shared/context/auth-context';

import Card from './../../shared/components/UIElements/Card';
import Button from './../../shared/components/FormElements/Button';
import Modal from './../../shared/components/UIElements/Modal/Modal';
import Map from './../../shared/components/UIElements/Map';

import './PlaceItem.css';

const PlaceItem = ({ image, title, description, address, id, coordinates }) => {
	const { isLoggedIn } = useContext(AuthContext);

	const [showMap, setShowMap] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);
	const openDeleteHandler = () => setShowDelete(true);
	const closeDeleteHandler = () => setShowDelete(false);
	const deletePlaceHandler = placeId => {
		setShowDelete(false);
	};

	return (
		<React.Fragment>
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={address}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			>
				<div className="map-container">
					<Map center={coordinates} zoom={16} />
				</div>
			</Modal>
			<Modal
				show={showDelete}
				onCancel={closeDeleteHandler}
				header={'Are you sure?'}
				footerClass="place-item__modal-actions"
				footer={
					<React.Fragment>
						<Button onClick={closeDeleteHandler} inverse>
							CANCEL
						</Button>
						<Button onClick={() => deletePlaceHandler(id)} danger>
							DELETE
						</Button>
					</React.Fragment>
				}
			>
				<p>Do you really want to delete this place? This action is IRREVERSIBLE!</p>
			</Modal>
			<li className="place-item">
				<Card className="place-item__content">
					<div className="place-item__image">
						<img src={image} alt={title} />
					</div>
					<div className="place-item__info">
						<h2>{title}</h2>
						<h3>{address}</h3>
						<p>{description}</p>
					</div>
					<div className="place-item__actions">
						<Button onClick={openMapHandler} inverse>
							VIEW ON MAP
						</Button>
						{isLoggedIn && (
							<Fragment>
								<Button to={`/places/${id}`}>EDIT</Button>
								<Button onClick={openDeleteHandler} danger>
									DELETE
								</Button>
							</Fragment>
						)}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default PlaceItem;
