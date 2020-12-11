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
	return oneJoltCounter * threeJoltCounter;
}

const possible_combinations = (list, n) => {
	// ways to get to element in list
	let ways_to = new Array(n).fill(0);

	// only 1 way to get to the first element
	ways_to[0] = 1;
	for (let i = 0; i < n - 1; i++) {
		for (let j = i + 1; j < i + 4; j++) {
			// if diff <= 3, we can go from i to j
			if (list[j] - list[i] <= 3)
				// all the ways we can go to i, we can also go to j, so add them.
				ways_to[j] += ways_to[i]
		}
	}
	// return number of ways to get to last element - final answer!
	return ways_to[n - 1]
}

B = () => {
	// add the final element (max + 3)
	list.push(list[list.length - 1] + 3);

	// add zero to beginning
	list.unshift(0);
	return possible_combinations(list, list.length)
}

console.log(A())
console.log(B())