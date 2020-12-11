const read = require('../utils/read');

let list = read(__dirname).split(/\n/g).map(x => parseInt(x)).sort((a, b) => a - b);

let deviceJoltage = list[list.length - 1] + 3;

const A = () => {
	list.push(deviceJoltage);
	let oneJoltCounter = 0, threeJoltCounter = 0;

	let prev = 0;

	for (let element of list) {
		if (element - prev === 1) oneJoltCounter++;
		else if (element - prev === 3) threeJoltCounter++;

		prev = element;
	}
}

/*const valid_without = (list, index) => {
	let ads = [...list];
	let index = list.indexOf(index)
	ads.splice(index, 1);
	for (let i = index; i < index + 2; i++) {
		if (ads[i] - ads[i - 1] > 3) return false;
	}
	return true;
}
*/

let counter = 0;
const possible_combinations = (list, n) => {
	let ways_to = new Array(n).fill(0);
	ways_to[0] = 1;
	for (let i = 0; i < n - 1; i++) {
		for (let j = i + 1; j < i + 4; j++) {
			if (list[j] - list[i] <= 3)
				ways_to[j] += ways_to[i]
		}
	}
	return ways_to[n - 1]
}

B = () => {
	list.push(list[list.length - 1] + 3);
	list.unshift(0);
	console.log(possible_combinations(list, list.length))
}

B();