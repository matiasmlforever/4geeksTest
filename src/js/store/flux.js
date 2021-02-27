const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			people: [],
			vehicles: [],
			planets: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
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
			loadAllPeopleData: async => {
				let people = [];
				// first page
				fetch("https://www.swapi.tech/api/people/?page=1&limit=10")
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
