import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.loadAllPeopleData();
	}, []);

	return (
		<div className="container">
			{store.people.map((item, index) => {
				return (
					<Card key={index} style={{ width: "18rem" }}>
						<Card.Img variant="top" src="holder.js/100px180" />
						<Card.Body>
							<Card.Title>{item.name}</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the cards
								content.
							</Card.Text>
							<Link to={"/details/" + item.uid}>
								<Button variant="primary">Ver más</Button>
							</Link>
						</Card.Body>
					</Card>
					/* <li
					key={index}
					className="list-group-item d-flex justify-content-between"
					style={{ background: item.background }}>
					<Link to={"/single/" + index}>
						<span>Link to: {item.title}</span>
					</Link>
					{// Conditional render example
					// Check to see if the background is orange, if so, display the message
					item.background === "orange" ? (
						<p style={{ color: item.initial }}>
							Check store/flux.js scroll to the actions to see the code
						</p>
					) : null}
					<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
						Change Color
					</button>
				</li> */
				);
			})}
			<br />
			<Link to="/">
				<button className="btn btn-primary">Ver mas</button>
			</Link>
		</div>
	);
};
