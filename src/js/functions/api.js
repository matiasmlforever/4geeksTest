/**
 * Get all people form the Starwars API
 */
export function getAllStarwarsPeople() {
	let people = [];
	// first page
	return fetch("https://www.swapi.tech/api/people/?page=1&limit=10")
		.then(response => response.json())
		.then(data => {
			// collect people from first page
			people = data.results;
			return data.total_records;
		})
		.then(total_records => {
			// exclude the first request
			const numberOfPagesLeft = Math.ceil((total_records - 1) / 10);
			let promises = [];
			// start at 2 as you already queried the first page
			for (let i = 2; i <= numberOfPagesLeft; i++) {
				promises.push(fetch(`https://www.swapi.tech/api/people?page=${i}&limit=10`));
			}
			return Promise.all(promises);
		})
		.then(response => {
			//get the rest records - pages 2 through n.
			people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
			return people;
		})
		.catch(error => console.log("Properly handle your exception here"));
}
