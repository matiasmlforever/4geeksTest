import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Details = props => {
	const [url, setItem] = useState(props.location.swapiUrl);
	const [itemDetail, setItemDetail] = useState({ properties: { name: "" } });
	let history = useHistory();

	useEffect(() => {
		const getDetail = async url => {
			await fetch(url)
				.then(response => response.json())
				.then(data => {
					setItemDetail(data.result);
				})
				.catch(error => console.log("Properly handle your exception here: " + error));
		};
		getDetail(url);
	}, []);

	return (
		<div>
			<div className="container">DETALLES TEST</div>
			<h1>{itemDetail.properties.name}</h1>
			<div>{Object.entries(itemDetail.properties)}</div>
			<button onClick={() => history.goBack()}>Volver</button>
		</div>
	);
};

Details.propTypes = {
	location: PropTypes.shape({
		swapiUrl: PropTypes.string
	}).isRequired
};
