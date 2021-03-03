import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsFillHeartFill } from "react-icons/bs";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div id="people" style={{ display: "inline-flex" }}>
				<h1>SW People</h1>
				{store.people.map((item, index) => {
					return (
						<Card key={index} style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>{item.name}</Card.Title>
								<Card.Text />
								<Link
									to={{
										pathname: "/details",
										swapiUrl: item.url
									}}>
									<Button variant="primary">Ver más</Button>
								</Link>
								<BsFillHeartFill onClick={() => actions.addToReadLater(item)} />
							</Card.Body>
						</Card>
					);
				})}
				<br />
			</div>

			<div id="vehicles" style={{ display: "inline-flex" }}>
				<h1>SW Vehicles</h1>
				{store.vehicles.map((item, index) => {
					return (
						<Card key={index} style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>{item.name}</Card.Title>
								<Card.Text />
								<Link
									to={{
										pathname: "/details",
										swapiUrl: item.url
									}}>
									<Button variant="primary">Ver más</Button>
								</Link>
								<BsFillHeartFill onClick={() => actions.addToReadLater(item)} />
							</Card.Body>
						</Card>
					);
				})}
				<br />
			</div>

			<div id="planets" style={{ display: "inline-flex" }}>
				<h1>SW Planets</h1>
				{store.planets.map((item, index) => {
					return (
						<Card key={index} style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>{item.name}</Card.Title>
								<Card.Text />
								<Link
									to={{
										pathname: "/details",
										swapiUrl: item.url
									}}>
									<Button variant="primary">Ver más</Button>
								</Link>
								<BsFillHeartFill onClick={() => actions.addToReadLater(item)} />
							</Card.Body>
						</Card>
					);
				})}
				<br />
			</div>

			<div id="readLTag" style={{ display: "inline-flex" }}>
				<h2>Read Later</h2>
				{store.readLater.map((item, index) => {
					return (
						<Card key={index} style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>{item.name}</Card.Title>
								<Card.Text />
								<Link
									to={{
										pathname: "/details",
										swapiUrl: item.url
									}}>
									<Button variant="primary">Ver más</Button>
								</Link>
								<BsFillHeartFill onClick={() => actions.removeFromReadLater(item)} />
							</Card.Body>
						</Card>
					);
				})}
				<br />
			</div>
		</div>
	);
};
