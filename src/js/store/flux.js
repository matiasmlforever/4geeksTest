const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			readLater: [],
			people: [],
			vehicles: [],
			planets: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			addToReadLater: item => {
				const store = getStore();
				if (store.readLater.filter(value => value == item).length === 0) {
					store.readLater.push(item);
				}
			},
			removeFromReadLater: item => {
				const store = getStore();
				store.readLater.pop(item);
			},

			loadAllPeopleData: () => {
				let people = [];
				// first page
				fetch("https://www.swapi.tech/api/people?page=1&limit=10")
					.then(response => response.json())
					.then(data => {
						// collect people from first page
						people = data.results;
						return data.total_records;
					})
					.then(total_records => {
						const numberOfPagesLeft = Math.ceil((total_records - 1) / 10);
						let promises = [];
						for (let i = 2; i <= numberOfPagesLeft; i++) {
							promises.push(
								fetch(`https://www.swapi.tech/api/people?page=${i}&limit=10`).then(response =>
									response.json()
								)
							);
						}
						return Promise.all(promises);
					})
					.then(response => {
						people = response.reduce((acc, data) => [...acc, ...data.results], people);
						setStore({ people: people });
					})
					.catch(error => console.log("Properly handle your exception here: " + error));
			},
			loadAllVehicleData: () => {
				let vehicles = [];
				// first page
				fetch("https://www.swapi.tech/api/vehicles?page=1&limit=10")
					.then(response => response.json())
					.then(data => {
						// collect people from first page
						vehicles = data.results;
						return data.total_records;
					})
					.then(total_records => {
						const numberOfPagesLeft = Math.ceil((total_records - 1) / 10);
						let promises = [];
						for (let i = 2; i <= numberOfPagesLeft; i++) {
							promises.push(
								fetch(`https://www.swapi.tech/api/vehicles?page=${i}&limit=10`).then(response =>
									response.json()
								)
							);
						}
						return Promise.all(promises);
					})
					.then(response => {
						vehicles = response.reduce((acc, data) => [...acc, ...data.results], vehicles);
						setStore({ vehicles: vehicles });
					})
					.catch(error => console.log("Properly handle your exception here: " + error));
			},
			loadAllPlanetsData: () => {
				let planets = [];
				// first page
				fetch("https://www.swapi.tech/api/planets?page=1&limit=10")
					.then(response => response.json())
					.then(data => {
						// collect people from first page
						planets = data.results;
						return data.total_records;
					})
					.then(total_records => {
						const numberOfPagesLeft = Math.ceil((total_records - 1) / 10);
						let promises = [];
						for (let i = 2; i <= numberOfPagesLeft; i++) {
							promises.push(
								fetch(`https://www.swapi.tech/api/planets?page=${i}&limit=10`).then(response =>
									response.json()
								)
							);
						}
						return Promise.all(promises);
					})
					.then(response => {
						planets = response.reduce((acc, data) => [...acc, ...data.results], planets);
						setStore({ planets: planets });
					})
					.catch(error => console.log("Properly handle your exception here: " + error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
